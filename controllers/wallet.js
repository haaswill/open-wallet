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
    req.body.user = req.user._id;
    await (new Transaction(req.body)).save();
    await Wallet.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { value: value + req.body.value }, {
        new: true,
        runValidators: true
    }).exec();
    res.json({ message: 'Transaction saved.' });
};
exports.expense = async (req, res) => {
    req.body.user = req.user._id;
    await (new Transaction(req.body)).save();
    await Wallet.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { value: value + req.body.value }, {
        new: true,
        runValidators: true
    }).exec();
    res.json({ message: 'Transaction saved.' });
};