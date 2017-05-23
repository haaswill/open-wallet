const TransactionCategory = require('../models/transactionCategory');

exports.create = async (req, res) => {
  req.body.user = req.user._id;
  await (new TransactionCategory(req.body)).save();
  res.json({ message: 'Transaction category saved.' });
};
exports.update = async (req, res) => {
  await TransactionCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.json({ message: 'Transaction category updated.' });
};
exports.delete = async (req, res) => {
  await TransactionCategory.findByIdAndRemove(req.params.id);
  res.json({ message: 'Transaction category deleted.' });
};
exports.getByUser = async (req, res) => {
  const transactionCategories = await TransactionCategory.find({ user: req.user._id });
  res.json(transactionCategories);
};
exports.getById = async (req, res) => {
  const transactionCategories = await TransactionCategory.findById(req.params.id);
  res.json(transactionCategory);
};
