const Client = require('../models/client');

module.exports = function (router) {
    router.post('/', function (req, res) {
        Client.find({ name: req.body.name }, function (err, client) {
            if (err) {
                res.send(err);
            }
            if (client) {
                res.json({ message: 'Client have already been registered!' });
            }
        });
        const client = new Client({
            name: req.body.name,
            id: req.body.id,
            secret: req.body.secret,
            userId: req.user._id
        });
        client.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Client added!', data: client });
        });
    });
    router.get('/', function (req, res) {
        Client.find({ userId: req.user._id }, function (err, clients) {
            if (err) {
                res.send(err);
            }
            res.json(clients);
        });
    });
};