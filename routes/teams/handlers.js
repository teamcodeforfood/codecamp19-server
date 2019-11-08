let db = require('../../database.js');

module.exports.getTeams = (req, res) => {
  db.Team.findAll({where: {
		event_id: req.params.event_id
	}}).then((teams) => {
		res.json({
			teams: teams,
		});
	}).catch((error) => {
		res.status(500);
    res.json({
      msg: "Error finding teams with event id " + req.params.event_id + ": " + error,
    });
	});
}

module.exports.getTeam = (req, res) => {
	db.Team.findOne({where: {
    id: req.params.id,
  }}).then((team) => {
    if(team !== null) {
      res.json({
        team: team,
      });
    } else {
      res.status(404);
      res.json({
        msg: "There is no team with the id of " + req.params.id,
      });
    }
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error finding team " + req.params.id + ": " + error,
    });
  });
}

module.exports.createTeam = (req, res) => {
	db.Team.create({
		name: req.body.name,
		event_id: req.body.event_id,
		join_code: req.body.join_code,
		code_url: req.body.code_url,
		design_url: req.body.design_url,
		project_url: req.body.project_url,
		tasks_url: req.body.tasks_url,
		project_description: req.body.project_description,
		division_id: req.body.division_id,
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
			division_id: req.body.division_id,
			room_number: req.body.room_number,
			table_number: req.body.table_number,
		},
		{where: {id: req.params.id}},
	).then((rowsUpdated) => {
		res.json({
			rowsUpdated
		});
	}).catch((error) => {
		res.status(500);
    res.json({
      msg: "Error updating team " + req.body.id + ": " + error
    });
	});
}

module.exports.deleteTeam = (req, res) => {
	db.Team.destroy({where: {
    id: req.params.id,
  }}).then(() => {
    res.json({
      msg: "Team " + req.params.id + " deleted."
    });
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error deleting team " + req.body.id + ": " + error
    });
  });
}
