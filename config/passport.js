const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const config = require('../config');

module.exports = function (passport) {
    //Passport Session Setup
    passport.serializeUser(function (user, done) {
       done(null, user.id); 
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    // Facebook Setup
    let facebookConfig = config.facebookAuth;
    facebookConfig.passReqToCallback = true;
    passport.use(new FacebookStrategy(facebookConfig,
        function (req, token, refreshToken, profile, done) {
            process.nextTick(function () {
                if (!req.user) {
                    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            if (!user.facebook.token) {
                                user.facebook.token = token;
                                user.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
                                user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                                user.save(function (err) {
                                    if (err) {
                                        return done(err);
                                    }
                                    return done(null, user);
                                });
                            }
                            return done(null, user);
                        } else {
                            let newUser = new User();
                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
                            newUser.email = (profile.emails[0].value || '').toLowerCase();
                            newUser.save(function (err) {
                                if (err) {
                                    return done(err);
                                }
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    let user = req.user;
                    user.facebook.id = profile.id;
                    user.facebook.token = token;
                    user.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
                    user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                    user.save(function (err) {
                        if (err) {
                            return done(err);
                        }
                        return done(null, user);
                    });
                }
            });
        }
    ));
};