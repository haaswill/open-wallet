const transaction = require('../controllers/transaction');

module.exports = function (router) {
    router.delete('/:id', transaction.delete);
    router.get('/', transaction.getAll);
    router.get('/:id', transaction.getById);
};