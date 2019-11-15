const express = require('express'),
      ruta = express.Router(),
      Cliente = require('../controladores/cliente'),
      Empleado = require('../controladores/empleado'),
      Usuario = require('../controladores/usuario');
      
//get
ruta.get('', Cliente.obtenerClientes);
ruta.get('/obtenerClientePorEmailNombre/:nombre/:email', Cliente.obtenerClienteNombreEmail);
//post
ruta.post('/registrar', Usuario.autenticacionMiddleware, Empleado.recepcionistaMiddleware, Cliente.registrarCliente);



module.exports = ruta;