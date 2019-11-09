let db = require('../../../database.js');

module.exports.listJudges = (req, res) => {
  db.Role.findAll({
    where: {
      event_id: req.params.event_id,
      level: 1,
    },
  }).then((assignments) => {
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
  });
}

module.exports.assignJudge = (req, res) => {
  db.JudgeTeamAssignment.create({
    event_id: req.params.event_id,
    judge_user_id: req.body.user_id,
  }).then((assignment) => {
    return res.status(201).json(assignment);
  }).catch((error) => {
    return res.status(500).json({ msg: 'error assigning judge: ' + err });
  });
}

module.exports.unassignJudge = (req, res) => {
  db.JudgeTeamAssignment.destroy({
    event_id: req.params.event_id,
    judge_user_id: req.params.user_id
  }).then(() => {
    return res.status(200);
  }).catch((error) => {
    return res.status(500).json({ msg: 'error unassigning judge: ' + err });
  });
}