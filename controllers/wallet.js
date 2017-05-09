const Wallet = require('../models/wallet');

exports.create = function (req, res) {
    const wallet = new Wallet({
        description: req.body.description,
        value: req.body.value,
        color: req.body.color,
        userId: req.user._id
    });
    wallet.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Wallet saved' });
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
            res.send(err);
        }
        res.json({ message: 'Wallet updated' });
    });
};
exports.delete = function (req, res) {
    Wallet.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Wallet deleted' });
    });
};
exports.getAll = function (req, res) {
    Wallet.find(function (err, wallets) {
        if (err) {
            res.send(err);
        }
        res.json(wallets);
    });
};
exports.getById = function (req, res) {
    Wallet.findById(req.params.id, function (err, wallet) {
        if (err) {
            res.send(err);
        }
        res.json(wallet);
    });
};