'use strict';

const { initialize, get, post, put, del } = require('../../tests');
const { expect } = require('chai');
const TransactionCategory = require('./model');
const seeds = require('../../seeds');

// Initialize test's index file
initialize();

before(done => {
  TransactionCategory.remove()
    .then(() => TransactionCategory.seed(seeds.transactionCategories).then(() => done()))
    .catch(done);
});

describe('Transaction Category', () => {
  describe('Model', () => {
    describe('#createAsync()', () => {
      it('should create an income transaction category', () => {
        const transactionCategory = {
          _id: '595f81a9f007d004491cd2e4',
          description: 'Sales',
          type: 'Income',
          color: '#7742f4',
          icon: 'currency-usd',
          user: '595af9e7a0ded33f30ae0eec'
        };
        TransactionCategory.createAsync(transactionCategory);
      });
      it('should create an expense transaction category', () => {
        const transactionCategory = {
          _id: '595f8237f007d004491cd2e5',
          description: 'Services',
          type: 'Expense',
          color: '#a5915c',
          icon: 'worker',
          user: '595af9e7a0ded33f30ae0eec'
        };
        TransactionCategory.createAsync(transactionCategory);
      });
    });
    describe('#updateAsync()', () => {
      it('should update an income transaction category', () => {
        const transactionCategory = {
          _id: '595f81a9f007d004491cd2e4',
          color: '#8eaa33',
          user: '595af9e7a0ded33f30ae0eec'
        };
        TransactionCategory.updateAsync(transactionCategory);
      });
      it('should update an expense', () => {
        const transactionCategory = {
          _id: '595f8237f007d004491cd2e5',
          color: '#cc1c4b',
          user: '595af9e7a0ded33f30ae0eec'
        };
        TransactionCategory.updateAsync(transactionCategory);
      });
    });
    describe('#findByIdAndUserAsync()', () => {
      it('should find a transaction category by id and user', done => {
        TransactionCategory.findByIdAndUserAsync('595f8237f007d004491cd2e5', '595af9e7a0ded33f30ae0eec')
          .then(transactionCategory => {
            expect(transactionCategory.color).to.equal('#cc1c4b');
            done();
          })
          .catch(done);
      });
    });
    describe('#findByUserAsync()', () => {
      it('should find all transaction categories by user', done => {
        TransactionCategory.findByUserAsync('595af9e7a0ded33f30ae0eec')
          .then(transactionCategories => {
            expect(transactionCategories.length).to.equal(6);
            done();
          })
          .catch(done);
      });
    });
    describe('#findByIdAndUserAndRemoveAsync()', () => {
      it('should delete a transaction category', () => {
        TransactionCategory.findByIdAndUserAndRemoveAsync('595f8237f007d004491cd2e5', '595af9e7a0ded33f30ae0eec');
      });
      it('should not find the transaction category', done => {
        TransactionCategory.findByIdAndUserAsync('595f8237f007d004491cd2e5', '595af9e7a0ded33f30ae0eec')
          .then(res => {
            expect(res).to.not.exist;
            done();
          });
      });
    });
  });
  describe('Router', () => {
    describe('GET /api/transactioncategory', () => {
      it('should get all transaction categories by user', done => {
        get('/api/transactioncategory', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(5);
            done();
          });
      });
    });
    describe('GET /api/transactioncategory/:id', () => {
      it('should get a transaction category by id', done => {
        get('/api/transactioncategory/595f81a9f007d004491cd2e4', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            done();
          });
      });
    });
    describe('POST /api/transactioncategory', () => {
      it('should create an income transaction category', done => {
        const transactionCategory = {
          _id: '5960d97e242a7203cea08b9a',
          description: 'Babysitting',
          type: 'Income',
          color: '#f442e8',
          icon: 'human-child',
          user: '595af9e7a0ded33f30ae0eec'
        };
        post('/api/transactioncategory', done, transactionCategory)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            expect(res.body.color).to.equal(transactionCategory.color);
            done();
          });
      });
      it('should create an expense transaction category', done => {
        const transactionCategory = {
          _id: '5960da00242a7203cea08b9b',
          description: 'Babysitter',
          type: 'Expense',
          color: '#91528d',
          icon: 'human-child',
          user: '595af9e7a0ded33f30ae0eec'
        };
        post('/api/transactioncategory', done, transactionCategory)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            expect(res.body.color).to.equal(transactionCategory.color);
            done();
          });
      });
    });
    describe('PUT /api/transactioncategory/:id', () => {
      it('should update an income transaction category', done => {
        const transactionCategory = {
          color: '#FF0000'
        };
        put('/api/transactioncategory/5960d97e242a7203cea08b9a', done, transactionCategory)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            expect(res.body.color).to.equal(transactionCategory.color);
            done();
          });
      });
      it('should update an expense transaction category', done => {
        const transactionCategory = {
          color: '#0000FF'
        };
        put('/api/transactioncategory/5960da00242a7203cea08b9b', done, transactionCategory)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user).to.equal('595af9e7a0ded33f30ae0eec');
            expect(res.body.color).to.equal(transactionCategory.color);
            done();
          });
      });
    });
    describe('DELETE /api/transactioncategory/:id', () => {
      it('should delete a transaction category by id', done => {
        del('/api/transactioncategory/5960d97e242a7203cea08b9a', done)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('Transaction category deleted.');
            done();
          });
      });
      it('should not find the transaction category', done => {
        TransactionCategory.findByIdAndUserAsync('5960d97e242a7203cea08b9a', '595af9e7a0ded33f30ae0eec')
          .then(res => {
            expect(res).to.not.exist;
            done();
          });
      });
    });
  });
});
