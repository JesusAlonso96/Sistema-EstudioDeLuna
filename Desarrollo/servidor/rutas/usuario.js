const express = require('express'),
    ruta = express.Router(),
    Usuario = require('../controladores/usuario'),
    Admin = require('../controladores/administrador');


//get
ruta.get('/obtenerUsuarios', Usuario.autenticacionMiddleware, Usuario.adminOSupervisorMiddleware, Usuario.obtenerUsuarios);
ruta.get('/obtenerUsuario/:id', Usuario.obtenerUsuario);
//post
ruta.post('/login', Usuario.login);
ruta.post('/registrar', Usuario.autenticacionMiddleware, Admin.adminMiddleware, Usuario.registrarUsuario)
ruta.post('/crearAsistencia/:id', Usuario.crearAsistencia);
ruta.post('/agregarProducto', Usuario.autenticacionMiddleware, Usuario.adminOSupervisorMiddleware, Usuario.agregarProducto);
ruta.post('/agregarFamilia', Usuario.autenticacionMiddleware, Usuario.adminOSupervisorMiddleware, Usuario.agregarFamilia);
//patch
ruta.patch('/actualizarProducto', Usuario.autenticacionMiddleware, Usuario.adminOSupervisorMiddleware, Usuario.actualizarProducto)
ruta.patch('/eliminarUsuario/:id', Usuario.autenticacionMiddleware, Admin.adminMiddleware, Usuario.eliminarUsuario)
ruta.patch('/editarUsuario', Usuario.autenticacionMiddleware, Admin.adminMiddleware, Usuario.editarUsuario);
//delete
ruta.delete('/eliminarProducto/:id/:idFamilia', Usuario.autenticacionMiddleware, Usuario.adminOSupervisorMiddleware, Usuario.eliminarProducto);
ruta.delete('/eliminarFamilia/:id', Usuario.autenticacionMiddleware, Usuario.adminOSupervisorMiddleware, Usuario.eliminarFamilia);
module.exports = ruta;