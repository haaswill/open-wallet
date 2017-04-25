// Load required packages
const mongoose = require('mongoose');

// Define our token schema
const CodeSchema = new mongoose.Schema({
    value: { type: String, required: true },
    redirectUri: { type: String, required: true },
    _userId: { type: String, required: true },
    _clientId: { type: String, required: true }
});

//Hash value

// Export the Mongoose model
module.exports = mongoose.model('Code', CodeSchema);