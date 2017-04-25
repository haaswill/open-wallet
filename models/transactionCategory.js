const mongoose = require('mongoose');

const transactionCategorySchema = mongoose.Schema({
    description: String,
    type: String,
    color: String,
    _userId: { type: String, required: true }
});

exports.module = mongoose.model('TransactionCategory', transactionCategorySchema);