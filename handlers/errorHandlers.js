/*
    Catch Errors Handler

    Wrap the function in
    catchErrors(), catch and errors they throw, and pass it along to express middleware with next()
*/
exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/*
    Not Found Error Handler

    If it hits a route that is not found, mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

/*
    Development Error Handler
*/
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack ? err.stack : err
  };
  res.status(err.status || 500);
  res.json(errorDetails);
};

/*
    Production Error Handler
    No stacktraces are sent to user
*/
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
};
