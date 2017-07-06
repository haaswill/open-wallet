'use strict';

const { mongoose } = require('../../config/database');

const TransactionSchema = new mongoose.Schema({
  description: { type: String, trim: true, maxlength: 50, required: 'description is required.' },
  value: { type: Number, min: 0, required: 'value is required.', default: 0.00 },
  type: { type: String, enum: ['Income', 'Expense', 'Transfer'], required: 'type is required.' },
  date: { type: Date, required: 'date is required.', default: Date.now },
  targetWallet: { type: mongoose.Schema.ObjectId, ref: 'Wallet', required: 'wallet is required' },
  originWallet: { type: mongoose.Schema.ObjectId, ref: 'Wallet' },
  transactionCategory: { type: mongoose.Schema.ObjectId, ref: 'TransactionCategory' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'user is required' }
});

TransactionSchema.statics.createAsync = async function (transaction) {
  return (new this(transaction)).save();
};

TransactionSchema.statics.findByUser = async function (user) {
  return this.find({ user });
};

TransactionSchema.statics.findByWallet = async function (wallet) {
  return this.find({ wallet });
};

TransactionSchema.statics.findByTransactionCategory = async function (transactionCategory) {
  return this.find({ transactionCategory });
};

module.exports = mongoose.model('Transaction', TransactionSchema);
