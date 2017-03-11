const authentication = require('./authentication');

module.exports = function (app, passport) {
    authentication(app, passport);
};