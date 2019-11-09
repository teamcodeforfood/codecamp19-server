let express = require('express');
let router = express.Router({ mergeParams: true });
let mw = require('../middleware.js')
let handler = require('./handlers.js');

router.post('/register', handler.register);
router.post('/authenticate', handler.authenticate);
router.get('/checkAuthentication', mw.verifyToken, handler.checkAuthentication);
router.get('/:user_id', handler.getUser);
router.patch('/:user_id', mw.verifyToken, handler.updateUser);
router.delete('/:user_id', mw.verifyToken, handler.deleteUser);
router.get('/:user_id/teams', mw.verifyToken, handler.getUserTeams);
router.get('/:user_id/events', mw.verifyToken, handler.getUserEvents);

module.exports = router;
