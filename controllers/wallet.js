const Wallet = require('../models/wallet');
const transaction = require('./transaction');

exports.create = async (req, res) => {
  req.body.user = req.user._id;
  const wallet = await Wallet.createAsync(req.body);
  res.json(wallet);
};

exports.update = async (req, res) => {
  const wallet = await Wallet.findByIdAndUpdateAsync(req.params.id, req.body);
  res.json(wallet);
};

exports.delete = async (req, res) => {
  await Wallet.findByIdAndRemove(req.params.id);
  res.json({ message: 'Wallet deleted.' });
};

exports.getByUser = async (req, res) => {
  const wallets = await Wallet.findOneByUserAsync(req.user._id);
  res.json(wallets);
};

exports.getById = async (req, res) => {
  const wallet = await Wallet.findById(req.params.id);
  res.json(wallet);
};

exports.income = async (req, res) => {
  req.body.type = 'Income';
  req.body.user = req.user._id;
  const transactionPromise = transaction.createAsync(req.body);
  const walletPromise = Wallet.findOneByIdAndUserAsync(req.body.targetWallet, req.user._id);
  const [transaction, wallet] = await Promise.all([transactionPromise, walletPromise]);
  wallet.value += Number.parseFloat(req.body.value);
  await wallet.save();
  res.json(transaction);
};

exports.expense = async (req, res) => {
  req.body.type = 'Expense';
  req.body.user = req.user._id;
  const transactionPromise = transaction.createAsync(req.body);
  const walletPromise = Wallet.findOneByIdAndUserAsync(req.body.targetWallet, req.user._id);
  const [transaction, wallet] = await Promise.all([transactionPromise, walletPromise]);
  wallet.value -= Number.parseFloat(req.body.value);
  await wallet.save();
  res.json(transaction);
};

exports.transfer = async (req, res) => {
  req.body.type = 'Transfer';
  req.body.user = req.user._id;
  await transaction.createAsync(req.body);
  const targetWalletPromise = Wallet.findOneByIdAndUserAsync(req.body.targetWallet, req.user._id);
  const originWalletPromise = Wallet.findOneByIdAndUserAsync(req.body.originWallet, req.user._id);
  const [targetWallet, originWallet] = await Promise.all([targetWalletPromise, originWalletPromise]);
  targetWallet.value += Number.parseFloat(req.body.value);
  originWallet.value -= Number.parseFloat(req.body.value);
  await Promise.all([targetWallet.save(), originWallet.save()]);
  res.json({ message: 'Transaction saved.' });
};
