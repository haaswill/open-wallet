const client = require('../controllers/client');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = function (router) {
    router.post('/', catchErrors(client.create));
    router.get('/', catchErrors(client.getAll));
};