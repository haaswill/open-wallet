const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    description: { type: String, required: 'Description must be informed.' },
    value: { type: Number, required: 'Value must be informed.' },
    type: { type: String, required: 'Type must be informed.', default: 0.00 },
    date: { type: Date, required: 'Date must be informed.', default: Date.now },
    walletId: { type: String, required: 'Wallet id must be informed.' },
    transactionCategoryId: { type: String, required: 'Transaction Category id must be informed.' },
    userId: { type: String, required: 'User id must be informed.' }
});

module.exports = mongoose.model('Transaction', transactionSchema);