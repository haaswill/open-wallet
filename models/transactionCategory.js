const mongoose = require('mongoose');

const TransactionCategorySchema = new mongoose.Schema({
  description: { type: String, trim: true, maxlength: 50, required: 'description must be informed' },
  type: { type: String, enum: ['Income', 'Expense'], required: 'type must be informed' },
  color: { type: String, trim: true, minlength: 4, maxlength: 7, required: 'color must be informed.' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'user is required' }
});

function autopopulate(next) {
  this.populate('user');
  next();
}

TransactionCategorySchema.pre('find', autopopulate);
TransactionCategorySchema.pre('findById', autopopulate);

module.exports = mongoose.model('TransactionCategory', TransactionCategorySchema);
