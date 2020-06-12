import { SECRET } from 'config';
import { urlencoded } from 'body-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
// eslint-disable-next-line no-unused-vars
import ejs from 'ejs';
import cron from 'node-cron';
import moment from 'moment';
import filesRoute from './app/routes/files';
import index from './app/routes/index';
import loginRoute from './app/routes/login';
import signupRoute from './app/routes/signup';
import emailVerificationRoute from './app/routes/emailVerification';
import devRoute from './app/routes/dev';
import oauthRoute from './app/routes/oauth';
import fdriveRoute from './app/routes/f-drive';
import errorHandler from './app/middleware/errorHandler';
import { destroyExpiredAuthorizationCode } from './app/services/oauth/oauthHandler';

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

// // eslint-disable-next-line no-useless-concat
cron.schedule('0-59 * * * * *', () => {
  destroyExpiredAuthorizationCode();
});

app.use('/files', express.static('./public'));
app.use('/oauth', oauthRoute);
app.use('/dev', devRoute);
app.use('/files', filesRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/email', emailVerificationRoute);
app.use('/fdrive', fdriveRoute);
app.use('/', index);

app.use(errorHandler);
app.listen(3000, console.log('Running Server'));

export default app;
