// Load required packages
const mongoose = require('mongoose');

// Define our token schema
const TokenSchema = new mongoose.Schema({
    value: { type: String, required: true },
    _userId: { type: String, required: true },
    _clientId: { type: String, required: true }
});

//Hash access token

// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema);