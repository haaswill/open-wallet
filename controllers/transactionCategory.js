const TransactionCategory = require('../models/transactionCategory');

exports.create = async (req, res) => {
  req.body.user = req.user._id;
  const transactionCategory = await TransactionCategory.createAsync(req.body);
  res.json(transactionCategory);
};
exports.update = async (req, res) => {
  const transactionCategory = await TransactionCategory.findByIdAndUpdateAsync(req.params.id, req.body);
  res.json(transactionCategory);
};
exports.delete = async (req, res) => {
  await TransactionCategory.findByIdAndRemove(req.params.id);
  res.json({ message: 'Transaction category deleted.' });
};
exports.getByUser = async (req, res) => {
  const transactionCategories = await TransactionCategory.findfindByUser(req.user._id);
  res.json(transactionCategories);
};
exports.getById = async (req, res) => {
  const transactionCategories = await TransactionCategory.findById(req.params.id);
  res.json(transactionCategories);
};
