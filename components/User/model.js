'use strict';

const { mongoose } = require('../../config/database');
const bcrypt = require('bcrypt-nodejs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const NameSchema = new mongoose.Schema({
  first: { type: String, trim: true, maxlength: 30 },
  last: { type: String, trim: true, maxlength: 50 }
});

const UserSchema = new mongoose.Schema({
  email: { type: String, trim: true, unique: true, lowercase: true, maxlength: 256, validate: [validator.isEmail, 'invalid email address'], required: 'email is required.' },
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

UserSchema.statics.generateJwt = token => jwt.sign({ token }, process.env.JWTSECRET, { expiresIn: "7d" });

UserSchema.statics.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

UserSchema.statics.findOneByEmailAsync = async function (email) {
  return this.findOne({ email });
}

UserSchema.statics.createAsync = async function (user) {
  return (new this(user)).save();
};

UserSchema.statics.updateAsync = async function (user) {
  return this.findOneAndUpdate({ email: user.email }, user, { runValidators: true, new: true });
};

UserSchema.statics.createOrUpdateAsync = async function (userData) {
  const user = await this.findOneByEmailAsync(userData.email);
  if (user) {
    // Update user data
    return await this.updateAsync(userData);
  } else {
    // Create new user
    return await this.createAsync(userData);
  }
};

UserSchema.statics.getFacebookUser = async function (token) {
  const { data: { email, first_name, last_name } } = await axios.get(`https://graph.facebook.com/me?fields=email,first_name,last_name&access_token=${token}`);
  const user = {
    email,
    name: {
      first: first_name,
      last: last_name
    },
    token: this.generateJwt(token)
  };
  return user;
};

UserSchema.statics.getGoogleUser = async function (token) {
  const { data: { email, given_name, family_name } } = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const user = {
    email,
    name: {
      first: given_name,
      last: family_name
    },
    token: this.generateJwt(token)
  };
  return user;
};

module.exports = mongoose.model('User', UserSchema);
