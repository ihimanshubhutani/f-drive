const express = require("express");
const fs = require("fs");
const path = require("path");
const { verifyEmailWithCode } = require("../controller/email-serviceHandler");
const routes = express.Router();


routes.get('/verification-service', (req, res) => {
    const email = req.query.validemail;
    const code = req.query.code;

    verifyEmailWithCode(email, code)=> {

    }
})