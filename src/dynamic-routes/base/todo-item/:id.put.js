const controller = require('../../../controllers/todo-item');

function endpointHandler(req, res) {
  return res.json(controller.updateItem(req.params.id, req.body));
}

module.exports = {
  endpointHandler,
};
