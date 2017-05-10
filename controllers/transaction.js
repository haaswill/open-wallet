const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');

exports.delete = function (req, res) {
    Transaction.findById(req.params.id, function (err, transaction) {
        if (err) {
            return res.send(err);
        }
        Wallet.findById(transaction.walletId, function (err, wallet) {
            if (err) {
                return res.send(err);
            }
            wallet.value += - transaction.value;
            wallet.save(function (err) {
                if (err) {
                    return res.send(err);
                }
            })
        });
        transaction.remove(function (err) {
            if (err) {
                return res.send(err);
            }
            return res.json({ message: 'Transaction deleted.' });
        });
    });
};
exports.getAll = function (req, res) {
    Transaction.find(function (err, transactions) {
        if (err) {
            return res.send(err);
        }
        return res.json(transactions);
    });
};
exports.getById = function (req, res) {
    Transaction.findById(req.params.id, function (err, transaction) {
        if (err) {
            return res.send(err);
        }
        return res.json(transaction);
    });
};