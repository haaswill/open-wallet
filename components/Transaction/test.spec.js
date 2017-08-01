'use strict';

const { initialize, get, put, del } = require('../../tests');
const { expect } = require('chai');
const Transaction = require('./model');
const seed = require('./seed.json');

initialize();

before(done => {
  Transaction.remove()
    .then(() => Transaction.seed(seed).then(() => done()))
    .catch(done);
});

describe('Transaction', () => {
  describe('Model', () => {
    describe('#createAsync()', () => {
      it('should create an income', () => {
        const transaction = {
          _id: '595edd381e2d5c15f18e33d4',
          description: 'Company',
          value: 5000,
          type: 'Income',
          date: Date.now(),
          targetWallet: '595aff0e16ca883ef634f9af',
          transactionCategory: '595d2562cb0bbf0f6e130640',
          user: '595af9e7a0ded33f30ae0eec'
        };
        Transaction.createAsync(transaction);
      });
      it('should create an expense', () => {
        const transaction = {
          _id: '595ede201e2d5c15f18e33d5',
          description: 'Mall',
          value: 300,
          type: 'Expense',
          date: Date.now(),
          targetWallet: '595aff0e16ca883ef634f9af',
          transactionCategory: '595d2562cb0bbf0f6e13063e',
          user: '595af9e7a0ded33f30ae0eec'
        };
        Transaction.createAsync(transaction);
      });
      it('should create a transfer', () => {
        const transaction = {
          _id: '595ede4f1e2d5c15f18e33d6',
          description: 'Transfer',
          value: 150,
          type: 'Transfer',
          date: Date.now(),
          targetWallet: '595aff0616ca883ef634f9ae',
          originWallet: '595afefc16ca883ef634f9ad',
          user: '595af9e7a0ded33f30ae0eec'
        };
        Transaction.createAsync(transaction);
      });
    });
    describe('#updateAsync()', () => {
      it('should update an income', () => {
        const transaction = {
          _id: '595edd381e2d5c15f18e33d4',
          value: 8000,
          user: '595af9e7a0ded33f30ae0eec'
        };
        Transaction.updateAsync(transaction);
      });
      it('should update an expense', () => {
        const transaction = {
          _id: '595ede201e2d5c15f18e33d5',
          value: 300,
          user: '595af9e7a0ded33f30ae0eec'
        };
        Transaction.updateAsync(transaction);
      });
      it('should update a transfer', () => {
        const transaction = {
          _id: '595ede4f1e2d5c15f18e33d6',
          value: 2000,
          user: '595af9e7a0ded33f30ae0eec'
        };
        Transaction.updateAsync(transaction);
      });
    });
    describe('#findByIdAndUserAsync()', () => {
      it('should find a transactions by id and user', done => {
        Transaction.findByIdAndUserAsync('595ede4f1e2d5c15f18e33d6', '595af9e7a0ded33f30ae0eec')
          .then(transaction => {
            expect(transaction.value).to.equal(2000);
            done();
          })
          .catch(done);
      });
    });
    describe('#findAsync()', () => {
      it('should find transactions since last week', done => {
        Transaction.findAsync()
          .then(transactions => {
            expect(transactions).to.be.a('array');
            done();
          })
          .catch(done);
      });
    });
    describe('#findByUserAsync()', () => {
      it('should find all transactions by user', done => {
        Transaction.findByUserAsync('595af9e7a0ded33f30ae0eec', 7)
          .then(transactions => {
            expect(transactions.length).to.equal(7);
            done();
          })
          .catch(done);
      });
    });
    describe('#findByTargetWalletAndUserAsync()', () => {
      it('should find all transactions by target wallet and user', done => {
        Transaction.findByTargetWalletAndUserAsync('595aff0e16ca883ef634f9af', '595af9e7a0ded33f30ae0eec', 5)
          .then(transactions => {
            expect(transactions.length).to.equal(5);
            done();
          })
          .catch(done);
      });
    });
    describe('#findByTransactionCategoryAndUserAsync()', () => {
      it('should find all transactions by transaction category and user', done => {
        Transaction.findByTransactionCategoryAndUserAsync('595d2562cb0bbf0f6e13063e', '595af9e7a0ded33f30ae0eec')
          .then(transactions => {
            expect(transactions.length).to.equal(2);
            done();
          })
          .catch(done);
      });
    });
    describe('#findByTypeAndUserAsync()', () => {
      it('should find all expenses by user', done => {
        Transaction.findByTypeAndUserAsync('Expense', '595af9e7a0ded33f30ae0eec')
          .then(transactions => {
            expect(transactions.length).to.equal(3);
            done();
          })
          .catch(done);
      });
      it('should find all incomes by user', done => {
        Transaction.findByTypeAndUserAsync('Income', '595af9e7a0ded33f30ae0eec')
          .then(transactions => {
            expect(transactions.length).to.equal(2);
            done();
          })
          .catch(done);
      });
      it('should find all tranfers by user', done => {
        Transaction.findByTypeAndUserAsync('Transfer', '595af9e7a0ded33f30ae0eec')
          .then(transactions => {
            expect(transactions.length).to.equal(2);
            done();
          })
          .catch(done);
      });
    });
    describe('#findByTypeAndTargetWalletAndUserAsync()', () => {
      it('should find all expenses by wallet and user', done => {
        Transaction.findByTypeAndTargetWalletAndUserAsync('Expense', '595aff0e16ca883ef634f9af', '595af9e7a0ded33f30ae0eec')
          .then(transactions => {
            expect(transactions.length).to.equal(3);
            done();
          })
          .catch(done);
      });
      it('should find all incomes by wallet and user', done => {
        Transaction.findByTypeAndTargetWalletAndUserAsync('Income', '595aff0e16ca883ef634f9af', '595af9e7a0ded33f30ae0eec')
          .then(transactions => {
            expect(transactions.length).to.equal(2);
            done();
          })
          .catch(done);
      });
      it('should find all transfers by wallet and user', done => {
        Transaction.findByTypeAndTargetWalletAndUserAsync('Transfer', '595aff0616ca883ef634f9ae', '595af9e7a0ded33f30ae0eec')
          .then(transactions => {
            expect(transactions.length).to.equal(2);
            done();
          })
          .catch(done);
      });
    });
    describe('#findByIdAndUserAndRemoveAsync()', () => {
      it('should delete a transaction', () => {
        Transaction.findByIdAndUserAndRemoveAsync('595d33b164ec0f0ddf15dd79', '595af9e7a0ded33f30ae0eec');
      });
      it('should not find the transaction', done => {
        Transaction.findByIdAndUserAsync('595d33b164ec0f0ddf15dd79', '595af9e7a0ded33f30ae0eec')
          .then(res => {
            expect(res).to.not.exist;
            done();
          });
      });
    });
  });
  describe('Router', () => {
    describe('GET /api/transaction', () => {
      it('should get 5 transactions by user', done => {
        get('/api/transaction?limit=5', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(5);
            done();
          });
      });
      it('should get all transactions by user', done => {
        get('/api/transaction?limit=lala', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(7);
            done();
          });
      });
    });
    describe('GET /api/transaction/expenses', () => {
      it('should get expenses by user', done => {
        get('/api/transaction/expenses', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(3);
            done();
          });
      });
    });
    describe('GET /api/transaction/incomes', () => {
      it('should get incomes by user', done => {
        get('/api/transaction/incomes', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(2);
            done();
          });
      });
    });
    describe('GET /api/transaction/transfers', () => {
      it('should get transfers by user', done => {
        get('/api/transaction/transfers', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(2);
            done();
          });
      });
    });
    describe('GET /api/transaction/wallet/:id/expenses', () => {
      it('should get expenses by wallet and user', done => {
        get('/api/transaction/wallet/595aff0e16ca883ef634f9af/expenses', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(3);
            done();
          });
      });
    });
    describe('GET /api/transaction/wallet/:id/incomes', () => {
      it('should get incomes by wallet and user', done => {
        get('/api/transaction/wallet/595aff0e16ca883ef634f9af/incomes', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(2);
            done();
          });
      });
    });
    describe('GET /api/transaction/wallet/:id/transfers', () => {
      it('should get transfers by wallet and user', done => {
        get('/api/transaction/wallet/595aff0616ca883ef634f9ae/transfers', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(2);
            done();
          });
      });
    });
    describe('GET /api/transaction/:id', () => {
      it('should get a transaction by id', done => {
        get('/api/transaction/595ede4f1e2d5c15f18e33d6', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            done();
          });
      });
    });
    describe('GET /api/transaction/wallet/:id', () => {
      it('should get a transaction by wallet', done => {
        get('/api/transaction/wallet/595aff0e16ca883ef634f9af?limit=5', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(5);
            done();
          });
      });
    });
    describe('GET /api/transaction/transactionCategory/:id', () => {
      it('should get a transaction by transactionCategory', done => {
        get('/api/transaction/transactionCategory/595d2562cb0bbf0f6e13063e', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(2);
            done();
          });
      });
    });
    describe('PUT /api/transaction/:id', () => {
      it('should update a transaction', done => {
        const transaction = {
          value: 99
        };
        put('/api/transaction/595d2562cb0bbf0f6e13063c', done, transaction)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            expect(res.body.value).to.equal(transaction.value);
            done();
          });
      });
    });
    describe('DELETE /api/transaction/:id', () => {
      it('should delete a transaction by id', done => {
        del('/api/transaction/595edd381e2d5c15f18e33d4', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('Transaction deleted.');
            done();
          });
      });
      it('should not find the transaction', done => {
        Transaction.findByIdAndUserAsync('595edd381e2d5c15f18e33d4', '595af9e7a0ded33f30ae0eec')
          .then(res => {
            expect(res).to.not.exist;
            done();
          });
      });
    });
  });
});
