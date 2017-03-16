const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    description: String,
    value: Number,
    color: String,
    _user: { type: Number, ref: 'user' }
});

exports.module = mongoose.model('wallet', walletSchema);