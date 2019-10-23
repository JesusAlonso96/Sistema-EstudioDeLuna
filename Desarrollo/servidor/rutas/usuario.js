const express = require('express'),
      ruta = express.Router(),
      Usuario = require('../controladores/usuario');

ruta.post('/login', Usuario.login);


module.exports = ruta;