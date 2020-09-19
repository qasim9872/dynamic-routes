const requestType = require('../../request-type').GET;
const endpointName = '/world';

const endpoint = (request, response) => {
  response.sendStatus(200);
};

module.exports = {
  endpoint,
  requestType,
  endpointName,
};
