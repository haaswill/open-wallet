const user = require('../controllers/user');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = function (router) {
  router.post('/facebook', catchErrors(user.createWithFacebook));
  router.post('/google', catchErrors(user.createWithGoogle));
};
