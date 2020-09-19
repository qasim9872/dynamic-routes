const endpointHandler = (request, response) => {
  response.sendStatus(200);
};

module.exports = {
  endpointHandler,
  requestType: 'get',
};
