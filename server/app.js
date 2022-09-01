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
    // console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // console.log("Origin acceptable")
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
// app.use(forgotPassword)
// ! Our URL routes are not currently working
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join('/app/client/build')));

//     console.log(`Path: ` + path)

//     console.log("PRODUCTION ENVIRONMENT")
//     app.get('*', function ( req , res ) {
//       res.sendFile(path.join('app/client/build', 'index.html'));
          
//       })
    
//   }

app.get("*", (req, res) => {
  let url = path.join(__dirname, '../client/build', 'index.html');
  if (!url.startsWith('/app/')) // since we're on local windows
    url = url.substring(1);
  res.sendFile(url);
});

module.exports = app;