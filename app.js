require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let api = require('./routes/api.js');
let app = express();

if (process.env.NODE_ENV == 'dev') {
  require('dotenv').config();
}

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.get("origin"));
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Content-type, Authorization");
//   next();
// });
// app.options("*", function(req, res, next) {
//   res.header("Access-Control-Allow-Headers", "Content-type, Authorization");
//   next();
// });
app.use(cors({allowedHeaders: ['Content-Type', 'Authorization']}));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api", api)

let port = process.env.PORT
app.listen(port, () => {
  console.log("server running on port " + port)
})
