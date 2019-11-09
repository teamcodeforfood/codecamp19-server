let express = require('express');
let router = express.Router();
let mw = require('../middleware.js')
let handler = require('./handlers.js');

router.use(mw.verifyToken);

router.get('/:team_id', handler.getTeam);
router.post('/', handler.createTeam);
router.patch('/:team_id', handler.updateTeam);
router.delete('/:team_id', handler.deleteTeam);

router.post('/joinTeam', handler.joinTeam);
router.delete('/leaveTeam', handler.leaveTeam);
router.get('/:team_id/participants', handler.getTeamParticipants);

module.exports = router;
