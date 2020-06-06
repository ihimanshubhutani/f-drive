const express = require("express");
const config = require("config");
const routes = express.Router();
const path = require("path");

routes.get('/', (req, res) => {

    const query = req.query;
    const scope = query.scope;
    const responseType = query.response_type;
    const redirectUri = query.redirect_uri;
    const accessType = query.access_type;
    const clientId = query.client_id;
    const state = query.state;
    console.log(scope, responseType, redirectUri, accessType, clientId, state);
    if (!(scope & responseType & redirectUri & accessType & clientId & state)) return res.status(400).send({ message: 'config.MESSAGE.MISSING_PARAMETERS' });


    res.render(path.join(__dirname, "../views/oauthLogin"), {});

});

module.exports = routes;