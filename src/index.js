const port = 3000;

const express = require('express');
const { json } = require('body-parser');
const app = express();

app.use(json());
app.get('/healthcheck', function (req, res) {
  res.sendStatus(200);
});

// const routes = require('./dynamic-routes');
// app.use(routes());

app.listen(port, () => console.log(`api is running on ${port}`));
