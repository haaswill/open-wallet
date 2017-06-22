const Transaction = require('./model');

exports.delete = async (req, res) => {
  await Transaction.findByIdAndRemove(req.params.id);
  res.json({ message: 'Transaction deleted.' });
};

exports.getByUser = async (req, res) => {
  const transactions = await Transaction.findByUser(req.user._id);
  res.json(transactions);
};

exports.getByWallet = async (req, res) => {
  const transactions = await Transaction.findByWallet(req.params.walletId);
  res.json(transactions);
};

exports.getByTransactionCategory = async (req, res) => {
  const transactions = await Transaction.findByTransactionCategory(req.params.transactionCategoryId);
  res.json(transactions);
};

exports.getById = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  res.json(transaction);
};

exports.createAsync = async transaction => await Transaction.createAsync(transaction);
