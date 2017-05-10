const TransactionCategory = require('../models/transactionCategory');

exports.create = function (req, res) {
    const transactionCategory = new TransactionCategory({
        description: req.body.description,
        type: req.body.type,
        color: req.body.color,
        userId: req.user._id
    });
    transactionCategory.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Category saved.' });
    });
};
exports.update = function (req, res) {
    const transactionCategory = new TransactionCategory({
        description: req.body.description,
        type: req.body.type,
        color: req.body.color,
    });
    transactionCategory.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Category updated.' });
    });
};
exports.delete = function (req, res) {
    TransactionCategory.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Category deleted.' });
    });
};
exports.getAll = function (req, res) {
    TransactionCategory.find(function (err, transactionCategories) {
        if (err) {
            res.send(err);
        }
        res.json(transactionCategories);
    });
};
exports.getById = function (req, res) {
    TransactionCategory.findById(req.params.id, function (err, transactionCategory) {
        if (err) {
            res.send(err);
        }
        res.json(transactionCategory);
    });
};