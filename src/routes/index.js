const Router = require('express-promise-router');

const klawSync = require('klaw-sync');
const join = require('path').join;
const BASE_ROUTE = join(__dirname, 'base');

module.exports = () => {
  const router = Router();

  /**
   * @description Bootstrapping app routes in handlers folder
   *              This will loop through all .js files in the handlers folder,
   *              add a route to the routed using the requestType at the given endpoint,
   *              and set the function called endpoint as the listener
   */
  klawSync(BASE_ROUTE, { nodir: true })
    .filter((file) => ~file.path.indexOf('.js'))
    .forEach(({ path }) => {
      const file = path.replace(BASE_ROUTE, '');

      try {
        const route = require(path);

        // we remove the base path which will give us the full route
        const endpoint = path.replace(BASE_ROUTE, '').slice(0, -3); // -3 to account for .js

        const endpointHandler = route.endpoint;

        // check if any middlewares are present
        const handlers = route.middlewares
          ? [...route.middlewares, endpointHandler]
          : endpointHandler;

        router.route(`${endpoint}`)[route.requestType](handlers);
        console.info(`successfully bootstrapped route: ${endpoint}`);
      } catch (err) {
        console.error(`Error bootstrapping route:  ${file} ->  ${err}`);
      }
    });

  return router;
};
