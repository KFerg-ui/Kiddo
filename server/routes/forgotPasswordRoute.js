const { Login } = require('./models');
const {
  METHODS,
  emailTransporter,
  generatePasswordResetToken,
  buildPasswordResetEmail
} = require('../utils');

const forgotPasswordHandler = async (req, res) => {
  const { email } = req.body ?? {};

  if (!email) {
    return res.status(400).send({ message: 'Email field is empty' });
  }

  const user = await Login.findOne({ email });
  
  if (!user) {
    return res.status(400).send({ message: 'No account found matching that email' });
  }
  
  const transporter = emailTransporter();
  const resetToken = generatePasswordResetToken(email);
  const mailOptions = buildPasswordResetEmail(email, resetToken);

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error sending email' });
    }

    return res.status(200).send({ message: 'Email sent' });
  });
};

module.exports = {
  path: '/password/forgot',
  method: METHODS.POST,
  functions: [forgotPasswordHandler]
};
