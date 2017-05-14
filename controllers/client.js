const Client = require('../models/client');

exports.create = async (req, res) => {
    req.body.user = req.user._id;
    await (new Client(req.body)).save();
    res.json({ message: 'Client added!' });
};