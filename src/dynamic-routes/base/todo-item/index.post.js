const controller = require('../../../controllers/todo-item');

function endpointHandler(req, res) {
  return res.json(controller.createItem(req.body));
}

module.exports = {
  endpointHandler,
};
