const user = require('../controllers/user');

module.exports = function (router) {
    router.post('/', user.create);
    router.get('/', user.listUsers);
};