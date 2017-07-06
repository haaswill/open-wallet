'use strict';

const { initialize } = require('../../tests');
const TransactionCategory = require('./model');
const seeds = require('../../seeds');

// Initialize test's index file
initialize();

before(done => {
  TransactionCategory.remove()
    .then(() => TransactionCategory.seed(seeds.transactionCategories).then(() => done()))
    .catch(done);
});

describe('Transaction Transaction', () => {
  describe('Model', () => {

  });
});
