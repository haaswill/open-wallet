'use strict';

const { initialize, post, postAuthorization } = require('../../tests');
const { expect } = require('chai');
const User = require('./model');
const seeds = require('../../seeds');

// Initialize test's index file
initialize();

before(done => {
  User.remove()
    .then(() => User.seed(seeds.users).then(() => done()))
    .catch(done);
});

describe('User', () => {
  describe('Model', () => {
    describe('#createAsync()', () => {
      it('should create', () => {
        const user = {
          _id: '595af9e7a0ded33f30ae0ef7',
          email: 'test@gmail.com',
          password: '1234',
          name: {
            first: 'John',
            last: 'Doe'
          }
        };
        User.createAsync(user);
      });
    });
    describe('#updateAsync()', () => {
      it('should update ', () => {
        const user = {
          _id: '595af9e7a0ded33f30ae0ef7',
          email: 'test@gmail.com',
          name: {
            first: 'Jane',
            last: 'Doe'
          }
        };
        User.updateAsync(user);
      });
    });
    describe('#generateJwt()', () => {
      it('should generate jwt', () => {
        const token = User.generateJwt('test@gmail.com');
        expect(token).to.exist;
      });
    });
    describe('#findOneByEmailAsync()', () => {
      it('should find user by email', done => {
        User.findOneByEmailAsync('test@gmail.com')
          .then(user => {
            expect(user.email).to.equal('test@gmail.com');
            done();
          })
          .catch(done);
      });
    });
    describe('#createOrUpdateAsync()', () => {
      it('should create james', done => {
        const newUser = {
          _id: '595af9e8a0ded33f30ae0efc',
          email: 'jamesdoe@gmail.com',
          password: '1234',
          name: {
            first: 'James'
          }
        };
        User.createOrUpdateAsync(newUser)
          .then(user => {
            expect(user.name.first).to.equal(newUser.name.first);
            done();
          })
          .catch(done);
      });
      it('should update james\' last name', done => {
        const newUser = {
          _id: '595af9e8a0ded33f30ae0efc',
          email: 'jamesdoe@gmail.com',
          name: {
            first: 'James',
            last: 'Doe'
          }
        };
        User.createOrUpdateAsync(newUser)
          .then(user => {
            expect(user.name.first).to.equal(newUser.name.first);
            expect(user.name.last).to.equal(newUser.name.last);
            done();
          })
          .catch(done);
      });
    });
    describe('#getFacebookUserAsync()', () => {
      it('should get user data from facebook', done => {
        const token = process.env.FACEBOOK_TOKEN;
        const email = process.env.EMAIL;
        expect(token).to.exist;
        expect(email).to.exist;
        User.getFacebookUserAsync(token)
          .then(user => {
            expect(user.email).to.equal(email);
            done();
          })
          .catch(done);
      });
    });
    // Can't test getGoogleUserAsync beacause the token updates very often
    // describe('#getGoogleUserAsync()', () => {
    //   it('should get user data from google', done => {
    //     const token = process.env.GOOGLE_TOKEN;
    //     const email = process.env.EMAIL;
    //     expect(token).to.exist;
    //     expect(email).to.exist;
    //     User.getGoogleUserAsync(token)
    //       .then(user => {
    //         expect(user.email).to.equal(email);
    //         done();
    //       })
    //       .catch(done);
    //   });
    // });
  });
  describe('Router', () => {
    describe('POST /api/user/facebook', () => {
      it('should create or update a user using facebook api', done => {
        const token = process.env.FACEBOOK_TOKEN;
        const email = process.env.EMAIL;
        expect(token).to.exist;
        expect(email).to.exist;
        post('/api/user/facebook', done, { token })
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user.email).to.equal(email);
            done();
          });
      });
    });
    // describe('POST /api/user/google', () => {
    //   it('should create or update a user using google api', done => {
    //     const token = process.env.GOOGLE_TOKEN;
    //     const email = process.env.EMAIL;
    //     expect(token).to.exist;
    //     expect(email).to.exist;
    //     post('/api/user/google', done, { token })
    //       .then(res => {
    //         expect(res).to.have.status(200);
    //         expect(res.body.user.email).to.equal(email);
    //         done();
    //       });
    //   });
    // });
    describe('POST /api/user/signup', () => {
      it('should sign up using email and password', done => {
        post('/api/user/signup', done)
          .then(res => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
    describe('POST /api/user/signin', () => {
      it('should sign in using email and password', done => {
        postAuthorization('/api/user/signin', done, 'johndoe@gmail.com', '1234')
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.user.email).to.equal('johndoe@gmail.com');
            done();
          });
      });
    });
  });
});
