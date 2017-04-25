const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');

const config = require('./config');
const routes = require('./routes');
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(config.mlabConnectionString);

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());

routes(app);
app.listen(port);