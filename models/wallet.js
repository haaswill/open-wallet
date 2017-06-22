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

WalletSchema.methods.createAsync = async function (wallet) {
  return (new this(wallet)).save();
};

WalletSchema.methods.findByIdAndUpdateAsync = async function (id, wallet) {
  return this.model('Wallet').findByIdAndUpdate(id, wallet, {
    new: true,
    runValidators: true
  }).exec();
};

WalletSchema.methods.findByIdAndRemoveAsync = async function (id) {
  return this.model('Wallet').findByIdAndRemove(id);
};

WalletSchema.methods.findOneByUserAsync = async function (user) {
  return this.model('Wallet').findOne({ user });
};

WalletSchema.methods.findOneByIdAndUserAsync = async function (id, user) {
  return this.model('Wallet').findOne({ _id: id, user });
};

module.exports = mongoose.model('Wallet', WalletSchema);
