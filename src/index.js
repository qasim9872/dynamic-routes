const port = 3000;

const express = require('express');
const app = express();

app.get('/healthcheck', (req, res) => res.sendStatus(200));

app.listen(port, () => console.log(`api is running on ${port}`));
