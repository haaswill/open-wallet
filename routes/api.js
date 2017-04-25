const express = require('express');
const authentication = require('./authentication');
const user = require('./user');
const wallet = require('./wallet');
const client = require('./client');

const userRouter = express.Router();
const walletRouter = express.Router();
const clientRouter = express.Router();

user(userRouter);
wallet(walletRouter);
client(clientRouter);

module.exports = function (router) {
    router.use('/user', userRouter);
    router.use('/wallet', authentication.isAuthenticated, walletRouter);
    router.use('/client', authentication.isAuthenticated, clientRouter);
}