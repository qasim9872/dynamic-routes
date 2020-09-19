const controller = require('../../../controllers/todo-item');

function endpointHandler(req, res) {
  return res.json(controller.readItem(req.params.id));
}

module.exports = {
  endpointHandler,
};
