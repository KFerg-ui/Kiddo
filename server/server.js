const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8000;
const app = express();
const mainRoutes = require("./controllers/mainRoutes");

app.use(cors())
app.use(express.json())
app.use(mainRoutes)

app.listen(port, () => {
  console.log('listening on port: ' + port) 
})