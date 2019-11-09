let express = require('express');
let router = express.Router();
let mw = require('../middleware.js');
let handler = require('./handlers.js');

router.get('/', handler.listEvents);
router.post('/', mw.verifyToken, handler.createEvent);
router.get('/:id', handler.getEvent);
router.get('/:id', handler.getEvent);
router.patch('/:id', mw.verifyToken, handler.updateEvent);
router.delete('/:id', mw.verifyToken, handler.deleteEvent);
let roles = require('./roles/routes.js');
router.use('/:id/roles', roles);
let divisions = require('./divisions/routes.js');
router.use('/:id/divisions', divisions);
let categories = require('./categories/routes.js');
router.use('/:id/categories', categories);
router.get('/:id/participants', handler.listParticipants);

module.exports = router;
