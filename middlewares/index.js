'use strict';

exports.handleLimit = (req, res, next) => {
  const limit = Number.parseInt(req.query.limit);
  req.limit = limit;
  next();
};
