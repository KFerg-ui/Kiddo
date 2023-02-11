const { Login } = require('./models');
const { verifyAdmin } = require('./middleware/verifyAdmin')
const { METHODS } = require('../utils');

const customerServiceCompanyHandler = async (req, res) => {
  // FORCE CAPITALIZATION
  const company = await Login.findOne({
    business: req.params.company.replace(/_/g, ' '),
  });
  
  res.json({ auth: true, company });
}

module.exports = {
  path: '/customer-service/:company',
  method: METHODS.GET,
  functions: [verifyAdmin, customerServiceCompanyHandler]
}
