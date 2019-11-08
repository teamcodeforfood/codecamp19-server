let express = require('express');
let router = express.Router();
let mw = require('../middleware.js')
let handler = require('./handlers.js');

router.get('/:event_id', mw.verifyToken, handler.getTeams);
router.get('/:id', mw.verifyToken, handler.getTeam);
router.post('/', mw.verifyToken, handler.createTeam);
router.patch('/:id', mw.verifyToken, handler.updateTeam);
router.delete('/:id', mw.verifyToken, handler.deleteTeam);

module.exports = router;
