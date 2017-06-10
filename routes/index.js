const express = require('express');
const api = require('./api');

const apiRouter = express.Router();
api(apiRouter);

module.exports = function (app) {
  app.use('/api', apiRouter);
  app.get('*', function (req, res) {
    res.render('index');
  });
};
