let express = require('express');
let router = express.Router();
let mw = require('../../middleware.js')
let handler = require('./handlers.js');

router.use(mw.verifyToken);

router.get('/:id', handler.getTeam);
router.post('/', handler.createTeam);
router.patch('/:id', handler.updateTeam);
router.delete('/:id', handler.deleteTeam);

router.post('/joinTeam', handler.joinTeam);
router.delete('/leaveTeam', handler.leaveTeam);
router.get('/:id/participants', handler.getTeamParticipants);

module.exports = router;
