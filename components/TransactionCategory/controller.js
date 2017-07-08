'use strict';

const TransactionCategory = require('./model');

exports.create = async (req, res) => {
  req.body.user = req.user._id;
  const transactionCategory = await TransactionCategory.createAsync(req.body);
  res.json(transactionCategory);
};

exports.update = async (req, res) => {
  req.body._id = req.params.id;
  req.body.user = req.user._id;
  const transactionCategory = await TransactionCategory.updateAsync(req.body);
  res.json(transactionCategory);
};

exports.getById = async (req, res) => {
  const transactionCategories = await TransactionCategory.findByIdAndUserAsync(req.params.id, req.user._id);
  res.json(transactionCategories);
};

exports.getByUser = async (req, res) => {
  const transactionCategories = await TransactionCategory.findByUserAsync(req.user._id);
  res.json(transactionCategories);
};

exports.delete = async (req, res) => {
  await TransactionCategory.findByIdAndUserAndRemoveAsync(req.params.id, req.user._id);
  res.json({ message: 'Transaction category deleted.' });
};
