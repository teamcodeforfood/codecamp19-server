let express = require('express');
let router = express.Router();
let mw = require('../middleware.js');
let handler = require('./handlers.js');

router.get('/:id', handler.getEvent);
router.post('/', mw.verifyToken, handler.createEvent);

module.exports = router;
