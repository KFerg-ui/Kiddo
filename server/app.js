const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8000;
const path = require ('path');
const app = express();
const mainRoutes = require("./controllers/mainRoutes");
const forgotPassword = require("./controllers/forgotPassword")

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', `http://localhost:${port}`, 'https://kiddo-investors.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}



app.use(cors(corsOptions))
app.use(express.json())
app.use(mainRoutes)

module.exports = app;