const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');
const Client = require('../models/client');
const Token = require('../models/token');

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

passport.use('client-basic', new BasicStrategy(async (id, secret, callback) => {
    const client = await Client.findOne({ id: id });
    // No client found with that id
    if (!client) {
        return callback(null, false);
    }
    // Make sure the secret is correct
    client.verifySecret(secret, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        // Secret did not match
        if (!isMatch) {
            return callback(null, false);
        }
        // Success
        return callback(null, client);
    });
}));

passport.use(new BearerStrategy(async (accessToken, callback) => {
    const token = await Token.findOne({ value: accessToken });
    // No token found
    if (!token) {
        return callback(null, false);
    }
    const user = User.findOne({ _id: token.user });
    // No user found
    if (!user) {
        return callback(null, false);
    }
    // Simple example with no scope
    return callback(null, user, { scope: '*' });
}));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });