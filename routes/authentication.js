const authenticationMiddleware = require('../middlewares/authentication');

module.exports = function (app, passport) {
    // Profile
    app.get('/profile', authenticationMiddleware.isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });
    // Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    // Local
    // Authentication
    // Login
    app.get('/login', function (req, res) {
        res.render('login.ejs');
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));
    // Signup
    app.get('/signup', function (req, res) {
        res.render('signup.ejs');
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
    }));
    //Authorization
    app.get('/connect/local', function (req, res) {
        res.render('connect-local.ejs');
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/connect/local'
    }));
    // Unlink
    app.get('/unlink/local', authenticationMiddleware.isLoggedIn, function (req, res) {
        let user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function (err) {
            if (err) {
                throw err;
            }
            res.redirect('/profile');
        });
    });
    // Facebook
    // Authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    // Authorization
    app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));
    app.get('/connect/facebook/callback', passport.authorize('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    // Unlink
    app.get('/unlink/facebook', authenticationMiddleware.isLoggedIn, function (req, res) {
        let user = req.user;
        user.facebook.token = undefined;
        user.save(function (err) {
            if (err) {
                throw err;
            }
            res.redirect('/profile');
        });
    });
};