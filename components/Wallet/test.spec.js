'use strict';

const { expect } = require('chai');
const Wallet = require('./model');
const seeds = require('../../seeds');
require('../../tests');

before(done => {
  Wallet.remove()
    .then(() => Wallet.seed(seeds.wallets).then(() => done()))
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
      it('should all wallets linked to user', done => {
        Wallet.findByUserAsync('595af9e7a0ded33f30ae0eec')
          .then(wallets => {
            expect(wallets.length).to.equal(3);
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
          .then(accountBalance => {
            expect(accountBalance[0].value).to.equal(5951.25);
            done();
          })
          .catch(done);
      });
    });
  });
});
