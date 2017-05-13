const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');

exports.delete = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    const wallet = await Wallet.findById(transaction.walletId);
    wallet.value += - transaction.value;
    await wallet.save();
    await transaction.remove();
    res.json({ message: 'Transaction deleted.' });
};
exports.getByUser = async (req, res) => {
    const transactions = await Transaction.find({ user: req.user._id });
    res.json(transactions);
};
exports.getByWallet = async (req, res) => {
    const transactions = await Transaction.find({ wallet: req.params.walletId });
    res.json(transactions);
};
exports.getByTransactionCategory = async (req, res) => {
    const transactions = await Transaction.find({ transactionCategory: req.params.transactionCategoryId });
    res.json(transactions);
};
exports.getById = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    res.json(transaction);
};