const user = require('./controller');
const { catchErrors } = require('../../handlers/errorHandlers');

module.exports = function (router) {
  router.post('/facebook', catchErrors(user.createOrUpdateWithFacebook));
  router.post('/google', catchErrors(user.createOrUpdateWithGoogle));
  router.post('/local', catchErrors(user.createOrUpdate));
};
