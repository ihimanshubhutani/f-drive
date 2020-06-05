const express = require("express");
const config = require("config");
const { verifyEmailWithCode } = require("../controller/emailServiceHandler");
const { updateVerifiedColumn } = require("../controller/userDataHandler");
const routes = express.Router();

routes.get('/verification-service', (req, res) => {
    const email = req.query.validemail;
    const code = req.query.code;

    verifyEmailWithCode(email, code)
        .then(result => {
            if (result) {
                updateVerifiedColumn(email).then(() => {
                    res.redirect('/');
                })
            }
            else {
                res.send({ message: config.MESSAGE.LINK_EXPIRED });
            }
        })
})

module.exports = routes;