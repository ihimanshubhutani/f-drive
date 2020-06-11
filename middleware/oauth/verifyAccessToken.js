import { } from '../../services/oauth/oauthHandler';

module.exports = (req, res, next) => {
  const accessToken = res.json(req.headers.authorization.split('Bearer ')[1]);
};
