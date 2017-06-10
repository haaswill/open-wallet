const User = require('../models/user');

exports.create = async (req, res) => {
  const user = await (new User(req.body)).save();
  res.json(user);
};
