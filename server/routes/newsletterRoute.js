const { Newsletter } = require('./models');
const { METHODS } = require('../utils');

const newsletterHandler = async (req, res) => {
  const { name, email, phone } = req.body ?? {};
  await Newsletter.create({ name, email, phone })
    .then(result => {
      res.json({ duplicate: false });
    }, err => {
      res.json({ duplicate: true });
    });
};

module.exports = {
  path: '/newsletter',
  method: METHODS.POST,
  functions: [newsletterHandler]
};
