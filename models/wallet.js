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

module.exports = mongoose.model('Wallet', WalletSchema);
