const { verifyJwt } = require('./middleware/verifyJwt');
const { METHODS } = require('../utils');

const verifyUserHandler = async (req, res) => res.json({ auth: true });

module.exports =   {
  path: '/verify-user',
  method: METHODS.GET,
  functions: [verifyJwt, verifyUserHandler]
};
