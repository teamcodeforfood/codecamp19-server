let db = require('../../../database.js');

module.exports.getDivisions = (req, res) => {
	db.EventDivision.findAll({where: {
		event_id: req.params.event_id
	}}).then((divisions) => {
		res.json({
			divisions: divisions
		});
	}).catch((error) => {
		res.status(500);
		res.json({
			msg: "Could not find divisions for the event " + req.params.event_id + ": " + error
		});
	});
}

module.exports.getDivision = (req, res) => {
	db.EventDivision.findOne({where: {
    id: req.params.division_id,
  }}).then((division) => {
    if(division !== null) {
      res.json({
        division: division,
      });
    } else {
      res.status(404);
      res.json({
        msg: "There is no division with the id of " + req.params.division_id,
      });
    }
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error finding division " + req.params.division_id + ": " + error,
    });
  });
}

module.exports.createDivision = (req, res) => {
	db.EventDivision.create({
		name: req.body.name,
		description: req.body.description,
		event_id: req.body.event_id,
	}).then((division) => {
		res.status(201);
		res.json({
			division: division,
		});
	}).catch((error) => {
		res.status(422);
		res.json({
			msg: "Failed to create new division: " + error
		});
	});
}

module.exports.updateDivision = (req, res) => {
	db.EventDivision.update(
		{
			name: req.body.name,
      description: req.body.description,
      event_id: req.body.event_id,
		},
		{where: {id: req.params.division_id}},
	).then((rowsUpdated) => {
		res.json({
			rowsUpdated
		});
	}).catch((error) => {
		res.status(500);
    res.json({
      msg: "Error updating division " + req.params.division_id + ": " + error
    });
	});
}

module.exports.deleteDivision = (req, res) => {
	db.EventDivision.destroy({where: {
    id: req.params.division_id,
  }}).then(() => {
    res.json({
      msg: "Division " + req.params.division_id + " deleted."
    });
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error deleting division " + req.params.division_id + ": " + error
    });
  });
}

module.exports.getCategories = (req, res) => {
	db.EventCategory.findAll({where: {
		division_id: req.params.division_id
	}}).then((categories) => {
		res.json({
			categories: categories
		});
	}).catch((error) => {
		res.status(500);
		res.json({
			msg: "Error getting judging categories: " + error
		});
	});
}

var sort = function (prop, arr) {
	arr.sort(function (a, b) {
			if (a[prop] < b[prop]) {
					return -1;
			} else if (a[prop] > b[prop]) {
					return 1;
			} else {
					return 0;
			}
	});
};

module.exports.calculateResults = async (req, res) => {
	// Create results list
	var results = [];

	// Get categories
	var categories = await db.EventCategory.findAll({where: {
		event_division_id: req.params.division_id
	}});
	
	// Get teams
	var teams = await db.Team.findAll({where: {
		id: req.params.division_id
	}});
	
	// Loop over the teams
	for (team of teams) {
		var team_score = 0;
	
		// Get judges
		var judgeIDs = await db.JudgeTeamAssignment.findAll({where: {
			team_id: team.id
		}});

		// Loop over categories
		for (category of categories) {

			// Loop over judge ids
			for (judge of judgeIDs) {

				// Get the score for this team, for this judge, for this category
				var score = await db.JudgeResponse.findOne({
					where: {
						team_id: team.id,
						judge_user_id: judge,
						category_id: category.id
					}
				});

				// Weight the score and add to team score
				score *= category.weight;
				team_score += score;

			}

		}

		// Create team result object
		var team_result = {
			team_id: team.id,
			score: team_score,
			rank: -1
		};

		// Add team result to results
		results.push(team_result);
	
	}

	// Sort results by score
	sort('score', results);

	// Update rank based on sorted position
	var rank = 1;
	for (result of results) {
		result.rank = rank;
		rank++;
	}

	// Send response with results
	res.json({
		results: results
	});
}
