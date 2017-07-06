'use strict';

const { initialize } = require('../../tests');
const Transaction = require('./model');
const seeds = require('../../seeds');

// Initialize test's index file
initialize();

before(done => {
  Transaction.remove()
    .then(() => Transaction.seed(seeds.transactions).then(() => done()))
    .catch(done);
});

describe('Transaction', () => {
  describe('Model', () => {

  });
});
