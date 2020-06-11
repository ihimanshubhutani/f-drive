import { SECRET } from 'config';
import { urlencoded } from 'body-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
// eslint-disable-next-line no-unused-vars
import ejs from 'ejs';
import filesRoute from './routes/files';
import index from './routes/index';
import loginRoute from './routes/login';
import signupRoute from './routes/signup';
import emailVerificationRoute from './routes/emailVerification';
import devRoute from './routes/dev';
import oauthRoute from './routes/oauth';
import fdriveRoute from './routes/f-drive';
import errorHandler from './middleware/errorHandler';

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
app.use('/fdrive', fdriveRoute);
app.use('/', index);

app.use(errorHandler);
app.listen(3000, console.log('Running Server'));

export default app;
