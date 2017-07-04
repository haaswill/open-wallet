'use strict';

const { mongoose } = require('../../config/database');
const ObjectId = mongoose.Types.ObjectId;

const WalletSchema = new mongoose.Schema({
  description: { type: String, trim: true, maxlength: 20, required: 'description is required.' },
  value: { type: Number, min: 0, required: 'value is required.' },
  color: { type: String, trim: true, minlength: 4, maxlength: 7, required: 'color is required.' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'user is required' }
});

WalletSchema.statics.createAsync = async function (wallet) {
  return (new this(wallet)).save();
};

WalletSchema.statics.updateAsync = async function (wallet) {
  return this.findOneAndUpdate({ _id: wallet._id, user: wallet.user }, wallet, { runValidators: true, new: true });
};

WalletSchema.statics.findByUserAsync = async function (user) {
  return this.find({ user });
};

WalletSchema.statics.findByIdAndUserAsync = async function (id, user) {
  return this.findOne({ _id: id, user });
};

WalletSchema.statics.getAccountBalanceByUserAsync = async function (user) {
  return this.aggregate([
    { $match: { user: ObjectId(user) } },
    {
      $group: {
        _id: null,
        value: { $sum: '$value' }
      }
    },
    { $limit: 1 }
  ]).exec();
};

module.exports = mongoose.model('Wallet', WalletSchema);
