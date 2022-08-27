const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8000;
const app = express();
const mainRoutes = require("./controllers/mainRoutes");
const forgotPassword = require("./controllers/forgotPassword")

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function ( req , res ) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    })
}


app.use(cors())
app.use(express.json())
app.use(mainRoutes)
// app.use(forgotPassword)

module.exports = app;