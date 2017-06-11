const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/user');

exports.createWithFacebook = async (req, res) => {
  const { token } = req.body;
  const { email, first_name, last_name } = await getFacebookUserAsync(token);
  const newUser = {
    email,
    name: {
      first: first_name,
      last: last_name
    },
    token: generateJwt(token)
  };
  const user = await createOrUpdateAsync(newUser);
  res.json(user);
};

exports.createWithGoogle = async (req, res) => {
  const { token } = req.body;
  const { email, given_name, family_name } = await getGoogleUserAsync(token);
  const newUser = {
    email,
    name: {
      first: given_name,
      last: family_name
    },
    token: generateJwt(token)
  };
  const user = await createOrUpdateAsync(newUser);
  res.json(user);
};

const getFacebookUserAsync = async (token) => {
  const { data } = await axios.get(`https://graph.facebook.com/me?fields=email,first_name,last_name&access_token=${token}`);
  return data;
};

const getGoogleUserAsync = async (token) => {
  const { data } = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

const createOrUpdateAsync = async (user) => {
  const {
    email,
    name: { first, last },
    token
  } = await User.findOneAndUpdate({ email: user.email }, user, { upsert: true, setDefaultsOnInsert: true, new: true });
  return {
    email,
    name: { first, last },
    token
  };
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const generateJwt = (token) => {
  return jwt.sign({ token }, process.env.JWTSECRET, { expiresIn: "7d" });
};
