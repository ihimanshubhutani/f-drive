const express = require("express");
const config = require("config");
const routes = express.Router();
const path = require("path");

routes.get('/', (req, res) => {
    const { scope, responseType, redirectUri, accessType, clientId }



    res.render(path.join(__dirname, "../views/oauthLogin"), {});

});

module.exports = routes;