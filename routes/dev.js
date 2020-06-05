const express = require("express");
const config = require("config");
const routes = express.Router();
const path = require("path")

routes.get('/', (req, res) => {
    res.sendFile("devLogin.html", { root: path.join(__dirname, "../views/") });
});

routes.get('/signup', (req, res) => {
    res.sendFile("devSignup.html", { root: path.join(__dirname, "../views/") });
});

routes.post('/login', (req, res) => {

});

routes.post('/signup', (req, res) => {

});


module.exports = routes;