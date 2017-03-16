const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
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
    // JWT Login
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.jwtSecret
    }, function (jwtPayload, done) {
        User.findOne({ id: jwtPayload.sub }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
    
    // Local Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        if (email) {
            email = email.toLowerCase();
        }
        process.nextTick(function () {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.json('No user found.'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.json('Wrong password'));
                }
                return done(null, user);
            });
        });
    }));
    // Local Signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        if (email) {
            email = email.toLowerCase();
        }
        process.nextTick(function () {
            if (!req.user) {
                User.findOne({ 'local.email': email }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, req.json('That email is already taken.'));
                    } else {
                        let newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function (err) {
                            if (err) {
                                return done(err);
                            }
                            return done(null, newUser);
                        });
                    }
                });
            } else if (!req.user.local.email) {
                User.findOne({ 'local.email': email }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, req.json('That email is already taken.'));
                    } else {
                        let user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function (err) {
                            if (err) {
                                return done(err);
                            }
                            return done(null, user);
                        });
                    }
                });
            } else {
                return done(null, req.user);
            }
        });
    }));
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
                                user.facebook.name = {
                                    first: profile.name.givenName,
                                    last: profile.name.familyName
                                };
                                user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                                user.local.name = user.local.name ?
                                    {
                                        first: profile.name.givenName,
                                        last: profile.name.familyName
                                    } : user.local.name;
                                user.local.email = user.local.email ? (profile.emails[0].value || '').toLowerCase() : user.local.email;
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
                            newUser.facebook.name = {
                                first: profile.name.givenName,
                                last: profile.name.familyName
                            };
                            newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                            newUser.local.name = {
                                first: profile.name.givenName,
                                last: profile.name.familyName
                            };
                            newUser.local.email = (profile.emails[0].value || '').toLowerCase();
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
                    user.facebook.name = {
                        first: profile.name.givenName,
                        last: profile.name.familyName
                    };
                    user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                    user.local.name = user.local.name ?
                        {
                            first: profile.name.givenName,
                            last: profile.name.familyName
                        } : user.local.name;
                    user.local.email = user.local.email ? (profile.emails[0].value || '').toLowerCase() : user.local.email;
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