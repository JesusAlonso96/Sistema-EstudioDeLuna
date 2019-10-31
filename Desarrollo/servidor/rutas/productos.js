const express = require('express'),
      ruta = express.Router(),
      Producto = require('../controladores/producto');
     
ruta.get('/obtenerProductos/:id', Producto.obtenerProductos);
ruta.get('/obtenerProductosPorCantidad/:nombre', Producto.obtenerProductosPorCantidad);
ruta.get('/familias', Producto.obtenerFamilias );
ruta.post('/buscarProducto', Producto.buscarProducto)

module.exports = ruta;