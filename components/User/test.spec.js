'use strict';

const { expect } = require('chai');
const User = require('./model');
const seeds = require('../../seeds');
require('../../tests');

before(done => {
  User.seed(seeds.users)
    .then(() => done())
    .catch(done);
});

after(done => {
  User.remove()
    .then(() => done())
    .catch(done);
});

describe('User', () => {
  describe('Model', () => {
    describe('#createAsync()', () => {
      it('should save', () => {
        const newUser = {
          email: 'test@gmail.com',
          password: '1234',
          name: {
            first: 'John',
            last: 'Doe'
          }
        };
        User.createAsync(newUser);
      });
    });

    describe('#updateAsync()', () => {
      it('should update ', () => {
        const newUser = {
          email: 'test@gmail.com',
          name: {
            first: 'Jane',
            last: 'Doe'
          }
        };
        User.updateAsync(newUser);
      });
    });

    describe('#updateAsync()', () => {
      it('should update ', () => {
        const newUser = {
          email: 'test@gmail.com',
          name: {
            first: 'Jane',
            last: 'Doe'
          }
        };
        User.updateAsync(newUser);
      });
    });
  });
});
