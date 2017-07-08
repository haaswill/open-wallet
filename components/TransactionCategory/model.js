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

TransactionCategorySchema.statics.updateAsync = async function (transactionCategory) {
  return this.findOneAndUpdate({ _id: transactionCategory._id, user: transactionCategory.user }, transactionCategory, { runValidators: true, new: true });
};

TransactionCategorySchema.statics.findByIdAndUserAsync = async function (_id, user) {
  return this.findOne({ _id, user });
};

TransactionCategorySchema.statics.findByUserAsync = async function (user) {
  return this.find({ user });
};

TransactionCategorySchema.statics.findByIdAndUserAndRemoveAsync = async function (_id, user) {
  return this.findOneAndRemove({ _id, user });
};

module.exports = mongoose.model('TransactionCategory', TransactionCategorySchema);
