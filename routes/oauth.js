const express = require("express");
const config = require("config");
const routes = express.Router();
const path = require("path");
const validateOauthParameters = require("../middleware/oauth/validateOauthParameters");

routes.get('/', validateOauthParameters, (req, res) => {

    res.render(path.join(__dirname, "../views/oauthLogin"), { clientName: req.client.name });

});

module.exports = routes;