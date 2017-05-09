const wallet = require('../controllers/wallet');

module.exports = function (router) {
    router.post('/', wallet.create);
    router.put('/', wallet.update);
    router.delete('/:id', wallet.delete);
    router.get('/', wallet.getAll);
    router.get('/:id', wallet.getById);
};