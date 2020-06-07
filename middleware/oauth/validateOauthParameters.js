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

  try {
    res.status(config.STATUS.BAD_REQUEST);
    if (!scope) throw new Error(config.MISSING_PARAMS.SCOPE);
    if (!responseType) throw new Error(config.MISSING_PARAMS.RESPONSE_TYPE);
    if (!redirectUri) throw new Error(config.MISSING_PARAMS.REDIRECT_URI);
    if (!accessType) throw new Error(config.MISSING_PARAMS.ACCESS_TYPE);
    if (!clientId) throw new Error(config.MISSING_PARAMS.CLIENT_ID);
    if (!state) throw new Error(config.MISSING_PARAMS.STATE);
    if (responseType !== 'code') throw new Error(config.MISSING_PARAMS.ALLOWED_GRANT_TYPE);
  } catch (err) {
    console.log(config.STATUS_CODE[res.statusCode]);
    return res.render(errorPage,
      {
        errMsg: err.message,
        status: res.statusCode,
        errName: config.STATUS_CODE[res.statusCode],
      });
  }
  const scopeArray = scope.split(' ');
  const distinguishedScopes = checkScopes(scopeArray);
  if (distinguishedScopes.invalid.length) {
    return res.json({ message: config.MESSAGE.INVALID_SCOPE, distinguishedScopes });
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
    .catch(err => res.render(path.join(__dirname, '../../views/error'),
      {
        errMsg: err.message,
        status: res.statusCode,
        errName: config.STATUS_CODE[res.statusCode],
      }));
};
