require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');
let api = require('./routes/api.js');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api", api)

let port = process.env.PORT
app.listen(port, () => {
  console.log("server running on port " + port)
})
