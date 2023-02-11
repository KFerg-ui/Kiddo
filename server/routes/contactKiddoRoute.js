const jwt = require('jsonwebtoken');
const { verifyJwt } = require('./middleware/verifyJwt')
const { emailTransporter, buildContactKiddoEmail, METHODS } = require('../utils');

const contactKiddoHandler = async (req, res) => {
  const { message } = req.body ?? {};
  const { accesstoken } = req.headers ?? {};

  const { email } = jwt.decode(accesstoken);

  if (!message) {
    res.status(400).send({ message: 'Message field is empty' });
  }

  const transporter = emailTransporter();
  const mailOptions = buildContactKiddoEmail(email, message)
  
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error sending email' });
    } else {
      res.status(200).send({ message: 'Email sent' });
    }
  });
};

module.exports = {
  path: '/contact',
  method: METHODS.POST,
  functions: [verifyJwt, contactKiddoHandler]
};
