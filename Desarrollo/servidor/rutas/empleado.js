const express = require('express'),
    ruta = express.Router(),
    UsuarioCtrl = require('../controladores/usuario'),
    Empleado = require('../controladores/empleado');

//get
ruta.get('/fotografo/:id',UsuarioCtrl.autenticacionMiddleware, Empleado.obtenerFotografo)
ruta.get('/fotografos',UsuarioCtrl.autenticacionMiddleware, Empleado.obtenerFotografos)
ruta.get('/asignarFotografo/:fecha', UsuarioCtrl.autenticacionMiddleware, Empleado.asignarFotografo);
ruta.get('/asistioTrabajador/:id/:fecha', Empleado.tieneAsistenciaTrabajador);
ruta.get('/obtenerNotificaciones/:id/:fecha', Empleado.obtenerNotificaciones);
ruta.get('/numPedidos',UsuarioCtrl.autenticacionMiddleware, Empleado.numPedidosFotografo);
ruta.get('/obtenerPedidosPorEmpleado/:id', Empleado.obtenerPedidosPorEmpleado);
ruta.get('/obtenerPedidosEnProceso/:id', Empleado.obtenerPedidosEnProceso);

//post
ruta.post('/crearPedido/:id', UsuarioCtrl.autenticacionMiddleware, Empleado.recepcionistaMiddleware, Empleado.crearPedido);
ruta.post('/crearVenta', UsuarioCtrl.autenticacionMiddleware, Empleado.recepcionistaMiddleware,Empleado.realizarVenta);
ruta.post('/crearNotificacion',/* UsuarioCtrl.autenticacionMiddleware, Empleado.recepcionistaMiddleware, */Empleado.crearNotificacion)
module.exports = ruta;