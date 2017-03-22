const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const config = require('./config');
const passportConfig = require('./config/passport');
const routes = require('./routes');
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(config.mlabConnectionString);
passportConfig(passport);

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());

routes(app, express.Router(), passport);
app.listen(port);