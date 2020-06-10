import { SECRET, STATUS_CODE } from 'config';
import { urlencoded } from 'body-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
// eslint-disable-next-line no-unused-vars
import ejs from 'ejs';
import { join } from 'path';
import filesRoute from './routes/files';
import index from './routes/index';
import loginRoute from './routes/login';
import signupRoute from './routes/signup';
import emailVerificationRoute from './routes/emailVerification';
import devRoute from './routes/dev';
import oauthRoute from './routes/oauth';

const errorPage = join(__dirname, '/views/error');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    secret: SECRET,
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
      errName: STATUS_CODE[res.statusCode],
    });
});

app.listen(3000, console.log('Running Server'));

export default app;
