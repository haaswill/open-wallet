const express = require('express');
const api = require('./api');
const oauth2 = require('./oauth2');
const authentication = require('./authentication');

const apiRouter = express.Router();
api(apiRouter);

module.exports = function (app) {
    app.use('/api', apiRouter);
    app.get('/oauth2/authorize', authentication.isAuthenticated, oauth2.authorization);
    app.post('/oauth2/authorize', authentication.isAuthenticated, oauth2.decision);
    app.post('/oauth2/token', authentication.isClientAuthenticated, oauth2.token);
    app.get('*', function (req, res) {
        res.render('index');
    });
};