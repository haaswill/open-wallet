'use strict';

// Import environmental variables
require('dotenv').config({ path: 'variables.env' });

const chai = require('chai');
const chaiHttp = require('chai-http');
const database = require('../config/database');

chai.use(chaiHttp);

const serverUrl = process.env.SERVER_URL;

const initialize = () => {
  before(done => {
    if (!database.mongoose.connection.readyState) {
      database.connect(process.env.DATABASE_LOCAL_TEST).then(() => done()).catch(done);
    } else {
      done();
    }
  });
};

const get = (url, done, token = 'token') => {
  return chai.request(serverUrl)
    .get(url)
    .set('Authorization', `Bearer ${token}`)
    .catch(done);
};

const post = (url, body = new Object(), done, token = 'token') => {
  return chai.request(serverUrl)
    .post(url)
    .set('Authorization', `Bearer ${token}`)
    .send(body)
    .catch(done);
};

const put = (url, body = new Object(), done, token = 'token') => {
  return chai.request(serverUrl)
    .put(url)
    .set('Authorization', `Bearer ${token}`)
    .send(body)
    .catch(done);
};

const del = (url, done, token = 'token') => {
  return chai.request(serverUrl)
    .del(url)
    .set('Authorization', `Bearer ${token}`)
    .catch(done);
};

module.exports = {
  serverUrl,
  initialize,
  get,
  post,
  put,
  del
};
