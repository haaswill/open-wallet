'use strict';

const { mongoose } = require('../../config/database');

const TransactionCategorySchema = new mongoose.Schema({
  description: { type: String, trim: true, maxlength: 50, required: 'description must be informed' },
  type: { type: String, enum: ['Income', 'Expense'], required: 'type must be informed' },
  color: { type: String, trim: true, minlength: 4, maxlength: 7, required: 'color must be informed.' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'user is required' }
});

TransactionCategorySchema.statics.createAsync = async function (transactionCategory) {
  return (new this(transactionCategory)).save();
};

TransactionCategorySchema.statics.findByIdAndUpdateAsync = async function (id, transactionCategory) {
  return this.findByIdAndUpdate(id, transactionCategory, {
    new: true,
    runValidators: true
  }).exec();
};

TransactionCategorySchema.statics.findByUser = async function (user) {
  return this.find({ user });
};

module.exports = mongoose.model('TransactionCategory', TransactionCategorySchema);
