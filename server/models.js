const { NewsletterSchema, LoginSchema } = require("./Schema");
const mongoose = require('mongoose')

const atlasUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`;

const Login = mongoose.model("logins", LoginSchema);
const Newsletter = mongoose.model("newsletter", NewsletterSchema);

module.exports = { Login, Newsletter }
