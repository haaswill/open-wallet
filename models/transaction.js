const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    description: { type: String, required: true },
    value: { type: Number, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    walletId: { type: String, required: true },
    transactionCategoryId: { type: String, required: true },
    userId: { type: String, required: true }
});

exports.module = mongoose.model('Transaction', transactionSchema);