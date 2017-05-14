const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const ClientSchema = new mongoose.Schema({
    name: { type: String, trim: true, unique: true, required: 'name is required.' },
    id: { type: String, trim: true, required: 'id is required.' },
    secret: { type: String, trim: true, required: 'secret is required.' },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: 'user is required' }
});

function autopopulate(next) {
    this.populate('user');
    next();
}

ClientSchema.pre('find', autopopulate);
ClientSchema.pre('findOne', autopopulate);
ClientSchema.pre('save', function (callback) {
    const client = this;
    if (!client.isModified('secret')) {
        return callback();
    }
    bcrypt.genSalt(5, (err, salt) => {
        if (err) {
            return callback(err);
        }
        bcrypt.hash(client.secret, salt, null, (err, hash) => {
            if (err) {
                return callback(err);
            }
            client.secret = hash;
            callback();
        });
    });
});

ClientSchema.methods.verifySecret = function (secret, cb) {
    bcrypt.compare(secret, this.secret, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Client', ClientSchema);