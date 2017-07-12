'use strict';

const User = require('./model');

exports.createOrUpdateWithFacebook = async (req, res) => {
  const userData = await User.getFacebookUserAsync(req.body.token);
  const user = await User.createOrUpdateAsync(userData);
  res.json({ user });
};

exports.createOrUpdateWithGoogle = async (req, res) => {
  const userData = await User.getGoogleUserAsync(req.body.token);
  const user = await User.createOrUpdateAsync(userData);
  res.json({ user });
};

exports.getUser = async (req, res) => {
  const user = await User.findOneByEmailAsync(req.user.email);
  res.json({ user });
};

exports.signUp = async (req, res) => {
  res.json('Signed Up');
};
