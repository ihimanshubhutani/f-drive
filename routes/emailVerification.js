const express = require('express');
const config = require('config');
const { verifyEmailWithCode, deleteVerifiedCode } = require('../controller/emailServiceHandler');
const { updateVerifiedColumn } = require('../controller/userDataHandler');

const routes = express.Router();

routes.get('/verification-service', (req, res) => {
  const email = req.query.validemail;
  const { code } = req.query;

  return verifyEmailWithCode(email, code)
    .then((result) => {
      if (result) {
        return updateVerifiedColumn(email).then(() => {
          deleteVerifiedCode(result.id);
          return res.redirect('/');
        });
      }
      return res.send({ message: config.MESSAGE.LINK_EXPIRED });
    });
});

module.exports = routes;
