let db = require('../../../database.js');

module.exports.listJudges = (req, res) => {
  db.JudgeTeamAssignment.findAll({
    where: {
      event_id: req.params.event_id,
    },
  }).then((assignments) => {
    if (assignments.length > 0) {
      let user_ids = [];
      for (assignment of assignments) {
        user_ids.push(assignment.user_id);
      }
      db.User.findAll({
        where: {
          id: user_ids,
        },
      }).then((judges) => {
        return res.status(200).json({ judges: judges });
      }).catch((error) => {
        return res.status(500).json({ msg: 'error listing judges: ' + error });
      });
    }
  });
}

module.exports.getJudge = (req, res) => {}

module.exports.assignJudge = (req, res) => {}

module.exports.unassignJudge = (req, res) => {}