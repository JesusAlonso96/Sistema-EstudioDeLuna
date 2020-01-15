const Usuario = require('../modelos/usuario'),
    Venta = require('../modelos/venta'),
    Producto = require('../modelos/producto'),
    Corte = require('../modelos/corte_caja'),
    Pedido = require('../modelos/pedido'),
    Caja = require('../modelos/caja'),
    momento = require('moment');

exports.altaUsuario = function (req, res) {
    const usuarioAlta = new Usuario(req.body);
    usuarioAlta.save(function (err, usuarioCreado) {
        if (err) {
            return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un error al guardar el usuario' });
        }
        return res.json({ titulo: 'Usuario guardado con exito', detalles: usuarioCreado });
    })
}
exports.obtenerVentasMes = function (req, res) {
    var fechaInicio = new Date(momento(req.params.fechaInicio).format('YYYY-MM-DD'));
    var fechaFin = new Date(momento(req.params.fechaFin).format('YYYY-MM-DD'));
    Venta.aggregate()
        .lookup({
            from: "pedidos",
            localField: "pedido",
            foreignField: "_id",
            as: "pedido",
        })
        .unwind('pedido')
        .lookup({
            from: "productos",
            localField: "pedido.productos",
            foreignField: "_id",
            as: "productos",
        })
        .lookup({
            from: "clientes",
            localField: "pedido.cliente",
            foreignField: "_id",
            as: "cliente",
        })
        .match({
            $and: [
                { fecha: { $gte: fechaInicio } },
                { fecha: { $lte: fechaFin } }
            ]
        })
        .project({
            _id: '$pedido._id',
            num_pedido: '$pedido.num_pedido',
            status: '$pedido.status',
            fecha_creacion: '$pedido.fecha_creacion',
            fecha_entrega: '$pedido.fecha_entrega',
            comentarios: '$pedido.comentarios',
            total: '$pedido.total',
            anticipo: '$pedido.anticipo',
            foto: '$pedido.foto',
            productos: '$productos',
            dia: '$fecha',
            hora: '$hora',
            nombre_cliente: { $arrayElemAt: ['$cliente.nombre', 0] },
            ape_pat_cliente: { $arrayElemAt: ['$cliente.ape_pat', 0] },
            ape_mat_cliente: { $arrayElemAt: ['$cliente.ape_mat', 0] }

        })
        .group({
            _id: null,
            montoTotal: { $sum: '$total' },
            ventas: {
                $push: {
                    pedido: {
                        _id: '$_id',
                        num_pedido: '$num_pedido',
                        status: '$status',
                        fecha_creacion: '$fecha_creacion',
                        fecha_entrega: '$fecha_entrega',
                        comentarios: '$comentarios',
                        anticipo: '$anticipo',
                        total: '$total',
                        foto: '$foto',
                        productos: '$productos',
                        cliente: {
                            $concat: ['$nombre_cliente', ' ', '$ape_pat_cliente', ' ', '$ape_mat_cliente']
                        },
                    },
                    fecha: '$dia',
                    hora: '$hora'
                }
            }
        })
        .exec(function (err, ventas) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (ventas.length == 0) {
                return res.status(422).send({ titulo: 'Sin ventas', detalles: 'No existen ventas en este dia', tipo: 0 })
            }
            return res.json(ventas[0]);
        })
}
exports.obtenerVentasDia = function (req, res) {
    var fecha = new Date(Date.now());
    fecha = momento().format('YYYY-MM-DD');
    fecha2 = new Date(fecha);
    Venta.aggregate()
        .lookup({
            from: "pedidos",
            localField: "pedido",
            foreignField: "_id",
            as: "pedido",
        })
        .unwind('pedido')
        .lookup({
            from: "productos",
            localField: "pedido.productos",
            foreignField: "_id",
            as: "productos",
        })
        .lookup({
            from: "clientes",
            localField: "pedido.cliente",
            foreignField: "_id",
            as: "cliente",
        })
        .match({
            fecha: fecha2
        })
        .project({
            _id: '$pedido._id',
            num_pedido: '$pedido.num_pedido',
            status: '$pedido.status',
            fecha_creacion: '$pedido.fecha_creacion',
            fecha_entrega: '$pedido.fecha_entrega',
            comentarios: '$pedido.comentarios',
            total: '$pedido.total',
            anticipo: '$pedido.anticipo',
            foto: '$pedido.foto',
            productos: '$productos',
            dia: '$fecha',
            hora: '$hora',
            nombre_cliente: { $arrayElemAt: ['$cliente.nombre', 0] },
            ape_pat_cliente: { $arrayElemAt: ['$cliente.ape_pat', 0] },
            ape_mat_cliente: { $arrayElemAt: ['$cliente.ape_mat', 0] }

        })
        .group({
            _id: null,
            montoTotal: { $sum: '$total' },
            ventas: {
                $push: {
                    pedido: {
                        _id: '$_id',
                        num_pedido: '$num_pedido',
                        status: '$status',
                        fecha_creacion: '$fecha_creacion',
                        fecha_entrega: '$fecha_entrega',
                        comentarios: '$comentarios',
                        anticipo: '$anticipo',
                        total: '$total',
                        foto: '$foto',
                        productos: '$productos',
                        cliente: {
                            $concat: ['$nombre_cliente', ' ', '$ape_pat_cliente', ' ', '$ape_mat_cliente']
                        },
                    },
                    fecha: '$dia',
                    hora: '$hora'
                }
            }
        })
        .exec(function (err, ventas) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (ventas.length == 0) {
                return res.status(422).send({ titulo: 'Sin ventas', detalles: 'No existen ventas en este dia', tipo: 0 })
            }
            return res.json(ventas);
        })
}
exports.obtenerVentasRango = function (req, res) {
    var fechaInicio = new Date(momento(req.params.fechaInicio).format('YYYY-MM-DD'));
    var fechaFin = new Date(momento(req.params.fechaFin).format('YYYY-MM-DD'));
    Venta.aggregate()
        .lookup({
            from: "pedidos",
            localField: "pedido",
            foreignField: "_id",
            as: "pedido",
        })
        .unwind('pedido')
        .lookup({
            from: "productos",
            localField: "pedido.productos",
            foreignField: "_id",
            as: "productos",
        })
        .match({
            $and: [
                { fecha: { $gte: fechaInicio } },
                { fecha: { $lte: fechaFin } }
            ]
        })
        .group({
            _id: '$fecha',
            montoTotal: { $sum: '$pedido.total' },
            clientes: { $sum: 1 }
        })
        .sort({
            _id: 1
        })
        .exec(function (err, ventas) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (ventas.length == 0) {
                return res.status(422).send({ titulo: 'Sin ventas', detalles: 'No existen ventas', tipo: 0 })
            }
            return res.json(ventas);
        })
}
exports.obtenerProductosRango = function (req, res) {
    var fechaInicio = new Date(momento(req.params.fechaInicio).format('YYYY-MM-DD'));
    var fechaFin = new Date(momento(req.params.fechaFin).format('YYYY-MM-DD'));
    Producto.aggregate()
        .match({
            $and: [
                { fecha: { $gte: fechaInicio } },
                { fecha: { $lte: fechaFin } }
            ]
        })
        .group({
            _id: null,
            count: { $sum: 1 }
        })
        .exec(function (err, ventas) {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (ventas.length == 0) {
                return res.status(422).send({ titulo: 'Sin ventas', detalles: 'No existen ventas', tipo: 0 })
            }
            return res.json(ventas);
        })
}
exports.obtener10ProductosMasVendidos = function (req, res) {
    var fechaInicio = new Date(momento(req.params.fechaInicio).format('YYYY-MM-DD'));
    var fechaFin = new Date(momento(req.params.fechaFin).format('YYYY-MM-DD'));
    Venta.aggregate()
        .match({
            $and: [
                { fecha: { $gte: fechaInicio } },
                { fecha: { $lte: fechaFin } }
            ]
        })
        .lookup({
            from: "pedidos",
            localField: "pedido",
            foreignField: "_id",
            as: "pedido",
        })
        .unwind('pedido')
        .unwind('pedido.productos')
        .lookup({
            from: "productos",
            localField: "pedido.productos",
            foreignField: "_id",
            as: "pedido.productos",
        })
        .unwind('pedido.productos')
        .group({
            _id: '$pedido.productos',
            cantidad: { $sum: 1 }
        })
        .sort({
            cantidad: -1
        })
        .limit(15)
        .exec(function (err, ventas) {
            if (err) {
                return res.json(err);
            }
            if (ventas.length == 0) {
                return res.status(422).send({ titulo: 'Sin ventas', detalles: 'No existen ventas', tipo: 0 })
            }
            return res.json(ventas);
        })
}
exports.obtenerVentasPorFamilias = function (req, res) {
    var fechaInicio = new Date(momento(req.params.fechaInicio).format('YYYY-MM-DD'));
    var fechaFin = new Date(momento(req.params.fechaFin).format('YYYY-MM-DD'));
    Venta.aggregate()
        .match({
            $and: [
                { fecha: { $gte: fechaInicio } },
                { fecha: { $lte: fechaFin } }
            ]
        })
        .lookup({
            from: "pedidos",
            localField: "pedido",
            foreignField: "_id",
            as: "pedido",
        })
        .unwind('pedido')
        .unwind('pedido.productos')
        .lookup({
            from: "productos",
            localField: "pedido.productos",
            foreignField: "_id",
            as: "pedido.productos",
        })
        .unwind('pedido.productos')
        .lookup({
            from: "familias",
            localField: "pedido.productos.familia",
            foreignField: "_id",
            as: "pedido.productos.familia",
        })
        .unwind('pedido.productos.familia')
        .group({
            _id: '$pedido.productos.familia',
            cantidad: {
                $sum: '$pedido.productos.precio'
            },
        })
        .exec(function (err, ventas) {
            if (err) {
                return res.json(err);
            }
            if (ventas.length == 0) {
                return res.status(422).send({ titulo: 'Sin ventas', detalles: 'No existen ventas', tipo: 0 })
            }
            return res.json(ventas);
        })
}
//corte de caja
exports.existeCorte = function (req, res) {
    const fecha = new Date(momento(Date.now()).format('YYYY-MM-DD'));
    Corte.findOne({ fecha })
        .exec(function (err, corte) {
            if (err) {
                return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo verificar la existencia del corte de caja', tipo: 2 })
            }
            if (corte) {
                return res.json({ encontrado: true });
            } else {
                return res.json({ encontrado: false });
            }
        })
}
exports.crearCorteCaja = function (req, res) {
    var fecha = new Date(Date.now());
    var hora = new Date(Date.now());
    fecha = momento().format('YYYY-MM-DD');
    hora = momento().format('h:mm:ss a');

    corte = new Corte({
        fecha,
        hora,
        usuario: res.locals.usuario,
        efectivoEsperado: req.body.efectivoEsperado,
        tarjetaEsperado: req.body.tarjetaEsperado,
        efectivoContado: req.body.efectivoContado,
        tarjetaContado: req.body.tarjetaContado,
        fondoEfectivo: req.body.fondoEfectivo,
        fondoTarjetas: req.body.fondoTarjetas
    });
    corte.save(function (err, guardado) {
        if (err) {
            return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un error al guardar el corte de caja', tipo: 2 })
        }
        return res.json(guardado);
    });
}
exports.obtenerCaja = function (req, res) {
    Caja.findOne()
        .exec(function (err, caja) {
            if (err) {
                return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un error al obtener las cantidades', tipo: 2 })
            }
            return res.json(caja)
        })
}
exports.actualizarCaja = function (req, res) {
    Caja.findOneAndUpdate({}, {
        cantidadTotal: req.body.cantidadTotal,
        cantidadEfectivo: req.body.cantidadEfectivo,
        cantidadTarjetas: req.body.cantidadTarjetas
    })
        .exec(function (err, cajaActualizada) {
            if (err) {
                return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un error al actualizar la caja', tipo: 2 })
            }
            return res.json(cajaActualizada);
        })
}
exports.obtenerCortesCaja = function (req, res) {
    Corte.find()
        .sort({
            num_corte: 'desc'
        })
        .exec(function (err, cortes) {
            if (err) {
                return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un error al obtener el historial', tipo: 2 })
            }
            return res.json(cortes);
        })
}
exports.cambiarPermisos = function (req, res) {
    Usuario.findByIdAndUpdate(req.body._id, {
        rol: req.body.rol,
        rol_sec: req.body.rol_sec
    })
        .exec(function (err, actualizado) {
            if (err) return res.status(422).send({ titulo: 'Error', detalles: 'No se pudieron cambiar los permisos del usuario' });
            return res.json({ titulo: 'Permisos cambiados', detalles: 'Permisos cambiados exitosamente' });
        })
}
exports.obtenerUsuariosEliminados = function (req, res) {
    Usuario.find({ activo: 0 })
        .exec(function (err, usuariosEncontrados) {
            if (err) return res.status(422).send({ titulo: 'Error', detalles: 'No se pudieron obtener los usuarios eliminados' });
            return res.json(usuariosEncontrados);
        });
}
exports.restaurarUsuarioEliminado = function (req, res) {
    Usuario.findByIdAndUpdate(req.body._id, {
        activo: 1
    })
        .exec(function (err, usuarioRestaurado) {
            if (err) return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo restaurar el usuario' });
            return res.json({ titulo: 'Usuario restaurado', detalles: 'Usuario restaurado exitosmente' });
        })
}
exports.adminMiddleware = function (req, res, next) {
    if (res.locals.usuario.rol == 2 && res.locals.usuario.rol_sec == 0) {
        next();
    } else {
        return res.status(422).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })

    }
}
