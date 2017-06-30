'use strict';

const database = require('../config/database');

require('dotenv').config({ path: 'variables.env' });

before(done => {
  if (!database.mongoose.connection.readyState) {
    database.connect(process.env.DATABASE_LOCAL_TEST).then(() => done()).catch(done);
  } else {
    done();
  }
});
