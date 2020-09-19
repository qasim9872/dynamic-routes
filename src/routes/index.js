const Router = require('express-promise-router');
const controller = require('../controllers/todo-item');

module.exports = () => {
  const router = Router();

  router.get('/todo-item/', (req, res) => res.json(controller.readAll()));

  router.post('/todo-item/', (req, res) =>
    res.json(controller.createItem(req.body))
  );
  router.get('/todo-item/:id', (req, res) => {
    return res.json(controller.readItem(req.params.id));
  });
  router.put('/todo-item/:id', (req, res) =>
    res.json(controller.updateItem(req.params.id, req.body))
  );
  router.delete('/todo-item/:id', (req, res) =>
    res.json(controller.deleteItem(req.params.id))
  );

  return router;
};
