require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.DBPASS, {
  host: process.env.DBHOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  logging: false,
});

sequelize.authenticate().then(() => {
  console.log("connected to DB")
}).catch(err => {
  console.log("error connecting to DB: ", err)
});

const User = sequelize.define('user', {
  email: {
    type: Sequelize.TEXT,
    validate: {
      isEmail: true,
    },
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
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
});
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
  entry_fee: {
    type: Sequelize.DOUBLE({
      decimals: 2,
    }),
    allowNull: false,
  }
});
module.exports.Event = Event;

const Role = sequelize.define('role', {
  level: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  event_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'id',
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
});
module.exports.Role = Role;

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
    },
  },
});
module.exports.EventDivision = EventDivision;

const EventCategory = sequelize.define('event_category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  scale_min: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  scale_max: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  event_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'id',
    },
  },
  event_division_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'id',
    },
  },
});
module.exports.EventCategory = EventCategory;

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
});
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
});
module.exports.UserTeamAssignment = UserTeamAssignment;

const Note = sequelize.define('note', {
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  team_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: 'id',
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});
module.exports.Note = Note;

const Announcement = sequelize.define('announcement', {
  event_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'id',
    },
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports.Announcement = Announcement;

const JudgeTeamAssignment = sequelize.define('judge_team_assignment', {
  team_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: 'id',
    },
  },
  judge_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});
module.exports.JudgeTeamAssignment = JudgeTeamAssignment;

const JudgeResponse = sequelize.define('judge_response', {
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  judge_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  event_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'id',
    },
  },
  team_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: 'id',
    },
  },
  event_category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: EventCategory,
      key: 'id',
    },
  },
});
module.exports.JudgeResponse = JudgeResponse;

sequelize.sync();