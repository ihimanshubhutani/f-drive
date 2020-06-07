const config = require('../../config/default.json');
const { fetchInfoFromClientId } = require("../../controller/clientDataHandler");
const { checkScopes } = require("../../controller/oauthHandler");

module.exports = (req, res, next) => {
    const query = req.query;
    const scope = query.scope;
    const responseType = query.response_type;
    const redirectUri = query.redirect_uri;
    const accessType = query.access_type;
    const clientId = query.client_id;
    const state = query.state;
    const scopeArray = scope.split(" ");

    if (!scope) return res.status(400).send({ message: config.MISSING_PARAMS.SCOPE });
    if (!responseType) return res.status(400).send({ message: config.MISSING_PARAMS.RESPONSE_TYPE });
    if (!redirectUri) return res.status(400).send({ message: config.MISSING_PARAMS.REDIRECT_URI });
    if (!accessType) return res.status(400).send({ message: config.MISSING_PARAMS.ACCESS_TYPE });
    if (!clientId) return res.status(400).send({ message: config.MISSING_PARAMS.CLIENT_ID });
    if (!state) return res.status(400).send({ message: config.MISSING_PARAMS.STATE });
    if (responseType != "code") return res.status(400).send({ message: config.MISSING_PARAMS.ALLOWED_GRANT_TYPE });
    const distinguishedScopes = checkScopes(scopeArray);

    if (distinguishedScopes.invalid.length) return res.status(400).send({ message: config.MESSAGE.INVALID_SCOPE, distinguishedScopes })

    fetchInfoFromClientId(clientId)
        .then(result => {
            if (!result) throw { status: 401, message: config.MESSAGE.INVALID_CLIENT_ID }
            if (result.redirectUri != redirectUri) throw { status: 401, message: config.MESSAGE.INVALID_REDIRECT_URI }
            req.client = { name: result.username };
            next();
        }).catch(err => res.status(err.status).send({ message: err.message }))

}
