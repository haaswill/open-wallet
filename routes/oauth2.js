const oauth2orize = require('oauth2orize');
const authentication = require('./authentication');
const User = require('../models/user');
const Client = require('../models/client');
const Token = require('../models/token');
const Code = require('../models/code');

const server = oauth2orize.createServer();

function uid(len) {
  let buf = [];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charlen = chars.length;
  for (let i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }
  return buf.join('');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Register serialialization function
server.serializeClient((client, callback) => callback(null, client._id));

// Register deserialization function
server.deserializeClient(async (id, callback) => {
  const client = await Client.findOne({ _id: id });
  return callback(null, client);
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code(async (client, redirectUri, user, ares, callback) => {
  // Create a new authorization code
  const code = new Code({
    value: uid(16),
    client: client._id,
    redirectUri: redirectUri,
    user: user._id
  });
  // Save the auth code and check for errors
  await code.save();
  return callback(null, code.value);
}));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(async (client, code, redirectUri, callback) => {
  const authCode = await Code.findOne({ value: code });
  if (authCode === undefined) {
    return callback(null, false);
  }
  if (client._id.toString() !== authCode.client.toString()) {
    return callback(null, false);
  }
  if (redirectUri !== authCode.redirectUri) {
    return callback(null, false);
  }
  // Delete auth code now that it has been used
  await authCode.remove();
  // Create a new access token
  const token = new Token({
    value: uid(256),
    client: authCode.client,
    user: authCode.user
  });
  // Save the access token and check for errors
  await token.save();
  return callback(null, token);
}));

// User authorization endpoint
exports.authorization = [
  server.authorization(async (clientId, redirectUri, callback) => {
    const client = await Client.findOne({ id: clientId });
    return callback(null, client, redirectUri);
  }), (req, res) => res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client })
]

// User decision endpoint
exports.decision = [
  server.decision()
]

// Application client token exchange endpoint
exports.token = [
  server.token(),
  server.errorHandler()
]
