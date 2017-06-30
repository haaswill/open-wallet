'use strict';

const User = require('./model');
const Wallet = require('../Wallet/model');

exports.createOrUpdateWithFacebook = async (req, res) => {
  let accountBalance = 0;
  const { token } = req.body;
  const { data: { email, first_name, last_name } } = await User.getFacebookUserAsync(token);
  const newUser = {
    email,
    name: {
      first: first_name,
      last: last_name
    },
    token: User.generateJwt(token)
  };
  const user = await User.createOrUpdateAsync(newUser);
  const wallets = await Wallet.findByUserAsync(user._id);
  if (wallets.length) {
    accountBalance = await Wallet.getAccountBalanceByUserAsync(user._id);
  }
  res.json({ user, wallets, accountBalance });
};

exports.createOrUpdateWithGoogle = async (req, res) => {
  let accountBalance = 0;
  const { token } = req.body;
  const { data: { email, given_name, family_name } } = await User.getGoogleUserAsync(token);
  const newUser = {
    email,
    name: {
      first: given_name,
      last: family_name
    },
    token: User.generateJwt(token)
  };
  const user = await User.createOrUpdateAsync(newUser);
  const wallets = await Wallet.findByUserAsync(user._id);
  if (wallets.length) {
    accountBalance = await Wallet.getAccountBalanceByUserAsync(user._id);
  }
  res.json({ user, wallets, accountBalance });
};

exports.createOrUpdate = async (req, res) => {
  let accountBalance = 0;
  const { email, password } = req.body;
  const token = User.generateJwt(email);
  const user = await User.createOrUpdateAsync(req.body);
  const wallets = await Wallet.findByUserAsync(user._id);
  if (wallets.length > 0) {
    accountBalance = await Wallet.getAccountBalanceByUserAsync(user._id);
  }
  res.json({ user, wallets, accountBalance });
};
