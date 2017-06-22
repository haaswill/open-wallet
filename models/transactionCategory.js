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

TransactionCategorySchema.methods.createAsync = async function (transactionCategory) {
  return (new this(transactionCategory)).save();
};

TransactionCategorySchema.methods.findByIdAndUpdateAsync = async function (id, transactionCategory) {
  return this.model('TransactionCategory').findByIdAndUpdate(id, transactionCategory, {
    new: true,
    runValidators: true
  }).exec();
};

TransactionCategorySchema.methods.findByUser = async function (user) {
  return this.model('TransactionCategory').find({ user });
};

module.exports = mongoose.model('TransactionCategory', TransactionCategorySchema);
