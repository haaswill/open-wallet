const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/user');

exports.createWithFacebook = async (req, res) => {
  const { email, first_name, last_name } = await getFacebookUserInfo(req.body.token);
  let user = await findByEmail(email);
  if (!user) {
    // generate token
    const newUser = {
      email,
      name: {
        first: first_name,
        last: last_name
      },
      token: ''
    };
    user = await create(newUser);
  }
  user.token = generateJwt(user._id);
  await user.save();
  res.json(user);
};

//createByGoogle

const getFacebookUserInfo = async (token) => {
  const { data } = await axios.get(`https://graph.facebook.com/me?fields=email,first_name,last_name&access_token=${token}`);
  return data;
};

//getGoogleUserInfo

const create = async (user) => {
  return await (new User(user)).save();
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: "2h" });
};
