const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const NameSchema = new mongoose.Schema({
  first: { type: String, trim: true, maxlength: 30 },
  last: { type: String, trim: true, maxlength: 50 }
});

const UserSchema = new mongoose.Schema({
  email: { type: String, trim: true, unique: true, lowercase: true, maxlength: 256, required: 'email is required.' },
  token: { type: String, trim: true },
  password: { type: String, trim: true },
  name: { type: NameSchema, required: 'name is requdired.' }
});

UserSchema.pre('save', function (callback) {
  const user = this;
  if (!user.isModified('password')) {
    return callback();
  }
  bcrypt.genSalt(5, (err, salt) => {
    if (err) {
      return callback(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return callback(err);
      }
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
