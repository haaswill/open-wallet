// Load required packages
const mongoose = require('mongoose');

// Define our token schema
const CodeSchema = new mongoose.Schema({
    value: { type: String, trim: true, minlength: 16, maxlength: 16, required: 'value is required.' },
    redirectUri: { type: String, trim: true, maxlength: 100, required: 'redirectUri is required.' },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'user is required' },
    client: { type: mongoose.Schema.ObjectId, ref: 'Client', required: 'client is required' }
});

function autopopulate(next) {
    this.populate('user');
    this.populate('client');
    next();
}

//Hash value

CodeSchema.pre('find', autopopulate);
CodeSchema.pre('findOne', autopopulate);

// Export the Mongoose model
module.exports = mongoose.model('Code', CodeSchema);