const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');

module.exports = function (router) {
    router.post('/', function (req, res) {
        Wallet.findOne({ id: req.body.walletId, userId: req.user._id }, function (err, wallet) {
            if (err) {
                res.send(err);
            }
            if (!wallet) {
                res.json({ message: 'Wallet not found for your user Id' })
            }
            const transaction = new Transaction({
                description: req.body.description,
                value: req.body.value,
                type: req.body.type,
                walletId: req.body.walletId,
                transactionCategoryId: req.body.transactionCategoryId
            });
        });
    });
}