module.exports = (req, res, next) => {
    const query = req.query;
    const scope = query.scope;
    const responseType = query.response_type;
    const redirectUri = query.redirect_uri;
    const accessType = query.access_type;
    const clientId = query.client_id;
    const state = query.state;
    next();
}
