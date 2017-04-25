const Wallet = require('../models/wallet');

module.exports = function (router) {
    router.post('/', function (req, res) {
        const wallet = new Wallet({
            description: req.body.description,
            value: req.body.value,
            color: req.body.color,
            _userId: req.user._id
        });
        wallet.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Wallet saved' });
        });
    });
    router.put('/', function (req, res) {
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
    });
    router.delete('/:id', function (req, res) {
        Wallet.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Wallet deleted' });
        });
    });
    router.get('/', function (req, res) {
        Wallet.find(function (err, wallets) {
            if (err) {
                res.send(err);
            }
            res.json(wallets);
        });
    });
    router.get('/:id', function (req, res) {
        Wallet.findById(req.params.id, function (err, wallet) {
            if (err) {
                res.send(err);
            }
            res.json(wallet);
        });
    });
};