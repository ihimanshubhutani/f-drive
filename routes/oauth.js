const express = require("express");
const config = require("config");
const routes = express.Router();
const path = require("path");
const validateOauthParameters = require("../middleware/oauth/validateOauthParameters");

routes.get('/', validateOauthParameters, (req, res) => {
    console.log(req.url);
    res.render(path.join(__dirname, "../views/oauthLogin"), { clientName: req.client.name, url: req.url });

});

module.exports = routes;