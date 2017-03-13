const User = require('../models/user');

module.exports = function (router) {
    router.get('/wallet/:id', function (req, res, next) {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                throw err;
            }
            res.json(user);
        });
    });
};