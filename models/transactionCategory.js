const mongoose = require('mongoose');

const transactionCategorySchema = mongoose.Schema({
    description: String,
    type: String,
    color: String,
    _user: { type: Number, ref: 'transactionCategory' }
});

exports.module = mongoose.model('transactionCategory', transactionCategorySchema);