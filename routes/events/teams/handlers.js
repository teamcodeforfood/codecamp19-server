let db = require('../../../database.js');
let shortid = require('shortid');

module.exports.getTeam = (req, res) => {
	db.Team.findOne({where: {
    id: req.params.team_id,
  }}).then((team) => {
    if(team !== null) {
      res.json(team);
    } else {
      res.status(404);
      res.json({
        msg: "There is no team with the id of " + req.params.team_id,
			});
    }
  }).catch((error) => {
		db.Team.findOne({where: {
			join_code: req.params.team_id
		}}).then((team) => {
			if(team !== null) {
				res.json(team);
			} else {
				res.status(404);
				res.json({
					msg: "There is no team with the join code of " + req.params.team_id,
				});
			}
		}).catch((error) => {
			res.status(500);
			res.json({
				msg: "Error finding team by id or join code " + req.params.team_id + ": " + error,
			});
		});
  });
}

module.exports.createTeam = (req, res) => {
	var join_code = shortid.generate();
	db.Team.create({
		name: req.body.name,
		event_id: req.body.event_id,
		join_code: join_code,
		code_url: req.body.code_url,
		design_url: req.body.design_url,
		project_url: req.body.project_url,
		tasks_url: req.body.tasks_url,
		project_description: req.body.project_description,
		event_division_id: req.body.event_division_id,
		room_number: req.body.room_number,
		table_number: req.body.table_number,
	}).then((team) => {
		res.status(201);
		res.json({
			team: team,
		});
	}).catch((error) => {
		res.status(422);
		res.json({
			msg: "Failed to create new team: " + error
		});
	});
}

module.exports.updateTeam = (req, res) => {
	db.Team.update(
		{
			name: req.body.name,
			event_id: req.body.event_id,
			join_code: req.body.join_code,
			code_url: req.body.code_url,
			design_url: req.body.design_url,
			project_url: req.body.project_url,
			tasks_url: req.body.tasks_url,
			project_description: req.body.project_description,
			event_division_id: req.body.event_division_id,
			room_number: req.body.room_number,
			table_number: req.body.table_number,
		},
		{where: {id: req.params.team_id}},
	).then((rowsUpdated) => {
		res.json({
			rowsUpdated
		});
	}).catch((error) => {
		res.status(500);
    res.json({
      msg: "Error updating team " + req.params.team_id + ": " + error
    });
	});
}

module.exports.deleteTeam = (req, res) => {
	db.Team.destroy({where: {
    id: req.params.team_id,
  }}).then(() => {
    res.json({
      msg: "Team " + req.params.team_id + " deleted."
    });
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error deleting team " + req.params.team_id + ": " + error
    });
  });
}

module.exports.joinTeam = (req, res) => {
	db.UserTeamAssignment.create({
		user_id: req.body.user_id,
		team_id: req.body.team_id,
	}).then((teamAssignment) => {
		res.status(201);
		res.json({
			teamAssignment: teamAssignment,
		});
	}).catch((error) => {
		res.status(422);
		res.json({
			msg: "Failed to create team assignment: " + error
		});
	});
}

module.exports.leaveTeam = (req, res) => {
	db.UserTeamAssignment.destroy({where: {
		user_id: req.body.user_id,
		team_id: req.body.team_id,
	}}).then(() => {
		res.json({
			msg: "User " + req.body.user_id + " has been removed from team " + req.body.team_id + "."
		});
	}).catch((error) => {
		res.status(500);
		res.json({
			msg: "Error removing user " + req.body.user_id + " from team " + req.body.team_id + ": " + error
		});
	});
}

module.exports.getTeamParticipants = (req, res) => {
	db.UserTeamAssignment.findAll({where: {
		team_id: req.params.team_id
	}}).then((userIDs) => {
		db.User.findAll({where: {
			id: userIDs
		}}).then((users) => {
			res.json({
				users: users
			});
		}).catch((error) => {
			res.status(500);
			res.json({
				msg: "Error grabbing users from user ids: " + error,
			});
		});
	}).catch((error) => {
		res.status(500);
    res.json({
      msg: "Error finding user ids from team id " + req.params.team_id + ": " + error,
    });
	});
}
