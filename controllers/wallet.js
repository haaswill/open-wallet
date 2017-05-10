const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');

exports.create = function (req, res) {
    const wallet = new Wallet({
        description: req.body.description,
        value: req.body.value,
        color: req.body.color,
        userId: req.user._id
    });
    wallet.save(function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json({ message: 'Wallet saved.' });
    });
};
exports.update = function (req, res) {
    const wallet = new Wallet({
        description: req.body.description,
        value: req.body.value,
        color: req.body.color,
    });
    wallet.save(function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json({ message: 'Wallet updated.' });
    });
};
exports.delete = function (req, res) {
    Wallet.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json({ message: 'Wallet deleted.' });
    });
};
exports.getAll = function (req, res) {
    Wallet.find(function (err, wallets) {
        if (err) {
            return res.send(err);
        }
        return res.json(wallets);
    });
};
exports.getById = function (req, res) {
    Wallet.findById(req.params.id, function (err, wallet) {
        if (err) {
            return res.send(err);
        }
        return res.json(wallet);
    });
};
exports.income = function (req, res) {
    Wallet.findOne({ _id: req.body.walletId, userId: req.user._id }, function (err, wallet) {
        if (err) {
            return res.send(err);
        }
        if (!wallet) {
            return res.json({ message: 'Wallet not found for your user Id.' })
        }
        const transaction = new Transaction({
            description: req.body.description,
            value: req.body.value,
            type: 'Income',
            walletId: req.body.walletId,
            transactionCategoryId: req.body.transactionCategoryId,
            userId: req.user._id
        });
        transaction.save(function (err) {
            if (err) {
                return res.send(err);
            }
            wallet.value += transaction.value;
            wallet.save(function (err) {
                if (err) {
                    Transaction.findByIdAndRemove(transaction._id, function (err) {
                        if (err) {
                            return res.send(err);
                        }
                    });
                    return res.send(err);
                }
            });
            return res.json({ message: 'Transaction saved.' });
        });
    });
};
exports.expense = function (req, res) {
    Wallet.findOne({ _id: req.body.walletId, userId: req.user._id }, function (err, wallet) {
        if (err) {
            res.send(err);
        }
        if (!wallet) {
            res.json({ message: 'Wallet not found for your user Id.' })
        }
        const transaction = new Transaction({
            description: req.body.description,
            value: req.body.value,
            type: 'Expense',
            walletId: req.body.walletId,
            transactionCategoryId: req.body.transactionCategoryId,
            userId: req.user._id
        });
        transaction.save(function (err) {
            if (err) {
                res.send(err);
            }
            wallet.value -= transaction.value;
            wallet.save(function (err) {
                if (err) {
                    Transaction.findByIdAndRemove(transaction._id, function (err) {
                        if (err) {
                            res.send(err);
                        }
                    });
                    res.send(err);
                }
            });
            res.json({ message: 'Transaction saved.' });
        });
    });
};