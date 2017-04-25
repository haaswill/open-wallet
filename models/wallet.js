const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    description: String,
    value: Number,
    color: String,
    _userId: { type: String, required: true }
});

module.exports = mongoose.model('Wallet', walletSchema);