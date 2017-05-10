const transactionCategory = require('../controllers/transactionCategory');

module.exports = function (router) {
    router.post('/', transactionCategory.create);
    router.put('/', transactionCategory.update);
    router.delete('/:id', transactionCategory.delete);
    router.get('/', transactionCategory.getAll);
    router.get('/:id', transactionCategory.getById);
};