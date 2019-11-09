let express = require('express');
let router = express.Router();
let mw = require('../middleware.js');
let handler = require('./handlers.js');

let roles = require('./roles/routes.js');
router.use('/:event_id/roles', roles);
let divisions = require('./divisions/routes.js');
router.use('/:event_id/divisions', divisions);
let categories = require('./categories/routes.js');
router.use('/:event_id/categories', categories);
let teams = require('./teams/routes.js');
router.use("/:event_id/teams", teams);
let judges = require('./judges/routes.js');
router.get('/:event_id/judges', judges);
router.get('/', handler.listEvents);
router.post('/', mw.verifyToken, handler.createEvent);
router.get('/:event_id', handler.getEvent);
router.patch('/:event_id', mw.verifyToken, handler.updateEvent);
router.delete('/:event_id', mw.verifyToken, handler.deleteEvent);

router.get('/:event_id/participants', handler.listParticipants);

module.exports = router;
