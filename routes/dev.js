const express = require("express");
const config = require("config");
const routes = express.Router();
const path = require("path")
routes.get('/', (req, res) => {

    res.sendFile("devLogin.html", { root: path.join(__dirname, "../views/") });
})

module.exports = routes;