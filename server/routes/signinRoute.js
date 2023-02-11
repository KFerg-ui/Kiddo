const { Login } = require('./models');
const { METHODS, compareHash, generateAccessToken } = require('../utils');

const signinHandler = async (req, res) => {
  const { email, password } = req.body ?? {};
  
  const user = await Login.findOne({ email });

  if (await compareHash(password, user?.password)) {
    const token = generateAccessToken(email);
    res.json({ auth: true, token, result: user });
  } else {
    res.json({ auth: false, message: 'Incorrect username/password' });
  }
};

module.exports = {
  path: '/signin',
  method: METHODS.POST,
  functions: [signinHandler]
};
