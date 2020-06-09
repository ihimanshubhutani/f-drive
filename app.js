const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const path = require('path');
const filesRoute = require('./routes/files');
const index = require('./routes/index');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const emailVerificationRoute = require('./routes/emailVerification');
const devRoute = require('./routes/dev');
const oauthRoute = require('./routes/oauth');

const errorPage = path.join(__dirname, '/views/error');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(fileUpload({ createParentPath: true }));

app.use('/files', express.static('./public'));
app.use('/oauth', oauthRoute);
app.use('/dev', devRoute);
app.use('/files', filesRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/email', emailVerificationRoute);
app.use('/', index);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (res.statusCode === 200) { res.status(500); }

  res.status(err.status || res.statusCode);

  res.render(errorPage,
    {
      errMsg: err.message,
      status: res.statusCode,
      errName: config.STATUS_CODE[res.statusCode],
    });
});

app.listen(3000, console.log('Running Server'));

module.exports = app;
