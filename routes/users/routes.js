let express = require('express');
let router = express.Router();
let mw = require('../middleware.js')
let handler = require('./handlers.js');

router.post('/register', handler.register);
router.post('/authenticate', handler.authenticate);
router.get('/checkAuthentication', mw.verifyToken, handler.checkAuthentication);

module.exports = router;
