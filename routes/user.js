const User = require('../models/user');

module.exports = function (router) {
    router.post('/', function (req, res) {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            name: {
                first: req.firstName,
                last: req.lastName
            }
        });
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User saved' });
        });
    });
    router.get('/', function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });
};