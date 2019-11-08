let express = require('express');
let router = express.Router();
let mw = require('../middleware.js');
let handler = require('./handlers.js');

router.post('/', mw.verifyToken, handler.createEvent);
router.get('/', handler.listEvents);
router.patch('/:id', handler.updateEvent);
router.delete(':id', handler.deleteEvent);
router.get('/:id', handler.getEvent);

module.exports = router;
