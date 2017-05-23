const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');

exports.create = async (req, res) => {
  req.body.user = req.user._id;
  await (new Wallet(req.body)).save();
  res.json({ message: 'Wallet saved.' });
};
exports.update = async (req, res) => {
  await Wallet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.json({ message: 'Wallet updated.' });
};
exports.delete = async (req, res) => {
  await Wallet.findByIdAndRemove(req.params.id);
  res.json({ message: 'Wallet deleted.' });
};
exports.getByUser = async (req, res) => {
  const wallets = await Wallet.find({ user: req.user._id });
  res.json(wallets);
};
exports.getById = async (req, res) => {
  const wallet = await Wallet.findById(req.params.id);
  res.json(wallet);
};
exports.income = async (req, res) => {
  req.body.type = 'Income';
  req.body.user = req.user._id;
  const transactionPromise = (new Transaction(req.body)).save();
  const walletPromise = Wallet.findOne({ _id: req.body.targetWallet, user: req.user._id });
  const [transaction, store] = await Promise.all([transactionPromise, walletPromise]);
  wallet.value += Number.parseFloat(req.body.value);
  await wallet.save();
  res.json({ message: 'Transaction saved.' });
};
exports.expense = async (req, res) => {
  req.body.type = 'Expense';
  req.body.user = req.user._id;
  const transactionPromise = (new Transaction(req.body)).save();
  const walletPromise = Wallet.findOne({ _id: req.body.targetWallet, user: req.user._id });
  const [transaction, store] = await Promise.all([transactionPromise, walletPromise]);
  wallet.value -= Number.parseFloat(req.body.value);
  await wallet.save();
  res.json({ message: 'Transaction saved.' });
};
exports.transfer = async (req, res) => {
  req.body.type = 'Transfer';
  req.body.user = req.user._id;
  await (new Transaction(req.body)).save();
  const targetWalletPromise = Wallet.findOne({ _id: req.body.targetWallet, user: req.user._id });
  const originWalletPromise = Wallet.findOne({ _id: req.body.originWallet, user: req.user._id });
  const [targetWallet, originWallet] = await Promise.all([targetWalletPromise, originWalletPromise]);
  targetWallet.value += Number.parseFloat(req.body.value);
  originWallet.value -= Number.parseFloat(req.body.value);
  await Promise.all([targetWallet.save(), originWallet.save()]);
  res.json({ message: 'Transaction saved.' });
};
