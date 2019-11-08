require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.DBPASS, {
  host: process.env.DBHOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
})

sequelize.authenticate().then(() => {
  console.log("connected to DB")
}).catch(err => {
  console.log("error connecting to DB: ", err)
})

const User = sequelize.define('user', {
  email: {
    type: Sequelize.TEXT,
    validate: {
      isEmail: true,
    },
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  bio: {
    allowNull: true,
    type: Sequelize.TEXT,
  },
})
module.exports.User = User;

const Event = sequelize.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  owner_user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
      allowNull: false,
    },
  },
  starts_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  ends_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  website_url: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  location: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  logo_url: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  max_team_size: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})
module.exports.Event = Event;

const EventDivision = sequelize.define('event_division', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  event_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'id',
    }
  }
})
module.exports.EventDivision = EventDivision;

const Team = sequelize.define('team', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  event_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Event,
      key: 'id',
    },
    allowNull: false,
  },
  join_code: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  code_url: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  design_url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  app_url: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  project_description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  event_division_id: {
    type: Sequelize.INTEGER,
    references: {
      model: EventDivision,
      key: 'id',
    },
    allowNull: true,
  },
})
module.exports.Team = Team;

const UserTeamAssignment = sequelize.define('user_team_assignment', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  team_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
    allowNull: false,
  },
})
module.exports.UserTeamAssignment = UserTeamAssignment;

sequelize.sync();