const transaction = require('./controller');
const { catchErrors } = require('../../handlers/errorHandlers');

module.exports = function (router) {
  router.get('/', catchErrors(transaction.getByUser));
  router.get('/transactionCategory/:id', catchErrors(transaction.getByTransactionCategory));
  router.get('/wallet/:id', catchErrors(transaction.getByWallet));
  router.get('/:id', catchErrors(transaction.getById));
  router.put('/:id', catchErrors(transaction.update));
  router.delete('/:id', catchErrors(transaction.delete));
};
