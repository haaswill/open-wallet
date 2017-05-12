const Client = require('../models/client');

exports.create = async (req, res) => {
    if (await Client.find({ name: req.body.name })) {
        return res.json({ message: 'Client have already been registered!' });
    }
    const client = await (new Client(req.body)).save();
    res.json({ message: 'Client added!', data: client });
};