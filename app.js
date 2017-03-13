const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const config = require('./config');
const passportConfig = require('./config/passport');
const routes = require('./routes');
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(config.mlabConnectionString);
passportConfig(passport);

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'supersecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

routes(app, express.Router(), passport);
app.listen(port);