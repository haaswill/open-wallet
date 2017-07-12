'use strict';

const wallet = require('./controller');
const { catchErrors } = require('../../handlers/errorHandlers');

module.exports = function (router) {
  router.get('/', catchErrors(wallet.getByUser));
  router.get('/:id', catchErrors(wallet.getById));
  router.get('/accountbalance', catchErrors(wallet.getAccountBalance));
  router.post('/', catchErrors(wallet.create));
  router.post('/income/:id', catchErrors(wallet.income));
  router.post('/expense/:id', catchErrors(wallet.expense));
  router.post('/transfer/:id', catchErrors(wallet.transfer));
  router.put('/:id', catchErrors(wallet.update));
  router.delete('/:id', catchErrors(wallet.delete));
};
