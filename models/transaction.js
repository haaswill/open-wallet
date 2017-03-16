const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    description: String,
    value: Number,
    type: String,
    date: { type: Date, default: Date.now },
    _wallet: { type: Number, ref: 'wallet' },
    _transactionCategory: { type: Number, ref: 'transactionCategory' }
});

exports.module = mongoose.model('transaction', transactionSchema);