let db = require('../../database.js');


module.exports.listUsers = (req, res) => {
  // db.User.create({
  //   email: "foorcom",
  //   password: "pass",
  //   bio: "test user"
  // }).then((user) => {
  //   console.log(user);
  // }).catch((err) => {
  //   console.log(err)
  // })
  return res.json(['billy', 'bob', 'joe']);
}

module.exports.createUser = (req, res) => {
  return res.json('create user');
}
