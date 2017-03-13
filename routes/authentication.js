const authenticationMiddleware = require('../middlewares/authentication');

module.exports = function (app, passport) {
    app.get('/profile', authenticationMiddleware.isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
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