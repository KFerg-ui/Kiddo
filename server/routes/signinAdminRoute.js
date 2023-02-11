const { Login } = require('./models');
const { METHODS, compareHash, generateAdminAccessToken } = require('../utils');

const signinAdminHandler = async (req, res) => {
  const { email, password } = req.body ?? {};
  const results = await Login.findOne({
    $and: [{ email: email }, { usertype: "admin" }],
  });
  if (results) {
    if (await compareHash(password, results.password)) {
      const token = generateAdminAccessToken(email);
      res.json({ auth: true, token: token, result: results });
    } else {
      res.json({ auth: false, message: "incorrect password" });
    }
  } else {
    res.json({ auth: false, message: "no user found with that email" });
  }
};

module.exports = {
  path: '/signin/admin',
  method: METHODS.POST,
  functions: [signinAdminHandler]
};
