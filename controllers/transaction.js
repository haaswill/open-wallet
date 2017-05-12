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
exports.getByUserId = async (req, res) => {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.json(transactions);
};
exports.getByWalletId = async (req, res) => {
    const transactions = await Transaction.find({ userId: req.params.walletId });
    res.json(transactions);
};
exports.getByTransactionCategoryId = async (req, res) => {
    const transactions = await Transaction.find({ userId: req.params.transactionCategoryId });
    res.json(transactions);
};
exports.getById = async (req, res) => {
    const transaction = await Transaction.findById();
    res.json(transaction);
};