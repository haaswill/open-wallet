const user = require('../controllers/user');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = function (router) {
    router.post('/', catchErrors(user.create));
    router.get('/', catchErrors(user.getAll));
};