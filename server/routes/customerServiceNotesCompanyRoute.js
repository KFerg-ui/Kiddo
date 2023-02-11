const { Login } = require('./models');
const { verifyAdmin } = require('./middleware/verifyAdmin')
const { METHODS } = require('../utils');

const customerServiceNotesCompanyHandler = async (req, res) => {
  const { note } = req.headers ?? {};

  await Login.updateOne(
    { business: req.params.company.replace(/_/g, " ") },
    { $push: { notes: note } }
  );

  res.json({ sent: true });
}

module.exports = {
  path: '/customer-service/notes/:company',
  method: METHODS.GET,
  functions: [verifyAdmin, customerServiceNotesCompanyHandler]
};
