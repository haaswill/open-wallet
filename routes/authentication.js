const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');

passport.use(new BasicStrategy(async (email, password, callback) => {
  const user = await User.findOne({ email: email });
  // No user found with that email
  if (!user) {
    return callback(null, false);
  }
  // Make sure the password is correct
  user.verifyPassword(password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    // Password did not match
    if (!isMatch) {
      return callback(null, false);
    }
    // Success
    return callback(null, user);
  });
}));

exports.isAuthenticated = passport.authenticate(['basic'], { session: false });
