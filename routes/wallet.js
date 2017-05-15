const wallet = require('../controllers/wallet');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = function (router) {
    router.post('/', catchErrors(wallet.create));
    router.post('/:id/income', catchErrors(wallet.income));
    router.post('/:id/expense', catchErrors(wallet.expense));
    router.put('/', catchErrors(wallet.update));
    router.delete('/:id', catchErrors(wallet.delete));
    router.get('/', catchErrors(wallet.getByUser));
    router.get('/:id', catchErrors(wallet.getById));
};