const express = require('express'),
    ruta = express.Router(),
    Usuario = require('../controladores/usuario'),
    Admin = require('../controladores/administrador');


//get
ruta.get('/obtenerPedidosRealizadosPorFotografo/:id', Usuario.autenticacionMiddleware, Usuario.adminOSupervisorMiddleware, Usuario.obtenerPedidosRealizadosPorFotografo);
ruta.get('/obtenerPedidosRealizados', /*Usuario.autenticacionMiddleware,*/ Usuario.obtenerPedidosRealizados);
ruta.get('/obtenerUsuarios', Usuario.autenticacionMiddleware, Usuario.adminOSupervisorMiddleware, Usuario.obtenerUsuarios);
ruta.get('/obtenerUsuario/:id', Usuario.autenticacionMiddleware, Usuario.obtenerUsuario);
ruta.get('/obtenerFotografos', Usuario.autenticacionMiddleware, Usuario.adminOSupervisorMiddleware, Usuario.obtenerFotografos);
ruta.get('/obtenerPedidosVendidos/:filtro', Usuario.autenticacionMiddleware, Usuario.obtenerPedidosVendidos);
ruta.get('/obtenerPedidosVendidosPorFotografo/:id/:filtro', /*Usuario.autenticacionMiddleware,*/ Usuario.obtenerPedidosVendidosPorFotografo);
ruta.get('/obtenerVentasConRetoquePorFotografo', Usuario.autenticacionMiddleware, Usuario.obtenerVentasConRetoquePorFotografo)
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