const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const filesRoute = require('./routes/files');
const index = require('./routes/index');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: config.SECRET, resave: false,
  saveUninitialized: true,
}));

app.use(fileUpload());

app.use('/files', express.static('./public'));

app.use('/files', filesRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/', index);

app.listen(3000, console.log('Running Server'));
