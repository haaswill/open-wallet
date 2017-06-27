const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  description: { type: String, trim: true, maxlength: 20, required: 'description is required.' },
  value: { type: Number, min: 0, required: 'value is required.' },
  color: { type: String, trim: true, minlength: 4, maxlength: 7, required: 'color is required.' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'user is required' }
});

function autopopulate(next) {
  this.populate('user');
  next();
}

WalletSchema.pre('find', autopopulate);
WalletSchema.pre('findOne', autopopulate);
WalletSchema.pre('findById', autopopulate);

WalletSchema.statics.createAsync = async function (wallet) {
  return (new this(wallet)).save();
};

WalletSchema.statics.findByIdAndUpdateAsync = async function (id, wallet) {
  return this.findByIdAndUpdate(id, wallet, {
    new: true,
    runValidators: true
  }).exec();
};

WalletSchema.statics.findByUserAsync = async function (user) {
  return this.find({ user });
};

WalletSchema.statics.findByIdAndUserAsync = async function (id, user) {
  return this.findOne({ _id: id, user });
};

WalletSchema.statics.getAccountBalanceByUserAsync = async function (user) {
  return this.aggregate([
    {
      $match: {
        user
      },
      $group: {
        accountBalance: {
          $sum: '$value'
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Wallet', WalletSchema);
