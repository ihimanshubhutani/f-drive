const express = require('express');
const routes = express.Router();
const path = require('path');

const authenticate = require('../middleware/authenticate.js');
routes.use(authenticate);

routes.get('/', (req, res) => res.sendFile('index.html',
  { root: path.join(__dirname, '../views/') })
);

module.exports = routes;