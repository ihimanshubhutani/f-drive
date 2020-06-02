const express = require('express');
const routes = express.Router();
const path = require('path');

const authenticateSession = require('../middleware/authenticateSession.js');
routes.use(authenticateSession);

routes.get('/', (req, res) => res.sendFile('index.html',
  { root: path.join(__dirname, '../views/') })
);

module.exports = routes;