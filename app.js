const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');

const routes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');
const app = express();

// Check if node version is 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major <= 7 && minor <= 5) {
    console.log('🚫 Node version is older than 7.6');
    process.exit();
}

// Import environmental variables
require('dotenv').config({ path: 'variables.env' });

if (app.get('env') === 'development') {
    // Connect to MongoDB local
    mongoose.connect(process.env.DATABASE_LOCAL);
} else {
    // Connect to MongoDB online
    mongoose.connect(process.env.DATABASE);
}
// Tell Mongoose to use ES6 promises
mongoose.Promise = global.Promise;
// Handle bad connection
mongoose.connection.on('error', (err) => {
    console.error(`🚫 ${err.message}`);
});

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());

routes(app);

// If the above routes did not work, we throw a 404 on them and forward to error handler
app.use(errorHandlers.notFound);
// If it was an unexpected error
if (app.get('env') === 'development') {
    // Development Error Handler - Prints stack trace
    app.use(errorHandlers.developmentErrors);
}
// Production Error Handler - No stack trace
app.use(errorHandlers.productionErrors);

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running on PORT ${server.address().port}`);
});