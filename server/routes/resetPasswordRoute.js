const jwt = require('jsonwebtoken');
const { verifyJwt } = require('./middleware/verifyJwt');
const { Login } = require('./models');
const { METHODS, hash } = require('../utils');

const resetPasswordHandler = async (req, res) => {
  const { newPass } = req.body ?? {};
  const { accesstoken } = req.headers ?? {};
  const { userEmail: email } = jwt.decode(accesstoken);

  const password = await hash(newPass);

  await Login.updateOne({ email }, { password });

  res.status(200).send({ message: "Password reset complete" });
};

module.exports = {
  path: '/password/submit-new',
  method: METHODS.POST,
  functions: [verifyJwt, resetPasswordHandler]
};
