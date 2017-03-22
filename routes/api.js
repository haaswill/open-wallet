const User = require('../models/user');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const TransactionCategory = require('../models/transactionCategory');

module.exports = function (router) {
    router.get('/wallet/:userId', function (req, res) {
        User.findOne({
            'userId.': req.params.userId
        }, function (err, wallet) {
            if (err) {
                throw err;
            }
            res.json(wallet);
        });
    });
    router.post('/wallet', function (req, res) {
        const wallet = new Wallet({
            description: req.body.description,
            value: req.body.value,
            color: req.body.color,
            _user: req.user._id
        });
        wallet.save(function (err) {
            if (err) {
                throw err;
            }
            res.send('Success');
        });
    });
    router.post('/transaction', function (req, res) {
        Wallet.findOne({
            '_id': req.body.id
        }, function (err, walllet) {
            if (err) {
                throw err;
            }   
        });
    });
};