let express = require('express');
let router = express.Router();
let mw = require('../middleware.js');
let handler = require('./handlers.js');

router.get('/', handler.listEvents);
router.post('/', mw.verifyToken, handler.createEvent);
router.get('/:id', handler.getEvent);
router.patch('/:id', mw.verifyToken, handler.updateEvent);
router.delete('/:id', mw.verifyToken, handler.deleteEvent);
router.get('/:id/participants', handler.listParticipants);

module.exports = router;
