'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
  const hobbyToLookup = request.params.hobby;
  const data = await mockDBCalls.getListOfAgesOfUsersWith(hobbyToLookup);
  return response.status(200).send(JSON.stringify(data));
};

module.exports = (app) => {
  app.get('/users/age/:hobby', getListOfAgesOfUsersWithHandler);
};
