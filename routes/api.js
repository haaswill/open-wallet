const express = require('express');
const authentication = require('../config/passport');
const user = require('../components/User/router');
const wallet = require('../components/Wallet/router');
const transactionCategory = require('../components/TransactionCategory/router');
const transaction = require('../components/Transaction/router');

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
  router.use('/transactioncategory', authentication.isAuthenticated, transactionCategoryRouter);
  router.use('/transaction', authentication.isAuthenticated, transactionRouter);
}
