const router = require("express").Router();
const { Newsletter, Login } = require("../Schema")
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
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
    
    console.log(hashed)
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
    
    console.log(bool)
    return bool
}


router 
    .route("/customer-service")
    .get(async(req,res)=>{
        //show companies
    })

router 
    .route("customer-service/:company")
    .get(async(req,res)=>{
        //show specific company data
    })

router
    .route("/signup/submit")
    .post(async (req,res)=>{
        //push signup data
    })

router  
    .route("/newsletter")
    .post(async (req,res)=>{
        const { name, email, phone } = req.body
        let temp = await hash(email)
        await Newsletter.create( { name: name, email: temp, phone: phone})
        await compareHash(email,temp)
        res.send(`${hash(name)}`);
    })

module.exports = router