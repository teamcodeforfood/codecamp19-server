
module.exports.listUsers = (req, res) => {
  return res.json(['billy', 'bob', 'joe']);
}

module.exports.createUser = (req, res) => {
  return res.json('create user');
}
