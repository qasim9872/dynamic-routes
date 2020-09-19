const port = 3000;

const express = require('express');
const app = express();

const routes = require('./routes');

app.use(routes());

app.listen(port, () => console.log(`api is running on ${port}`));
