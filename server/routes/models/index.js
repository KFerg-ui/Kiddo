const mongoose = require('mongoose')

require('dotenv').config();
const atlasUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`;

mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind('Connection error'));

// Schemas
const NewsletterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: String
});

const LoginSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: String,
    preferredContact: String,
    address: String,
    business: { type: String },
    contact: [String],
    investment: [String],
    notes: [String],
    usertype: String
});

// Model association
const Login = mongoose.model("logins", LoginSchema);
const Newsletter = mongoose.model("newsletter", NewsletterSchema);

module.exports = { Login, Newsletter };