const { verifyAdmin } = require('./middleware/verifyAdmin');
const { METHODS } = require('../utils');
const { Login } = require('./models');

const customerServiceHandler = async (req, res) => {
  const { search, method } = req.headers ?? {};
  
  const investors = await Login.find({
    usertype: "investor",
    [method]: new RegExp(search, 'i'),
  });

  res.json({ auth: true, investors });
};

module.exports = {
  path: '/customer-service',
  method: METHODS.GET,
  functions: [verifyAdmin, customerServiceHandler]
};
