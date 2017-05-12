const transaction = require('../controllers/transaction');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = function (router) {
    router.delete('/:id', catchErrors(transaction.delete));
    router.get('/', catchErrors(transaction.getAll));
    router.get('/:id', catchErrors(transaction.getById));
};