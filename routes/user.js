const user = require('../components/User');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = function (router) {
  router.post('/facebook', catchErrors(user.createOrUpdateWithFacebook));
  router.post('/google', catchErrors(user.createOrUpdateWithGoogle));
};
