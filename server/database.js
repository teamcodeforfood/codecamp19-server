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

module.exports.User = sequelize.define('user', {
  email:{
    type: Sequelize.TEXT,
    validate: {
      isEmail: true,
    },
    allowNull: false,
  },
  password:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  bio:{
    type: Sequelize.TEXT,
  }
})

sequelize.sync();