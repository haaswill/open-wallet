// Load required packages
const mongoose = require('mongoose');

// Define our token schema
const TokenSchema = new mongoose.Schema({
    value: { type: String, trim: true, minlength: 256, maxlength: 256, required: 'value is required.' },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'user is required' },
    client: { type: mongoose.Schema.ObjectId, ref: 'Client', required: 'client is required' }
});

function autopopulate(next) {
    this.populate('user');
    this.populate('client');
    next();
}

//Hash access token

TokenSchema.pre('find', autopopulate);
TokenSchema.pre('findOne', autopopulate);

// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema);