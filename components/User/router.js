'use strict';

const user = require('./controller');
const { catchErrors } = require('../../handlers/errorHandlers');
const authentication = require('../../config/passport');

module.exports = function (router) {
  router.post('/facebook', catchErrors(user.createOrUpdateWithFacebook));
  router.post('/google', catchErrors(user.createOrUpdateWithGoogle));
  router.post('/signup', catchErrors(user.signUp));
  router.post('/signin', authentication.isAuthenticatedBasic, catchErrors(user.getUser));
};
