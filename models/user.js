const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    access_token: String,
    password: { type: String, required: true },
    name: {
        first: String,
        last: String
    }
});

userSchema.pre('save', function (callback) {
    const user = this;
    if (!user.isModified('password')) {
        return callback();
    }
    bcrypt.genSalt(5, function (err, salt) {
        if (err) {
            return callback(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return callback(err);
            }
            user.password = hash;
            callback();
        });
    });
});

userSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);