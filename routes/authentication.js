const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');
const Client = require('../models/client');
const Token = require('../models/token');

passport.use(new BasicStrategy(
    function (email, password, callback) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                return callback(err);
            }
            // No user found with that username
            if (!user) {
                return callback(null, false);
            }
            // Make sure the password is correct
            user.verifyPassword(password, function (err, isMatch) {
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
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    function (email, password, callback) {
        Client.findOne({ id: email }, function (err, client) {
            if (err) {
                return callback(err);
            }
            // No client found with that id or bad password
            if (!client || client.secret !== password) {
                return callback(null, false);
            }
            // Success
            return callback(null, client);
        });
    }
));

passport.use(new BearerStrategy(
    function (accessToken, callback) {
        Token.findOne({ value: accessToken }, function (err, token) {
            if (err) {
                return callback(err);
            }

            // No token found
            if (!token) {
                return callback(null, false);
            }

            User.findOne({ _id: token._userId }, function (err, user) {
                if (err) {
                    return callback(err);
                }

                // No user found
                if (!user) {
                    return callback(null, false);
                }

                // Simple example with no scope
                callback(null, user, { scope: '*' });
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });