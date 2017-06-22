const User = require('../models/user');

exports.createOrUpdateWithFacebook = async (req, res) => {
  const { token } = req.body;
  const { data: { email, first_name, last_name } } = await User.getFacebookUserAsync(token);
  const newUser = {
    email,
    name: {
      first: first_name,
      last: last_name
    },
    token: User.generateJwt(token)
  };
  const { data } = await User.createOrUpdateAsync(newUser);
  res.json(data);
};

exports.createOrUpdateWithGoogle = async (req, res) => {
  const { token } = req.body;
  const { data: { email, given_name, family_name } } = await User.getGoogleUserAsync(token);
  const newUser = {
    email,
    name: {
      first: given_name,
      last: family_name
    },
    token: User.generateJwt(token)
  };
  const { data } = await User.createOrUpdateAsync(newUser);
  res.json(data);
};
