const jwt = require('jsonwebtoken');
const { METHODS } = require('../utils');

const resetPasswordWithTokenHandler = async (req, res) => {
  const { token } = req.params ?? {};

  jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
    if (err) {
      res
        .status(400)
        .json({ auth: false, message: "failed to authenticate token. " });
    }

    req.userId = result.id;
    next();
  });
}

module.exports = {
  path: '/password/reset/:token',
  method: METHODS.POST,
  functions: [resetPasswordWithTokenHandler]
};
