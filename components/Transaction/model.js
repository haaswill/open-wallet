'use strict';

const { mongoose } = require('../../config/database');

const queryDefault = {
  date: {
    $gte: new Date().getDate() - 7
  }
}

const TransactionSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    maxlength: 50,
    required: 'description is required.'
  },
  value: {
    type: Number,
    min: 0,
    required: 'value is required.',
    default: 0.00
  },
  type: {
    type: String,
    enum: ['Income', 'Expense', 'Transfer'],
    required: 'type is required.'
  },
  date: {
    type: Date,
    required: 'date is required.',
    default: Date.now
  },
  targetWallet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wallet',
    required: 'wallet is required'
  },
  originWallet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wallet'
  },
  transactionCategory: {
    type: mongoose.Schema.ObjectId,
    ref: 'TransactionCategory'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'user is required'
  }
});

function autopopulate(next) {
  this.populate('transactionCategory');
  next();
}

TransactionSchema.pre('find', autopopulate);

TransactionSchema.statics.createAsync = async function (transaction) {
  return (new this(transaction)).save();
};

TransactionSchema.statics.updateAsync = async function (transaction) {
  return this.findOneAndUpdate({ _id: transaction._id, user: transaction.user }, transaction, { runValidators: true, new: true });
};

TransactionSchema.statics.findAsync = async function (query = queryDefault, limit = 3) {
  return this.find(query).limit(limit);
};

TransactionSchema.statics.findByIdAndUserAsync = async function (_id, user) {
  return this.findOne({ _id, user });
};

TransactionSchema.statics.findByUserAsync = async function (user, limit) {
  return this.findAsync({ user, date: queryDefault.date }, limit);
};

TransactionSchema.statics.findByTargetWalletAndUserAsync = async function (targetWallet, user) {
  return this.find({ targetWallet, user });
};

TransactionSchema.statics.findByTransactionCategoryAndUserAsync = async function (transactionCategory, user) {
  return this.find({ transactionCategory, user });
};

TransactionSchema.statics.findByTypeAndUserAsync = async function (type, user) {
  return this.find({ type, user });
};

TransactionSchema.statics.findByTypeAndTargetWalletAndUserAsync = async function (type, targetWallet, user) {
  return this.find({ type, targetWallet, user });
};

TransactionSchema.statics.findByIdAndUserAndRemoveAsync = async function (_id, user) {
  return this.findOneAndRemove({ _id, user });
};

module.exports = mongoose.model('Transaction', TransactionSchema);
