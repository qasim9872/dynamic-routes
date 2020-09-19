const port = 3000;

const express = require('express');
const app = express();

app.listen(port, () => console.log(`api is running on ${port}`));
