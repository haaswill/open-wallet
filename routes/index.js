const authentication = require('./authentication');
const user = require('./user');
const public = require('./public');
const client = require('./client');
const api = require('./api');

module.exports = function (app, router, passport) {
    const apiRouter = router;    
    const clientRouter = router;
    public(app);
    client(clientRouter);
    user(apiRouter);
    api(apiRouter);
    app.use('/clients', authentication.isAuthenticated, apiRouter);
    app.use('/api', authentication.isAuthenticated, apiRouter);
};