'use strict';

const transaction = require('./controller');
const { catchErrors } = require('../../handlers/errorHandlers');
const { handleLimit } = require('../../middlewares');

module.exports = function (router) {
  router.get('/', handleLimit, catchErrors(transaction.getByUser));
  router.get('/expenses', handleLimit, catchErrors(transaction.getExpenses));
  router.get('/incomes', handleLimit, catchErrors(transaction.getIncomes));
  router.get('/transfers', handleLimit, catchErrors(transaction.getTransfers));
  router.get('/transactionCategory/:id', catchErrors(transaction.getByTransactionCategory));
  router.get('/wallet/:id/expenses', handleLimit, catchErrors(transaction.getExpensesByWallet));
  router.get('/wallet/:id/incomes', handleLimit, catchErrors(transaction.getIncomesByWallet));
  router.get('/wallet/:id/transfers', handleLimit, catchErrors(transaction.getTransfersByWallet));
  router.get('/wallet/:id', handleLimit, catchErrors(transaction.getByWallet));
  router.get('/:id', catchErrors(transaction.getById));
  router.put('/:id', catchErrors(transaction.update));
  router.delete('/:id', catchErrors(transaction.delete));
};
