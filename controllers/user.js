const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/user');

exports.createWithFacebook = async (req, res) => {
  const { token } = req.body;
  const { email, first_name, last_name } = await getFacebookUserInfo(req.body.token);
  const newUser = {
    email,
    name: {
      first: first_name,
      last: last_name
    },
    token: generateJwt(token)
  };
  const user = await createOrUpdate(newUser);
  res.json(user);
};

//createByGoogle

const getFacebookUserInfo = async (token) => {
  const { data } = await axios.get(`https://graph.facebook.com/me?fields=email,first_name,last_name&access_token=${token}`);
  return data;
};

//getGoogleUserInfo

const createOrUpdate = async (user) => {
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
