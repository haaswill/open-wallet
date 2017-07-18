'use strict';

const { initialize, get, post, put, del } = require('../../tests');
const { expect } = require('chai');
const Wallet = require('./model');
const seed = require('./seed.json');

initialize();

before(done => {
  Wallet.remove()
    .then(() => Wallet.seed(seed).then(() => done()))
    .catch(done);
});

describe('Wallet', () => {
  describe('Model', () => {
    describe('#createAsync()', () => {
      it('should create', () => {
        const newWallet = {
          _id: '595af99b3c05e83efa0765f6',
          description: 'Bank',
          value: 500.50,
          color: '#0000FF',
          icon: 'bank',
          user: '595af9e7a0ded33f30ae0ef7'
        };
        Wallet.createAsync(newWallet);
      });
    });
    describe('#updateAsync()', () => {
      it('should update', () => {
        const newWallet = {
          _id: '595af99b3c05e83efa0765f6',
          description: 'Bank',
          value: 500.00,
          color: '#FF0000',
          user: '595af9e7a0ded33f30ae0ef7'
        };
        Wallet.updateAsync(newWallet);
      });
    });
    describe('#findByUserAsync()', () => {
      it('should find all wallets by user', done => {
        Wallet.findByUserAsync('595af9e7a0ded33f30ae0eec')
          .then(wallets => {
            expect(wallets.length).to.equal(4);
            done();
          })
          .catch(done);
      });
    });
    describe('#findByIdAndUserAsync()', () => {
      it('should find one wallet', done => {
        Wallet.findByIdAndUserAsync('595aff0e16ca883ef634f9af', '595af9e7a0ded33f30ae0eec')
          .then(wallet => {
            expect(wallet.value).to.equal(50.75);
            done();
          })
          .catch(done);
      });
    });
    describe('#getAccountBalanceByUserAsync()', () => {
      it('should get an account balance', done => {
        Wallet.getAccountBalanceByUserAsync('595af9e7a0ded33f30ae0eec')
          .then(res => {
            const [{ value: accountBalance }] = res;
            expect(accountBalance).to.equal(551.75);
            done();
          })
          .catch(done);
      });
    });
    describe('#findByIdAndUserAndRemoveAsync()', () => {
      it('should delete a wallet', () => {
        Wallet.findByIdAndUserAndRemoveAsync('595efecf1e2d5c15f18e33d7', '595af9e7a0ded33f30ae0eec');
      });
      it('should not find the wallet', done => {
        Wallet.findByIdAndUserAsync('595efecf1e2d5c15f18e33d7', '595af9e7a0ded33f30ae0eec')
          .then(res => {
            expect(res).to.not.exist;
            done();
          });
      });
    });
  });
  describe('Router', () => {
    describe('GET /api/wallet', () => {
      it('should get wallets by user', done => {
        get('/api/wallet', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(3);
            done();
          });
      });
    });
    describe('GET /api/wallet/:id', () => {
      it('should get a wallet by id', done => {
        get('/api/wallet/595aff0e16ca883ef634f9af', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            done();
          });
      });
    });
    describe('GET /api/wallet/accountbalance', () => {
      it('should get the account balance', done => {
        get('/api/wallet/accountbalance', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.wallets).to.be.a('array');
            expect(res.body.accountBalance).to.equal(551.25);
            done();
          });
      });
    });
    describe('POST /api/wallet', () => {
      it('should post a wallet', done => {
        const wallet = {
          _id: '595cfbd4c91548076f8a3363',
          description: 'Savings',
          icon: 'currency-usd',
          value: 666,
          color: '#FF00FF'
        };
        post('/api/wallet', done, wallet)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            done();
          });
      });
    });
    describe('POST /api/wallet/expense/:id', () => {
      it('should add an expense to a wallet', done => {
        const transaction = {
          _id: '595d296a64ec0f0ddf15dd77',
          description: 'Grocery',
          value: 24.75,
          transactionCategory: '595d2562cb0bbf0f6e13063d'
        };
        post('/api/wallet/expense/595afefc16ca883ef634f9ad', done, transaction)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            done();
          })
          .catch(done);
      });
    });
    describe('POST /api/wallet/income/:id', () => {
      it('should add an income to a wallet', done => {
        const transaction = {
          _id: '595d333864ec0f0ddf15dd78',
          description: 'Company',
          value: 2000,
          transactionCategory: '595d2562cb0bbf0f6e130640'
        };
        post('/api/wallet/income/595afefc16ca883ef634f9ad', done, transaction)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            done();
          })
          .catch(done);
      });
    });
    describe('POST /api/wallet/transfer/:id', () => {
      it('should make a transfer', done => {
        const transaction = {
          _id: '595d33b164ec0f0ddf15dd79',
          originWallet: '595afefc16ca883ef634f9ad',
          value: 300,
        };
        post('/api/wallet/transfer/595aff0616ca883ef634f9ae', done, transaction)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            done();
          });
      });
    });
    describe('PUT /api/wallet/:id', () => {
      it('should update a wallet', done => {
        const wallet = {
          color: '#303030'
        };
        put('/api/wallet/595cfbd4c91548076f8a3363', done, wallet)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            expect(res.body.color).to.equal('#303030');
            done();
          });
      });
    });
    describe('DELETE /api/wallet/:id', () => {
      it('should delete a wallet', done => {
        del('/api/wallet/595cfbd4c91548076f8a3363', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('Wallet deleted.');
            done();
          });
      });
      it('should not find the wallet', done => {
        Wallet.findByIdAndUserAsync('595cfbd4c91548076f8a3363', '595af9e7a0ded33f30ae0eec')
          .then(res => {
            expect(res).to.not.exist;
            done();
          });
      });
    });
  });
});
