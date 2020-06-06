const config = require('../config/default.json');

module.exports = (req, res, next) => {
    const query = req.query;
    const scope = query.scope;
    const responseType = query.response_type;
    const redirectUri = query.redirect_uri;
    const accessType = query.access_type;
    const clientId = query.client_id;
    const state = query.state;

    if (!scope) return res.status(400).send({ message: config.MISSING_PARAMS.SCOPE });
    if (!responseType) return res.status(400).send({ message: config.MISSING_PARAMS.RESPONSE_TYPE });
    if (!redirectUri) return res.status(400).send({ message: config.MISSING_PARAMS.REDIRECT_URI });
    if (!accessType) return res.status(400).send({ message: config.MISSING_PARAMS.ACCESS_TYPE });
    if (!clientId) return res.status(400).send({ message: config.MISSING_PARAMS.CLIENT_ID });
    if (!state) return res.status(400).send({ message: config.MISSING_PARAMS.STATE });
    if (accessType != "code") return res.status(400).send({ message: config.MISSING_PARAMS.ALLOWED_GRANT_TYPE });

    next();
}
