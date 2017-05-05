const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    description: String,
    value: Number,
    type: String,
    date: { type: Date, default: Date.now },
    walletId: { type: String, required: true },
    transactionCategoryId: { type: String, required: true }
});

exports.module = mongoose.model('Transaction', transactionSchema);