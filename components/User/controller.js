'use strict';

const User = require('./model');
const Wallet = require('../Wallet/model');

exports.createOrUpdateWithFacebook = async (req, res) => {
  let accountBalance = 0;
  const userData = await User.getFacebookUserAsync(req.body.token);
  const user = await User.createOrUpdateAsync(userData);
  const wallets = await Wallet.findByUserAsync(user._id);
  if (wallets.length) {
    accountBalance = await Wallet.getAccountBalanceByUserAsync(user._id);
  }
  res.json({ user, wallets, accountBalance });
};

exports.createOrUpdateWithGoogle = async (req, res) => {
  let accountBalance = 0;
  const userData = await User.getGoogleUserAsync(req.body.token);
  const user = await User.createOrUpdateAsync(userData);
  const wallets = await Wallet.findByUserAsync(user._id);
  if (wallets.length) {
    accountBalance = await Wallet.getAccountBalanceByUserAsync(user._id);
  }
  res.json({ user, wallets, accountBalance });
};

exports.getUserAccountBalance = async (req, res) => {
  let accountBalance = 0;
  const user = await User.findOneByEmailAsync(req.body.email);
  const wallets = await Wallet.findByUserAsync(user._id);
  if (wallets.length) {
    accountBalance = await Wallet.getAccountBalanceByUserAsync(user._id);
  }
  res.json({ user, wallets, accountBalance });
};

exports.signUp = async (req, res) => {
  res.json('Signed Up');
};
