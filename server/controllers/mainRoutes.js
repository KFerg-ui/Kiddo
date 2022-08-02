const router = require("express").Router();
const { Newsletter, Login } = require("../Schema")
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const saltRounds = parseInt(process.env.SALT)
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 


async function hash (toHash) {
    const hashed = await new Promise((resolve, reject) => {
      bcrypt.hash(toHash, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
    // console.log(hashed)
    return hashed
}

async function compareHash (plain,hashed) {
    const bool = await new Promise((resolve, reject) => {
      bcrypt.compare(plain, hashed, function(err, result) {
        if (err) reject(err)
        if(result){resolve(true)}
        else{resolve(false)}
      });
    })
    // console.log(bool)
    return bool
}

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: 1800 }) // EMAIL NEED STO BE AN OBJECT
}


router 
    .route("/customer-service")
    .get(async(req,res)=>{
        //show companies
        //Verify token
        res.send(`get`)
    })

router 
    .route("/customer-service/:company")
    .get(async(req,res)=>{
        //show specific company data
    })

router
    .route("/signin")
    .post(async(req,res)=>{
        const { email, password } = req.body
        const results = await Login.findOne({email: email})
        if(await compareHash(password, results.password)){
            const token = generateAccessToken({email});
            res.json(token)
        }
        else{
            res.send(`error`)
        }
    })

router
    .route("/signup/submit")
    .post(async (req,res)=>{
        //push signup data
        const { name, email, password, phone, address, business } = req.body
        const pass = await hash(password)
        await Login.create( {name: name, email: email, password: pass, phone: phone, address: address , business: business})
            .then(result =>{
             res.send(`account created`)})
            .catch(err => res.send(`Error: ${err}`))
    })

router  
    .route("/newsletter")
    .post(async (req,res)=>{
        const { name, email, phone } = req.body
        await Newsletter.create( { name: name, email: email, phone: phone})
            .then(result => {
                res.send(`data pushed`)}) //If data gets pushed
            .catch(err => res.send(`Error: Duplicate Email`)); // if data is rejected
    })

module.exports = router