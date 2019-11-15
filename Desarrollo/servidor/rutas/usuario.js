const express = require('express'),
    ruta = express.Router(),
    Usuario = require('../controladores/usuario');


//get
ruta.get('/obtenerUsuario/:id', Usuario.obtenerUsuario);

//post
ruta.post('/login', Usuario.login);
ruta.post('/crearAsistencia/:id', Usuario.crearAsistencia);


module.exports = ruta;