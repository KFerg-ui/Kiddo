const verifyUserRoute = require('./verifyUserRoute');
const customerServiceRoute = require('./customerServiceRoute');
const customerServiceCompanyRoute = require('./customerServiceCompanyRoute');
const customerServiceNotesCompanyRoute = require('./customerServiceNotesCompanyRoute');
const signinAdminRoute = require('./signinAdminRoute');
const signinRoute = require('./signinRoute');
const signinSubmitRoute = require('./signinSubmitRoute');
const newsletterRoute = require('./newsletterRoute');
const forgotPasswordRoute = require('./forgotPasswordRoute');
const resetPasswordRoute = require('./resetPasswordRoute');
const resetPasswordWithTokenRoute = require('./resetPasswordWithTokenRoute');
const contactKiddoRoute = require('./contactKiddoRoute');

const routes = [
  verifyUserRoute,
  customerServiceRoute,
  customerServiceCompanyRoute,
  customerServiceNotesCompanyRoute,
  signinAdminRoute,
  signinRoute,
  signinSubmitRoute,
  newsletterRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  resetPasswordWithTokenRoute,
  contactKiddoRoute
];

module.exports = { routes };
