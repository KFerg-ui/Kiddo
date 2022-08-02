const router = require("express").Router();
const { Newsletter, Login } = require("../Schema")
var bodyParser = require('body-parser');
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 

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
        await Newsletter.create( { name: name, email: email, phone: phone})
        res.send("data passed");
    })

module.exports = router