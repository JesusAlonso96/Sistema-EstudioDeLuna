const express = require('express'),
    ruta = express.Router(),
    UsuarioCtrl = require('../controladores/usuario'),
    AdminCtrl = require('../controladores/administrador');

//get
ruta.get('/obtenerVentasDia', UsuarioCtrl.autenticacionMiddleware, AdminCtrl.adminMiddleware, AdminCtrl.obtenerVentasDia);
ruta.get('/obtenerVentasRango/:fechaInicio/:fechaFin', AdminCtrl.obtenerVentasRango);
ruta.get('/obtenerMasVendidos/:fechaInicio/:fechaFin', AdminCtrl.obtener10ProductosMasVendidos);
ruta.get('/obtenerVentasPorFamilia/:fechaInicio/:fechaFin', AdminCtrl.obtenerVentasPorFamilias);
ruta.get('/obtenerVentasMes/:fechaInicio/:fechaFin', UsuarioCtrl.autenticacionMiddleware, AdminCtrl.adminMiddleware, AdminCtrl.obtenerVentasMes);
ruta.get('/existeCorte', UsuarioCtrl.autenticacionMiddleware, AdminCtrl.adminMiddleware, AdminCtrl.existeCorte);
ruta.get('/obtenerTotalCaja', UsuarioCtrl.autenticacionMiddleware,AdminCtrl.adminMiddleware, AdminCtrl.obtenerCaja);
ruta.get('/obtenerCortesCaja', UsuarioCtrl.autenticacionMiddleware, AdminCtrl.adminMiddleware, AdminCtrl.obtenerCortesCaja);
//post
ruta.post('/empleado', UsuarioCtrl.autenticacionMiddleware, AdminCtrl.altaUsuario);
ruta.post('/crearCorteCaja', UsuarioCtrl.autenticacionMiddleware, AdminCtrl.adminMiddleware, AdminCtrl.crearCorteCaja);
//patch
ruta.patch('/actualizarCaja', UsuarioCtrl.autenticacionMiddleware, AdminCtrl.adminMiddleware, AdminCtrl.actualizarCaja);

//delete



module.exports = ruta;