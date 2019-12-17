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
//post
ruta.post('/empleado', UsuarioCtrl.autenticacionMiddleware, AdminCtrl.altaUsuario);
//patch

//delete



module.exports = ruta;