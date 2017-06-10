const express = require('express');
const authentication = require('./authentication');
const user = require('./user');
const wallet = require('./wallet');
const transactionCategory = require('./transactionCategory');
const transaction = require('./transaction');

const userRouter = express.Router();
const walletRouter = express.Router();
const transactionCategoryRouter = express.Router();
const transactionRouter = express.Router();

user(userRouter);
wallet(walletRouter);
transactionCategory(transactionCategoryRouter);
transaction(transactionRouter);

module.exports = (router) => {
  router.use('/user', userRouter);
  router.use('/wallet', authentication.isAuthenticated, walletRouter);
  router.use('/category', authentication.isAuthenticated, transactionCategoryRouter);
  router.use('/transaction', authentication.isAuthenticated, transactionRouter);
}
