const transaction = require('./controller');
const { catchErrors } = require('../../handlers/errorHandlers');

module.exports = function (router) {
  router.get('/', catchErrors(transaction.getByUser));
  router.get('/expenses', catchErrors(transaction.getExpenses));
  router.get('/incomes', catchErrors(transaction.getIncomes));
  router.get('/transfers', catchErrors(transaction.getTransfers));
  router.get('/transactionCategory/:id', catchErrors(transaction.getByTransactionCategory));
  router.get('/wallet/:id/expenses', catchErrors(transaction.getExpensesByWallet));
  router.get('/wallet/:id/incomes', catchErrors(transaction.getIncomesByWallet));
  router.get('/wallet/:id/transfers', catchErrors(transaction.getTransfersByWallet));
  router.get('/wallet/:id', catchErrors(transaction.getByWallet));
  router.get('/:id', catchErrors(transaction.getById));
  router.put('/:id', catchErrors(transaction.update));
  router.delete('/:id', catchErrors(transaction.delete));
};
