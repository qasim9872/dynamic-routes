const Router = require('express-promise-router');

const klawSync = require('klaw-sync');
const join = require('path').join;
const BASE_ROUTE = join(__dirname, 'base');

function processPath(path, route) {
  // we remove the base path which will give us the full route
  let endpointPath = path.replace(BASE_ROUTE, '').slice(0, -3); // -3 to account for .js
  let requestType = route.requestType; // default to get

  const requestTypeMatch = endpointPath.match(/\.(.*$)/);

  // prioritize the request type specified in the actual route
  if (!requestType && requestTypeMatch && requestTypeMatch[1]) {
    // if the request type is specified in the path, then we need to remove it from endpoint path
    requestType = requestTypeMatch && requestTypeMatch[1];
    endpointPath = endpointPath.slice(0, -requestType.length - 1); // -1 to account for the .
  }

  if (endpointPath.match(/\/index$/)) {
    endpointPath = endpointPath.replace(/\/index$/, ''); // if the file name has index, then we use the root and remove it
  }

  return { endpointPath, requestType };
}

module.exports = () => {
  const router = Router();

  /**
   * @description Bootstrapping app routes in base folder
   *              This will loop through all .js files in the base folder,
   *              add a route to the routed using the requestType at the given endpoint,
   *              and set the function called endpoint as the listener
   */
  klawSync(BASE_ROUTE, { nodir: true })
    .filter((file) => ~file.path.indexOf('.js'))
    .forEach(({ path }) => {
      const file = path.replace(BASE_ROUTE, '');

      try {
        const route = require(path);

        const { endpointPath, requestType } = processPath(path, route);

        const endpointHandler = route.endpointHandler;

        // check if any middlewares are present
        const handlers = route.middlewares
          ? [...route.middlewares, endpointHandler]
          : endpointHandler;

        router.route(`${endpointPath}`)[requestType](handlers);
        console.info(
          `successfully bootstrapped route: ${requestType} ${endpointPath}`
        );
      } catch (err) {
        console.error(`Error bootstrapping route:  ${file} ->  ${err}`);
      }
    });

  return router;
};
