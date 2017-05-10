const mongoose = require('mongoose');

const transactionCategorySchema = mongoose.Schema({
    description: { type: String, required: 'Description must be informed' },
    type: { type: String, required: 'Type must be informed' },
    color: { type: String, required: 'Color must be informed.' },
    userId: { type: String, required: 'User id must be informed.' }
});

module.exports = mongoose.model('TransactionCategory', transactionCategorySchema);