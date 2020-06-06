const express = require("express");
const config = require("config");
const routes = express.Router();
const path = require("path")
const cryptoPasswordParser = require("../middleware/cryptoPassword");
const clientValidator = require("../middleware/clientValidator");
const { insertClient, authenticateClient, fetchInfoFromClientId, updateRedirectUriAndSecret } = require("../controller/clientDataHandler");
const authenticateClientSession = require("../middleware/authenticateClientSession");
const uuid = require('uuid');

routes.get('/', authenticateClientSession, (req, res) => {
    console.log('idhar');
    fetchInfoFromClientId(req.session.dev.clientId).
        then(result => {
            if (!result.redirectUri)
                return res.sendFile("devIndex.html", { root: path.join(__dirname, "../views/") });

            return res.render('devShowClientDetails', { redirectUri: result.redirectUri, clientSecret: result.clientSecret, clientId: req.session.dev.clientId });
        })
})

routes.post('/generatekeys', (req, res) => {
    updateRedirectUriAndSecret(req.session.dev.clientId, req.body.redirectUri, uuid.v4()).
        then(result => {
            return res.redirect('/dev');
        })
})


routes.get('/login', (req, res) => {
    res.sendFile("devLogin.html", { root: path.join(__dirname, "../views/") });
});

routes.get('/signup', (req, res) => {
    res.sendFile("devSignup.html", { root: path.join(__dirname, "../views/") });
});

routes.post('/login', cryptoPasswordParser, (req, res) => {
    authenticateClient(req.body.username, req.body.password, req.body.email)
        .then(result => {

            if (!result) {
                return res.status(401).send({ message: config.MESSAGE.INVALID_CREDENTIALS });
            }
            console.log('result ', result.id);
            req.session.dev = { clientId: result.id };

            /**
             * if user ticked 'Remember me' checkbox, his session 
             * will be mainted even after browser is closed (for 24 hours from login)
             */
            if (req.body.checkbox) {
                req.session.cookie.maxAge = 24 * 60 * 60 * 1000
            }

            res.redirect('/dev')
        })
});

routes.post('/signup', clientValidator, cryptoPasswordParser, (req, res) => {
    insertClient(req.body.username, req.body.email, req.body.password).
        then((result) => {
            req.session.dev = { clientId: result.id };
            res.redirect('/dev');
        });

});

routes.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/dev');
});


module.exports = routes;