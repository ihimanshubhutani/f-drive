import { Router } from 'express';
import { join } from 'path';
import authenticateSession from '../middleware/authenticateSession';

const routes = Router();

routes.use('/test/redirect', (req, res) => {
  res.send(req.query.code);
});

routes.get('/', authenticateSession, (req, res) => {
  console.log(req.session);
  if (!req.session.verification) {
    return res.render(join(__dirname, '../views/showVerificationMessage.ejs'), { email: req.session.email });
  }
  console.log(req.session);
  return res.render(join(__dirname, '../views/index'),
    { username: req.session.username });
});

routes.get('/logout', (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});
export default routes;
