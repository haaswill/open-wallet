const transactionCategory = require('./controller');
const { catchErrors } = require('../../handlers/errorHandlers');

module.exports = function (router) {
  router.get('/', catchErrors(transactionCategory.getByUser));
  router.get('/:id', catchErrors(transactionCategory.getById));
  router.post('/', catchErrors(transactionCategory.create));
  router.put('/:id', catchErrors(transactionCategory.update));
  router.delete('/:id', catchErrors(transactionCategory.delete));
};
