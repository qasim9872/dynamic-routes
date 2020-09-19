const port = 3000;

const express = require('express');
const { json } = require('body-parser');
const app = express();

app.use(json());

const dynamicRoutes = require('./dynamic-routes');
app.use('/dynamic-routes', dynamicRoutes());

const routes = require('./routes');
app.use('/routes', routes());

app.listen(port, () => console.log(`api is running on ${port}`));
