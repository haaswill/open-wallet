const User = require('../models/user');

exports.create = function (req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: {
            first: req.body.firstName,
            last: req.body.lastName
        }
    });
    user.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'User saved.' });
    });
};
exports.getAll = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};