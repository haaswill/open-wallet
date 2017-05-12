const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');

exports.create = async (req, res) => {
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
exports.getByUserId = async (req, res) => {
    const wallets = await Wallet.find({ userId: req.params.userId });
    res.json(wallets);
};
exports.getById = async (req, res) => {
    const wallet = await Wallet.findById(req.params.id);
    res.json(wallet);
};
exports.income = async (req, res) => {
    const wallet = await Wallet.findOne({ _id: req.body.walletId, userId: req.user._id });
    if (!wallet) {
        return res.json({ message: 'Wallet not found for your user Id.' })
    }
    await (new Transaction(req.body)).save();
    wallet.value += transaction.value;
    await wallet.save();
    res.json({ message: 'Transaction saved.' });
};
exports.expense = async (req, res) => {
    const wallet = await Wallet.findOne({ _id: req.body.walletId, userId: req.user._id });
    if (!wallet) {
        return res.json({ message: 'Wallet not found for your user Id.' })
    }
    await (new Transaction(req.body)).save();
    wallet.value -= transaction.value;
    await wallet.save();
    res.json({ message: 'Transaction saved.' });
};