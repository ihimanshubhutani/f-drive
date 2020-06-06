const express = require("express");
const config = require("config");
const routes = express.Router();
const path = require("path")
const cryptoPasswordParser = require("../middleware/cryptoPassword");
const clientValidator = require("../middleware/clientValidator");
const { insertClient } = require("../controller/clientDataHandler");
const { aut } = require("../middleware/authenticateClientSession");
routes.use(cryptoPasswordParser);

routes.get('/', (req, res) => {

})

routes.get('/login', (req, res) => {
    res.sendFile("devLogin.html", { root: path.join(__dirname, "../views/") });
});

routes.get('/signup', (req, res) => {
    res.sendFile("devSignup.html", { root: path.join(__dirname, "../views/") });
});

routes.post('/login', (req, res) => {

});

routes.post('/signup', clientValidator, (req, res) => {
    insertClient(req.body.username, req.body.email, req.body.password);
});


module.exports = routes;