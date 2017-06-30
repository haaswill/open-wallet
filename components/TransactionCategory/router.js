const transactionCategory = require('./controller');
const { catchErrors } = require('../../handlers/errorHandlers');

module.exports = function (router) {
  router.post('/', catchErrors(transactionCategory.create));
  router.put('/', catchErrors(transactionCategory.update));
  router.delete('/:id', catchErrors(transactionCategory.delete));
  router.get('/', catchErrors(transactionCategory.getByUser));
  router.get('/:id', catchErrors(transactionCategory.getById));
};