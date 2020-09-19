const controller = require('../../../controllers/todo-item');

function endpointHandler(req, res) {
  return res.json(controller.readAll());
}

module.exports = {
  endpointHandler,
};
