const nodeMailer = require("nodemailer");
// const sesTransport = require('nodemailer-ses-transport');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT);

const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

const hash = async (toHash) => await new Promise((resolve, reject) => {
  bcrypt.hash(toHash, saltRounds, (err, hash) => {
    if (err) reject(err);
    resolve(hash);
  });
});

const compareHash = async (plain, hashed) => {
  let isHashMatching = false;
  
  try {
    isHashMatching = await new Promise((resolve, reject) => {
      bcrypt.compare(plain, hashed, (err, result) => {
        if (err) reject(err);
        resolve(!!result);
      });
    });
  } catch ({ message }) {
    const today = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
    console.error(today, `- Hash comparison failed - ${message}`);
  }

  return isHashMatching;
};

const generateAccessToken = userEmail => jwt.sign({ userEmail }, process.env.TOKEN_SECRET, { expiresIn: '24h' });

const generateAdminAccessToken = userEmail => jwt.sign({ userEmail, admin: true }, process.env.TOKEN_SECRET, { expiresIn: '24h' });

const generatePasswordResetToken = userEmail => jwt.sign({ userEmail }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

const buildContactKiddoEmail = (userEmail, message) => ({
  from: `${process.env.ROBOT_EMAIL}`,
  to: `${process.env.CUSTOMER_SUPPORT_EMAIL}`,
  subject: `Automated Message from Kiddo Investor Website`,
  text: `This message was submitted by a user on the Kiddo investor portal: \n\n ${message}
    \n\n Message sent from account: ${userEmail}`
});

const buildPasswordResetEmail = (userEmail, token) => {
  let url = process.env.NODE_ENV === 'production'
      ? process.env.PRODUCTION_URL
      : 'http://localhost:3000';

  console.log(process.env.ROBOT_EMAIL);
  console.log(userEmail);
  console.log(url);
  console.log(process.env.ACCT_SERVICES_USER);
  console.log(process.env.ACCT_SERV_EMAIL_PASS);

  return {
    from: `${process.env.ROBOT_EMAIL}`,
    to: `${userEmail}`,
    subject: `Password Reset Request`,
    text: `You are receiving this message because you or someone else has requested the reset of the password associated with this email address.\n\n
            Click the link below, or paste it into your browser, to complete the password reset process within one hour of receiving this email.\n\n
            ${url}/#/reset-password/${token}\n\n
            If you did not request this, please ignore this email, and your password will remain unchanged.`,
  };
};

const emailTransporter = () => nodeMailer.createTransport({
  port: 587,
  host: `email-smtp.us-east-1.amazonaws.com`,
  secure: false,
  auth: {
    user: `${process.env.ACCT_SERVICES_USER}`,
    pass: `${process.env.ACCT_SERV_EMAIL_PASS}`,
  },
  debug: true
});

module.exports = {
  METHODS,
  hash,
  compareHash,
  generateAccessToken,
  generateAdminAccessToken,
  generatePasswordResetToken,
  buildContactKiddoEmail,
  buildPasswordResetEmail,
  emailTransporter
};
