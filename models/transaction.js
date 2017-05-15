const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    description: { type: String, trim: true, maxlength: 50, required: 'description is required.' },
    value: { type: Number, min: 0, required: 'value is required.', default: 0.00 },
    type: { type: String, enum: ['Income', 'Expense', 'Transfer'], required: 'type is required.' },
    date: { type: Date, required: 'date is required.', default: Date.now },
    targetWallet: { type: mongoose.Schema.ObjectId, ref: 'Wallet', required: 'wallet is required' },
    originWallet: { type: mongoose.Schema.ObjectId, ref: 'Wallet', required: 'wallet is required' },
    transactionCategory: { type: mongoose.Schema.ObjectId, ref: 'TransactionCategory', required: 'transactionCategory is required' },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'user is required' }
});

function autopopulate(next) {
    this.populate('wallet');
    this.populate('transactionCategory');
    this.populate('user');
    next();
}

TransactionSchema.pre('find', autopopulate);
TransactionSchema.pre('findOne', autopopulate);
TransactionSchema.pre('findById', autopopulate);

module.exports = mongoose.model('Transaction', TransactionSchema);