const authenticationMiddleware = require('../middlewares/authentication');
const authentication = require('./authentication');
const public = require('./public');
const api = require('./api');

module.exports = function (app, router, passport) {
    authentication(app, passport);
    public(app);
    const apiRouter = router;
    api(apiRouter);
    app.use('/api', authenticationMiddleware.isLoggedIn, apiRouter);
};