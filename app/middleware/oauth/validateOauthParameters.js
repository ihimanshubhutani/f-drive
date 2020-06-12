import { join } from 'path';
import {
  STATUS, MISSING_PARAMS, STATUS_CODE, MESSAGE,
} from 'config';
import { fetchInfoFromClientId } from '../../services/client/clientDataHandler';
import { checkScopes } from '../../services/oauth/oauthHandler';

const errorPage = join(__dirname, '../../views/error');

export default (req, res, next) => {
  console.log(req.query);
  const { query } = req;
  const { scope } = query;
  const responseType = query.response_type;
  const redirectUri = query.redirect_uri;
  const accessType = query.access_type;
  const clientId = query.client_id;
  const { state } = query;
  console.log(state);
  try {
    res.status(STATUS.BAD_REQUEST);
    if (!clientId) throw new Error(MISSING_PARAMS.CLIENT_ID);
    if (!scope) throw new Error(MISSING_PARAMS.SCOPE);
    if (!responseType) throw new Error(MISSING_PARAMS.RESPONSE_TYPE);
    if (!redirectUri) throw new Error(MISSING_PARAMS.REDIRECT_URI);
    if (!accessType) throw new Error(MISSING_PARAMS.ACCESS_TYPE);
    if (!state) throw new Error(MISSING_PARAMS.STATE);
    if (responseType !== 'code') throw new Error(MISSING_PARAMS.ALLOWED_GRANT_TYPE);
  } catch (err) {
    console.log(STATUS_CODE[res.statusCode]);
    return res.render(errorPage,
      {
        errMsg: err.message,
        status: res.statusCode,
        errName: STATUS_CODE[res.statusCode],
      });
  }
  const scopeArray = scope.split(' ');
  const distinguishedScopes = checkScopes(scopeArray);
  if (distinguishedScopes.invalid.length) {
    return res.json({
      message: MESSAGE.INVALID_SCOPE,
      distinguishedScopes,
    });
  }

  return fetchInfoFromClientId(clientId)
    .then((result) => {
      if (!result) {
        res.status(STATUS.UNAUTHORIZED);
        throw Error(MESSAGE.INVALID_CLIENT_ID);
      }
      if (result.redirectUri !== redirectUri) throw new Error(MESSAGE.INVALID_REDIRECT_URI);
      req.client = { name: result.username };
      res.status(STATUS.OK);
      next();
    })
    .catch(err => res.render(errorPage,
      {
        errMsg: err.message,
        status: res.statusCode,
        errName: STATUS_CODE[res.statusCode],
      }));
};
