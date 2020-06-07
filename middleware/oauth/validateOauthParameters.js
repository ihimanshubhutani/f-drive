const path = require('path');
const config = require('../../config/default.json');
const { fetchInfoFromClientId } = require('../../controller/clientDataHandler');
const { checkScopes } = require('../../controller/oauth/oauthHandler');

const errorPage = path.join(__dirname, '../../views/error');

module.exports = (req, res, next) => {
  const { query } = req;
  const { scope } = query;
  const responseType = query.response_type;
  const redirectUri = query.redirect_uri;
  const accessType = query.access_type;
  const clientId = query.client_id;
  const { state } = query;

  res.status(config.STATUS.BAD_REQUEST);
  if (!scope) return res.send({ message: config.MISSING_PARAMS.SCOPE });
  if (!responseType) return res.send({ message: config.MISSING_PARAMS.RESPONSE_TYPE });
  if (!redirectUri) return res.send({ message: config.MISSING_PARAMS.REDIRECT_URI });
  if (!accessType) return res.send({ message: config.MISSING_PARAMS.ACCESS_TYPE });
  if (!clientId) return res.send({ message: config.MISSING_PARAMS.CLIENT_ID });
  if (!state) return res.send({ message: config.MISSING_PARAMS.STATE });

  const scopeArray = scope.split(' ');
  if (responseType !== 'code') return res.send({ message: config.MISSING_PARAMS.ALLOWED_GRANT_TYPE });
  const distinguishedScopes = checkScopes(scopeArray);

  if (distinguishedScopes.invalid.length) {
    return res.send({ message: config.MESSAGE.INVALID_SCOPE, distinguishedScopes });
  }

  return fetchInfoFromClientId(clientId)
    .then((result) => {
      if (!result) {
        res.status(config.STATUS.UNAUTHORIZED);
        throw Error(config.MESSAGE.INVALID_CLIENT_ID);
      }
      if (result.redirectUri !== redirectUri) throw new Error(config.MESSAGE.INVALID_REDIRECT_URI);
      req.client = { name: result.username };
      res.status(config.STATUS.OK);
      next();
    })
    .catch(err => {
      res.render(errorPage,
        { err: err.message, status: res.statusCode, statusMsg: res.statusMessage });
    });
};
