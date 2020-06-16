import { Router } from 'express';
import authenticateSession from '../middleware/authenticateSession';
import { showUserIndexPage, logoutUser } from '../controller/userController';

const routes = Router();

routes.use('/test/redirect', (req, res) => {
  res.send(req.query.code);
});

routes.get('/', authenticateSession, showUserIndexPage);
routes.get('/logout', logoutUser);

export default routes;
