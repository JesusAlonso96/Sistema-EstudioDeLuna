const Usuario = require('../modelos/usuario'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    Asistencia = require('../modelos/asistencia'),
    Pedido = require('../modelos/pedido'),
    Venta = require('../modelos/venta'),
    Notificacion = require('../modelos/notificacion'),
    momento = require('moment'),
    Cliente = require('../modelos/cliente');
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

exports.asignarFotografo = function (req, res) {
    var fecha = new Date(req.params.fecha);
    Usuario.aggregate()
        .unwind("asistencia")
        .lookup({
            from: "asistencias",
            localField: "asistencia",
            foreignField: "_id",
            as: "asistencia"
        })
        .match({
            "asistencia.asistencia": true,
            "asistencia.fecha": fecha,
            rol: 0,
            rol_sec: 1,
            ocupado: false
            //_id: mongoose.Types.ObjectId(req.params.id)
        })
        .project({
            _id: 1,
            nombre: 1,
            ape_pat: 1,
            ape_mat: 1,
            ocupado: 1
        })
        .exec(function (err, asistencia) {
            if (err) {
                return -1;
            }
            if (asistencia.length > 0) {
                return res.json(asistencia)
            } else {
                return res.status(422).send({ titulo: 'No hay ningun fotografo desocupado' })

            }
        })

}
//si ninguno esta desocupado se va asignar al que menos pedidos tenga
exports.numPedidosFotografo = function (req, res) {
    Usuario.aggregate()
        .unwind("pedidosTomados")
        .lookup({
            from: "pedidos",
            localField: "pedidosTomados",
            foreignField: "_id",
            as: "pedidosTomados"
        })
        .match({
            rol: 0,
            rol_sec: 1
        })
        .group({
            _id: "$pedidosTomados.fotografo",
            count: { $sum: 1 }
        })
        .project({
            _id: 1,
            count: 1
        })

        .exec(function (err, respuesta) {
            if (err) {
                return res.json(err);
            }
            return res.json(respuesta);
        })

}
exports.tieneAsistenciaTrabajador = function (req, res) {
    var fecha = new Date(req.params.fecha);
    Usuario.aggregate()
        .unwind("asistencia")
        .lookup({
            from: "asistencias",
            localField: "asistencia",
            foreignField: "_id",
            as: "asistencia"
        })
        .match({
            "asistencia.asistencia": true,
            "asistencia.fecha": fecha,
            rol: 0,
            _id: mongoose.Types.ObjectId(req.params.id)
        })
        .project({
            _id: 0,
            nombre: 1,
            asistencia: 1

        })
        .exec(function (err, asistencia) {
            if (err) {
                return -1;
            }
            if (asistencia.length > 0) {
                return res.json({ titulo: 'Asistio' })
            } else {
                return res.json({ titulo: 'No asistio' })

            }
        })
}
exports.crearPedido = function (req, res) {
    pedido = req.body;
    if (pedido.fotografo.nombre == '') {
        console.log("no se asigna fotografo")
        pedido.fotografo = null;
    }

    pedidoAlta = new Pedido(pedido);
    pedidoAlta.save(function (err, exito) {
        if (err) {
            console.log(err);
            return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo crear el pedido' });
        }
        if (pedidoAlta.fotografo) {
            Usuario.findByIdAndUpdate(req.params.id, {
                $push: {
                    pedidosTomados: exito
                }
            }, function (err, ok) {
                if(err){
                    console.log(err)
                }
                
            })
        }
        if (pedidoAlta.cliente) {
            Cliente.findByIdAndUpdate(pedidoAlta.cliente, {
                $push: {
                    pedidos: pedidoAlta
                }
            }, function (err, ok) {
                if(err){
                    console.log(err)
                }

            })
        }
        return res.json(exito);
    })
}
exports.realizarVenta = function (req, res) {
    const venta = new Venta({
        pedido: req.body,
        fecha: new Date(Date.now()),
        vendedor: res.locals.usuario._id
    })
    venta.save(function (err, exito) {
        if (err) {
            console.log(err);
            return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo crear la venta' });
        }
        return res.json(exito);
    })
}
exports.obtenerPedidosPorEmpleado = function (req, res) {
    Usuario.aggregate()
        .lookup({
            from: "pedidos",
            localField: "pedidosTomados",
            foreignField: "_id",
            as: "pedidosTomados"
        })
        .unwind({
            path: "$pedidosTomados",
            preserveNullAndEmptyArrays: true
        })
        .lookup({
            from: "clientes",
            localField: "pedidosTomados.cliente",
            foreignField: "_id",
            as: "cliente"
        })
        .lookup({
            from: "productos",
            localField: "pedidosTomados.productos",
            foreignField: "_id",
            as: "productos"
        })
        .match({
            $and: [
                { _id: mongoose.Types.ObjectId(req.params.id) },
                {
                    $or: [
                        { "pedidosTomados.status": 'Vendido' },
                        { "pedidosTomados.status": 'Finalizado' }
                    ]
                }
            ]
        })

        .project(
            {
                _id: 0, num_pedido: '$pedidosTomados.num_pedido',
                status: '$pedidosTomados.status',
                nombre_cliente: { $arrayElemAt: ['$cliente.nombre', 0] },
                ape_pat_cliente: { $arrayElemAt: ['$cliente.ape_pat', 0] },
                ape_mat_cliente: { $arrayElemAt: ['$cliente.ape_mat', 0] },
                fecha_creacion: '$pedidosTomados.fecha_creacion',
                fecha_entrega: '$pedidosTomados.fecha_entrega',
                comentarios: '$pedidosTomados.comentarios',
                total: '$pedidosTomados.total',
                anticipo: '$pedidosTomados.anticipo',
            })
        .group({
            _id: '$pedidosTomados._id',
            pedido: {
                $push: {
                    num_pedido: '$num_pedido',
                    status: '$status',
                    fecha_creacion: '$fecha_creacion',
                    fecha_entrega: '$fecha_entrega',
                    comentarios: '$comentarios',
                    cliente: {
                        $concat: ['$nombre_cliente', ' ', '$ape_pat_cliente', ' ', '$ape_mat_cliente']
                    },
                    anticipo: '$anticipo',
                    total: '$total',

                }
            },

        })
        .exec(function (err, pedidos) {
            if (err) {
                console.log(err);
                return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un error al cargar los pedidos' })
            }
            if (pedidos.length > 0) {
                return res.json(pedidos);
            } else {
                return res.status(422).send({ titulo: 'No existen pedidos', detalles: 'El usuario no cuenta con ningun pedido realizado' })
            }

        })
}
exports.obtenerPedidosEnProceso = function (req, res) {
    Usuario.aggregate()
        .lookup({
            from: "pedidos",
            localField: "pedidosTomados",
            foreignField: "_id",
            as: "pedidosTomados"
        })
        .unwind({
            path: "$pedidosTomados",
            preserveNullAndEmptyArrays: true
        })
        .lookup({
            from: "clientes",
            localField: "pedidosTomados.cliente",
            foreignField: "_id",
            as: "cliente"
        })
        .lookup({
            from: "productos",
            localField: "pedidosTomados.productos",
            foreignField: "_id",
            as: "productos"
        })
        .match({
            $and: [
                { _id: mongoose.Types.ObjectId(req.params.id) },
                {
                    $or: [
                        { "pedidosTomados.status": 'En retoque' },
                        { "pedidosTomados.status": 'Imprimiendo' },
                        { "pedidosTomados.status": 'Adherible' }
                    ]
                }
            ]
        })

        .project(
            {
                _id: 0, num_pedido: '$pedidosTomados.num_pedido',
                status: '$pedidosTomados.status',
                nombre_cliente: { $arrayElemAt: ['$cliente.nombre', 0] },
                ape_pat_cliente: { $arrayElemAt: ['$cliente.ape_pat', 0] },
                ape_mat_cliente: { $arrayElemAt: ['$cliente.ape_mat', 0] },
                fecha_creacion: '$pedidosTomados.fecha_creacion',
                fecha_entrega: '$pedidosTomados.fecha_entrega',
                comentarios: '$pedidosTomados.comentarios',
                total: '$pedidosTomados.total',
                anticipo: '$pedidosTomados.anticipo',
            })
        .group({
            _id: '$pedidosTomados._id',
            pedido: {
                $push: {
                    num_pedido: '$num_pedido',
                    status: '$status',
                    fecha_creacion: '$fecha_creacion',
                    fecha_entrega: '$fecha_entrega',
                    comentarios: '$comentarios',
                    cliente: {
                        $concat: ['$nombre_cliente', ' ', '$ape_pat_cliente', ' ', '$ape_mat_cliente']
                    },
                    anticipo: '$anticipo',
                    total: '$total',

                }
            },

        })
        .exec(function (err, pedidos) {
            if (err) {
                console.log(err);
                return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un error al cargar los pedidos' })
            }
            if (pedidos.length > 0) {
                return res.json(pedidos);
            } else {
                return res.status(422).send({ titulo: 'No existen pedidos', detalles: 'El usuario no cuenta con ningun pedido realizado' })
            }

        })
}
exports.crearNotificacion = function (req, res) {
    var hoy = new Date();
    hoy = momento().format('YYYY-MM-DD');
    notificacion = new Notificacion({
        titulo: req.body.titulo,
        mensaje: req.body.mensaje,
        fecha: hoy,
        usuario: req.body.usuario,
        num_pedido: req.body.num_pedido,
        fecha_pedido: req.body.fecha_pedido
    });
    notificacion.save(function (err, notificacion) {
        if (err) {
            console.log(err);
            return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un error al mandar las notificaciones a los empleados' })
        }
        return res.json({ titulo: 'Notificacion creada con exito' });
    })
}
exports.obtenerFotografos = function (req, res) {
    Usuario.find({ rol: 0, rol_sec: 1 }).exec(function (err, fotografosEncontrados) {
        if (err) {
            return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un error al cargar a los fotografos' })
        }
        return res.json(fotografosEncontrados);
    })
}
exports.obtenerFotografo = function (req,res){
    Usuario.findById(req.params.id).exec(function(err, fotografo){
        if(err){
            return res.status(422).send({titulo:'Error', detalles:'No se encontro al fotografo'})
        }
        return res.json(fotografo);
    })
}
exports.obtenerNotificaciones = function (req, res) {
    var fecha = new Date(req.params.fecha);
    Notificacion.find({ usuario: req.params.id, fecha: fecha }).exec(function (err, notificaciones) {
        if (err) {
            return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un error al cargar a las notificaciones' })
        }
        return res.json(notificaciones);
    })
}






exports.fotografoMiddleware = function (req, res) {
    //no es fotografo
    if (res.locals.usuario.rol !== 0 && res.locals.rol_sec !== 1) {
        return res.status(422).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para crear un pedido' })

    }
}
exports.recepcionistaMiddleware = function (req, res, next) {
    //no es recepcionista
    if (res.locals.usuario.rol == 0 && res.locals.usuario.rol_sec == 2) {
        next();
    } else {
        return res.status(422).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para crear un pedido' })

    }
}
