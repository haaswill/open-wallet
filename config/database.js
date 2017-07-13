'use strict';

const mongoose = require('mongoose');

const initialize = () => {
  // Set mongoose promise to ES6 Promises
  mongoose.Promise = Promise;
  // Define seed method for models
  mongoose.Model.seed = async function (entities) {
    return this.create(entities);
  };
};

const handleConnectionEvents = () => {
  mongoose.connection.on('connected', () => {
    console.log('✅  - connected to database');
  });
  mongoose.connection.on('open', () => {
    console.log('♻️  - oppened database');
  });
  mongoose.connection.on('close', () => {
    console.log('❎  - closed database connection');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('❎  - disconnected from database');
  });
  mongoose.connection.on('error', (err) => {
    console.error(`🚫  - ${err.message}`);
  });
};

const connect = url => {
  handleConnectionEvents();
  return mongoose.connect(url, {
    useMongoClient: true
  });
};

initialize();

module.exports = {
  connect,
  handleConnectionEvents,
  mongoose
};
