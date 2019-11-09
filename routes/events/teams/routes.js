let express = require('express');
let router = express.Router();
let mw = require('../../middleware.js')
let handler = require('./handlers.js');

router.use(mw.verifyToken);

router.get('/', mw.verifyToken, handler.getTeams);
router.post('/', mw.verifyToken, handler.createTeam);
router.get('/:team_id', handler.getTeam);
router.patch('/:team_id', mw.verifyToken, handler.updateTeam);
router.delete('/:team_id', mw.verifyToken, handler.deleteTeam);

router.post('/joinTeam', mw.verifyToken, handler.joinTeam);
router.delete('/leaveTeam', mw.verifyToken, handler.leaveTeam);
router.get('/:team_id/participants', handler.getTeamParticipants);

module.exports = router;
