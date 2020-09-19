const controller = require('../../../controllers/todo-item');

function endpointHandler(req, res) {
  return res.json(controller.deleteItem(req.params.id));
}

module.exports = {
  endpointHandler,
};
