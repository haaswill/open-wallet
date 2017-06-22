const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../components/User');

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
