const User = require('../models/user');

exports.create = async (req, res) => {
    await (new User(req.body)).save();
    res.json({ message: 'User saved.' });
};