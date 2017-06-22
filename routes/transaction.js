const transaction = require('../components/Transaction');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = function (router) {
  router.delete('/:id', catchErrors(transaction.delete));
  router.get('/', catchErrors(transaction.getByUser));
  router.get('/:id', catchErrors(transaction.getById));
};
