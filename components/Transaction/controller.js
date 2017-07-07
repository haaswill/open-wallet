const Transaction = require('./model');

exports.update = async (req, res) => {
  req.body._id = req.params.id;
  req.body.user = req.user._id;
  const transaction = await Transaction.updateAsync(req.body);
  res.json(transaction);
};

exports.getById = async (req, res) => {
  const transaction = await Transaction.findByIdAndUserAsync(req.params.id, req.user._id);
  res.json(transaction);
};

exports.getByUser = async (req, res) => {
  const transactions = await Transaction.findByUserAsync(req.user._id);
  res.json(transactions);
};

exports.getByWallet = async (req, res) => {
  const transactions = await Transaction.findByTargetWalletAndUserAsync(req.params.id, req.user._id);
  res.json(transactions);
};

exports.getByTransactionCategory = async (req, res) => {
  const transactions = await Transaction.findByTransactionCategoryAndUserAsync(req.params.id, req.user._id);
  res.json(transactions);
};

exports.delete = async (req, res) => {
  await Transaction.findByIdAndUserAndRemoveAsync(req.params.id, req.user._id);
  res.json({ message: 'Transaction deleted.' });
};
