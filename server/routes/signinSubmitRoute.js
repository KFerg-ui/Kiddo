const { Login } = require('./models');
const { METHODS, hash } = require('../utils');

const signinSubmitHandler = async (req, res) => {
  //FORCE BUSINESS CAPITALIZATION
  const {
    password,
    passwordConfirm,
    usertype,
    ...restOfBody
  } = req.body ?? {};

  if (password !== passwordConfirm) {
    res.status(400).send({ message: 'Password fields must match' });
  } else {
    const pass = await hash(password);
    
    await Login.create({
      password: pass,
      usertype,
      ...restOfBody
    }).then(result => {
      res.status(200).send({ message: 'Account created' });
    }, err => {
      res.status(400).send({ message: 'Error: ${err}' });
    });
  }
};

module.exports = {
  path: '/signup/submit',
  method: METHODS.POST,
  functions: [signinSubmitHandler]
};
