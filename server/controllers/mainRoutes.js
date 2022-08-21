const router = require("express").Router();
const { Newsletter, Login } = require("../models");
var bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { parse } = require("dotenv");
require("dotenv").config();
const saltRounds = parseInt(process.env.SALT);
const nodeMailer = require("nodemailer")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const buildPasswordResetEmail = (userEmail, token) => {

    const mailOptions = {
        from : `${process.env.ROBOT_EMAIL}`,
        to: `${userEmail}`,
        subject: `Password Reset Request`,
        text:
            `You are receiving this message because you or someone else has requested the reset of the password associated with this email address.\n\n
            Click the link below, or paste it into your browser, to complete the password reset process within one hour of receiving this email.\n\n
            http://localhost:3000/reset-password/${token}\n\n
            If you did not request this, please ignore this email, and your password will remain unchanged.`
    }

    return mailOptions;

}

const emailTransporter = () => {

    console.log(process.env.ACCT_SERVICES_USER)
    console.log(process.env.ACCT_SERVICES_EMAIL_PASS)

    const transporter = nodeMailer.createTransport({
        service: 'zoho',
        auth: {
            user: `${process.env.ACCT_SERVICES_USER}`,
            pass: `${process.env.ACCT_SERV_EMAIL_PASS}`,
        }
    })
    return transporter;
}

function verifyJWT(req,res,next){
    const token = req.headers.accesstoken;
    console.log(`verify token ${token}`)
    if(!token){
        res.json({auth: false, message: "Token not found"})
    }
    else{
        jwt.verify(token, process.env.TOKEN_SECRET,(err,result)=>{
            if(err){
                res.json({auth: false, message: "failed to authenticate token."})
            }
            else{
                req.userId = result.id;
                next();
            }
        })
    }
}

function verifyAdmin(req,res,next){
    const token = req.headers["accesstoken"];
    if(!token){
        res.json({auth: false, message: "Token not found"})
    }
    else{
        jwt.verify(token, process.env.TOKEN_SECRET,(err,result)=>{
            if(result && result.admin){
                req.userId = result.id;
                next();
            }
            else{
                res.json({auth: false, message: "failed to authenticate token"})
            }
        })
    }
}


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

async function compareHash(plain, hashed) {
  const bool = await new Promise((resolve, reject) => {
    bcrypt.compare(plain, hashed, function (err, result) {
      if (err) reject(err);
      if (result) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
  // console.log(bool)
  return bool;
}

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: `24h` }) 
}

function generatePasswordResetToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: `1h` }) 
}

router
    .route("/verifyUser")
    .get( verifyJWT, async(req, res)=>{
        res.json({auth: true})
    })

router 
    .route("/customer-service")
    .get( verifyAdmin, async(req,res)=>{
        let search = req.headers["search"]
        let method = req.headers["method"]
        search = new RegExp(search , "i")
        const investors = await Login
            .find({usertype: "investor", [method]: search})
        res.json({auth: true, investors: investors})
    })

router 
    .route("/customer-service/:company")
    .get(verifyAdmin, async(req,res)=>{ //FORCE CAPITLIZATION
        const results = await Login.findOne({business: req.params.company.replace(/_/g," ")})
        res.json({auth: true, company: results})
    })

router
    .route("/customer-service/notes/:company")
    .get(verifyAdmin, async(req,res)=>{
        let note = req.headers["note"]
        await Login.updateOne(
            {business: req.params.company.replace(/_/g," ") },
            {$push:{notes: note}}
        )
        res.json({sent:true})
    })



router
    .route("/signin/admin")
    .post(async(req,res)=>{
        const {email, password } = req.body
        const results = await Login.findOne({     
            $and: [
                { email : email },
                { usertype: "admin" }
          ]})
        if(results){
            if(await compareHash(password, results.password)){
                const token = generateAccessToken({email:email, admin:true});
                res.json({auth:true, token: token, result: results})
            }
            else{
                res.json({auth:false, message: "incorrect password"})
            }
        }
        else{
            res.json({auth:false, message: "no user found with that email"})
        }
    })


router
    .route("/signin")
    .post(async(req,res)=>{
        console.log(req.body)
        const { email, password } = req.body
        const results = await Login.findOne({email: email})
        if(results){
            if(await compareHash(password, results.password)){
                const token = generateAccessToken({ email: email, admin:false});
                res.json({auth: true, token: token, result: results})
            }
            else{
                res.json({auth: false, message: "incorrect password"})
            }
        }
        else{
            res.json({auth: false, message: "no user found with that email"})
        }
    })

router.route("/signup/submit").post(async (req, res) => { //FORCE BUSINESS CAPITILZATION 
  const { firstName, lastName, email, password, passwordConfirm, phone, address, business } =
    req.body;

    if(password === passwordConfirm){
        
        const pass = await hash(password);
        await Login.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: pass,
          phone: phone,
          address: address,
          business: business,
          usertype: "investor"
        })
          .then((result) => {
            res.status(200).send({ message : `account created`});
          })
          .catch((err) => res.status(400).send({ message : `Error: ${err}`}));
    } else {
        res.status(400).send({ message : `Password fields must match`})
    }




});

router
    .route("/signin")
    .post(async(req,res)=>{
        const { email, password } = req.body
        const results = await Login.findOne({email: email})
        if(results){
            if(await compareHash(password, results.password)){
                const token = generateAccessToken({email});
                res.json({auth: true, token: token, result: results})
            }
            else{
                res.json({auth: false, message: "incorrect password"})
            }
        }
        else{
            res.json({auth: false, message: "no user found with that email"})
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
            .then(result => {res.json({duplicate: false})}) //If data gets pushed
            .catch(err => res.json({duplicate: true})); // if data is rejected
    })

router
    .route("/password/forgot")
    .post(async (req, res) => {
        console.log(req.body)
        const userEmail = req.body.email
        console.log(`input: `, userEmail)

        if (userEmail !== ""){
            const user = await Login.findOne({email: userEmail})
            // const responseData = await databaseResponse

            if (user){

                const transporter = emailTransporter()
                const resetToken = generatePasswordResetToken({userEmail})
                const mailOptions = buildPasswordResetEmail(userEmail, resetToken)
                console.log(`options: `, mailOptions)

                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.error(err);
                        res.send({message : `Error sending email`})
                    } else {
                        console.log(`response: ${response}`)
                        res.status(200).send({message : `email sent`})
                    }
                })
    
            } else {
                res.status(400).send({message : "no account found matching that email"})
            }

        } else {
            res.status(400).send({ message : `email field is empty`})
        }
        

    })

    router
        .route("/password/submit-new")
        .post( verifyJWT, (req, res) => {
            console.log(req.body);
            const newPass = req.body.newPass
            console.log(newPass)
            res.status(200)
        } )

router
    .route("/password/reset/:token")
    .post( async (req, res) => {
        const token = req.params.token

        jwt.verify(token, process.env.TOKEN_SECRET,(err,result)=>{
            if(err){
                res.status(400).json({auth: false, message: "failed to authenticate token. "})
            }
            else{
                req.userId = result.id;
                next();
            }
        })

        
    })
    


module.exports = router
