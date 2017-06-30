const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../components/User/model');

passport.use(new BasicStrategy(async (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.verifyPassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
}));

passport.use(new BearerStrategy((token, done) => {
  User.findOne({ token }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user, { scope: 'all' });
  });
}));

exports.isAuthenticated = passport.authenticate(['bearer'], { session: false });
exports.isAuthenticatedBasic = passport.authenticate(['basic'], { session: false });
