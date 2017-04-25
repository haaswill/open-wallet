const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    description: String,
    value: Number,
    type: String,
    date: { type: Date, default: Date.now },
    _walletId: { type: String, required: true },
    _transactionCategoryId: { type: String, required: true }
});

exports.module = mongoose.model('Transaction', transactionSchema);