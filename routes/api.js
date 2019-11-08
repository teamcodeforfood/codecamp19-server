let express = require('express');
let mw = require('./middleware.js')
let router = express.Router();

router.use(mw.logger);

let users = require('./users/routes.js');
router.use("/users", users);

module.exports = router;
