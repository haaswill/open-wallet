'use strict';

const Wallet = require('./model');
const Transaction = require('../Transaction/model');

exports.create = async (req, res) => {
  req.body.user = req.user._id;
  const wallet = await Wallet.createAsync(req.body);
  res.json(wallet);
};

exports.update = async (req, res) => {
  req.body._id = req.params.id;
  req.body.user = req.user._id;
  const wallet = await Wallet.updateAsync(req.body);
  res.json(wallet);
};

exports.delete = async (req, res) => {
  await Wallet.findByIdAndUserAndRemoveAsync(req.params.id, req.user._id);
  res.json({ message: 'Wallet deleted.' });
};

exports.getByUser = async (req, res) => {
  const wallets = await Wallet.findByUserAsync(req.user._id);
  res.json(wallets);
};

exports.getById = async (req, res) => {
  const wallet = await Wallet.findById(req.params.id);
  res.json(wallet);
};

exports.getAccountBalance = async (req, res) => {
  const walletsPromise = Wallet.findByUserAsync(req.user._id);
  const accountBalancePromise = Wallet.getAccountBalanceByUserAsync(req.user._id);
  const [wallets, accountBalance] = await Promise.all([walletsPromise, accountBalancePromise]);
  console.log('wallets: ', wallets, 'account balance: ', accountBalance);
  res.json({ wallets, accountBalance: accountBalance[0].value || 0 });
};

exports.income = async (req, res) => {
  //validate if type is the same as transaction category type
  req.body.type = 'Income';
  req.body.user = req.user._id;
  req.body.date = Date.now();
  req.body.targetWallet = req.params.id;
  const transactionPromise = Transaction.createAsync(req.body);
  const walletPromise = Wallet.findByIdAndUserAsync(req.body.targetWallet, req.body.user);
  const [transaction, wallet] = await Promise.all([transactionPromise, walletPromise]);
  wallet.value += Number.parseFloat(req.body.value);
  await wallet.save();
  res.json(transaction);
};

exports.expense = async (req, res) => {
  //validate if type is the same as transaction category type
  req.body.type = 'Expense';
  req.body.user = req.user._id;
  req.body.date = Date.now();
  req.body.targetWallet = req.params.id;
  const transactionPromise = Transaction.createAsync(req.body);
  const walletPromise = Wallet.findByIdAndUserAsync(req.body.targetWallet, req.body.user);
  const [transaction, wallet] = await Promise.all([transactionPromise, walletPromise]);
  wallet.value -= Number.parseFloat(req.body.value);
  await wallet.save();
  res.json(transaction);
};

exports.transfer = async (req, res) => {
  req.body.type = 'Transfer';
  req.body.user = req.user._id;
  req.body.date = Date.now();
  req.body.targetWallet = req.params.id;
  req.body.description = 'Transfer';
  const transactionPromise = Transaction.createAsync(req.body);
  const targetWalletPromise = Wallet.findByIdAndUserAsync(req.body.targetWallet, req.body.user);
  const originWalletPromise = Wallet.findByIdAndUserAsync(req.body.originWallet, req.body.user);
  const [transaction, targetWallet, originWallet] = await Promise.all([transactionPromise, targetWalletPromise, originWalletPromise]);
  targetWallet.value += Number.parseFloat(req.body.value);
  originWallet.value -= Number.parseFloat(req.body.value);
  await Promise.all([targetWallet.save(), originWallet.save()]);
  res.json(transaction);
};
