
import { STATUS_CODE } from 'config';
import { join } from 'path';

const errorPage = join(__dirname, '../views/error');

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  if (res.statusCode === 200) { res.status(500); }
  if (err.message === 'Invalid IV length') return res.json({ error: 'invalid token' });
  if (err.reason === 'bad decrypt') return res.json({ error: 'invalid code or token' });
  res.status(err.status || res.statusCode);

  return res.render(errorPage,
    {
      errMsg: err.message,
      status: res.statusCode,
      errName: STATUS_CODE[res.statusCode],
    });
};
