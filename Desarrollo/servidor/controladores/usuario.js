const Usuario = require('../modelos/usuario'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    Asistencia = require('../modelos/asistencia'),
    Pedido = require('../modelos/pedido'),
    Producto = require('../modelos/producto'),
    Familia = require('../modelos/familia'),
    momento = require('moment'),
    config = require('../configuracion/dev');

exports.login = function (req, res) {
    const { username, contrasena } = req.body;
    Usuario.findOne({ username: username }, function (err, usuarioEncontrado) {
        if (err) {
            return res.status(422).send({ titulo: 'Error', detalles: 'Error desconocido, intentalo de nuevo mas tarde' });
        }
        if (!usuarioEncontrado) {
            return res.status(422).send({ titulo: 'Usuario no encontrado', detalles: 'No existe un usuario con estos datos' });
        } else {
            if (usuarioEncontrado.activo == 0) {
                return res.status(422).send({ titulo: 'Usuario no encontrado', detalles: 'No existe un usuario con estos datos' });
            }
            if (usuarioEncontrado.verificarContrasena(contrasena)) {
                const token = jwt.sign({
                    id: usuarioEncontrado._id,
                    nombre: usuarioEncontrado.nombre,
                    rol: usuarioEncontrado.rol,
                    rol_sec: usuarioEncontrado.rol_sec
                }, config.SECRET, { expiresIn: '8h' });
                return res.json(token);
            } else {
                return res.status(422).send({ titulo: 'Datos incorrectos', detalles: 'Correo electronico o contraseña erroneos' })
            }
        }
    })
}
exports.crearAsistencia = function (req, res) {
    var hoy = new Date();
    hoy = momento(hoy).format('YYYY-MM-DD');
    asistencia = new Asistencia({
        fecha: hoy,
        asistencia: true
    })
    asistencia.save();
    Usuario.updateOne({ _id: req.params.id }, {
        $push: {
            asistencia: asistencia
        }
    }).exec(function (err, exito) {
        if (err) {
            return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo crear la asistencia' });
        }
        return res.json(exito);
    })
}
exports.obtenerUsuario = function (req, res) {
    Usuario.findById(req.params.id).exec(function (err, usuarioEncontrado) {
        if (err) {
            console.log(err);
            return res.status(422).send({ titulo: 'Error', detalles: 'No se encontro el usuario solicitado' });
        }
        return res.json(usuarioEncontrado);

    })
}
exports.agregarProducto = function (req, res) {
    const producto = new Producto(req.body);
    producto.save(function (err, guardado) {
        if (err) {
            console.log(err)
            return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo agregar el producto' });
        } else {
            Familia.findOneAndUpdate({ _id: req.body.familia._id }, {
                $push: {
                    productos: guardado
                }
            })
                .exec(function (err, actualizada) {
                    if (err) {
                        console.log(err)
                        return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo agregar el producto' });
                    }
                    console.log(actualizada);
                })
            return res.json(guardado);
        }
    })
}
exports.eliminarProducto = function (req, res) {
    Producto.findOneAndUpdate({ _id: req.params.id }, {
        activo: 0
    }).exec(function (err, eliminado) {
        if (err) {
            return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo eliminar el producto' });
        }
        return res.json(eliminado)
    })
}
exports.actualizarProducto = function (req, res) {
    Producto.findOneAndUpdate({ _id: req.body._id }, {
        nombre: req.body.nombre,
        num_fotos: req.body.num_fotos,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        b_n: req.body.b_n,
        c_r: req.body.c_r,
        c_ad: req.body.c_ad,
        ancho: req.body.ancho,
        alto: req.body.alto,
        caracteristicas: req.body.caracteristicas
    })
        .exec(function (err, actualizado) {
            if (err) {
                return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo actualizar el producto' });
            }
            console.log(actualizado);
            return res.json(actualizado);
        })
}
exports.agregarFamilia = function (req, res) {
    const familia = new Familia(req.body);
    Familia.findOne({ nombre: familia.nombre })
        .exec(function (err, familiaEncontrada) {
            if (err) {
                return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo agregar la familia' });
            }
            else if (familiaEncontrada) {
                return res.status(422).send({ titulo: '', detalles: 'Ya existe una familia con este nombre', tipo: 2 })
            }
            else {
                familia.save(function (err, guardado) {
                    if (err) {
                        console.log(err)
                        return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo agregar la familia' });
                    }
                    return res.json(guardado);
                })
            }
        })
}
exports.eliminarFamilia = function (req, res) {
    Familia.update({ _id: req.params.id }, {
        activa: 0
    }).exec(function (err, eliminada) {
        if (err) {
            return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo eliminar la familia' })
        }
        return res.json(eliminada);
    })
}
exports.obtenerUsuarios = function (req, res) {
    Usuario.find({ activo: 1 }, { contrasena: 0 })
        .exec(function (err, usuariosEncontrados) {
            if (err) return res.status(422).send({ titulo: 'Error', detalles: 'No se pudieron obtener los usuarios' });
            return res.json(usuariosEncontrados);
        })
}
exports.registrarUsuario = function (req, res) {
    const usuario = new Usuario(req.body);
    Usuario.findOne({ username: req.body.username })
        .exec(function (err, usuarioEncontrado) {
            if (err) return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo registrar el usuario' });
            if (usuarioEncontrado) {
                return res.status(422).send({ titulo: 'Nombre de usuario repetido', detalles: 'Ya existe un usuario registrado' });
            } else {
                usuario.save(function (err, usuarioRegistrado) {
                    if (err) return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo registrar el usuario' });
                    return res.json({ titulo: 'Usuario registrado', detalles: 'Registro completado exitosamente' });
                })
            }
        })

}
exports.editarUsuario = function (req, res) {
    Usuario.findByIdAndUpdate(req.body._id, {
        nombre: req.body.nombre,
        ape_pat: req.body.ape_pat,
        ape_mat: req.body.ape_mat,
        username: req.body.username,
        email: req.body.email,
        telefono: req.body.telefono
    })
        .exec(function (err, actualizado) {
            if (err) return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo actualizar el usuario' });
            return res.json({ titulo: 'Usuario actualizado', detalles: 'Los datos fueron actualizados correctamente' });
        })
}
exports.eliminarUsuario = function (req, res) {
    Usuario.findByIdAndUpdate(req.params.id, {
        activo: 0
    })
        .exec(function (err, usuarioEliminado) {
            if (err) return res.status(422).send({ titulo: 'Error', detalles: 'No se pudo eliminar el usuario' });
            return res.json({ titulo: 'Usuario elimnado', detalles: 'Usuario eliminado exitosamente' });
        })
}
exports.autenticacionMiddleware = function (req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        const usuario = parseToken(token);
        Usuario.findById(usuario.id, function (err, usuarioEncontrado) {
            if (usuarioEncontrado) {
                res.locals.usuario = usuarioEncontrado;
                next();
            } else {
                return res.status(422).send({ titulo: 'No autorizado', detalles: 'Necesitar iniciar sesion para tener acceso' })
            }
        })
    }
}
exports.adminOSupervisorMiddleware = function (req, res, next) {
    if ((res.locals.usuario.rol == 2 && res.locals.usuario.rol_sec == 0) || (res.locals.usuario.rol == 1 && res.locals.usuario.rol_sec == 0)) {
        next();
    } else {
        return res.status(422).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })

    }
}
exports.adminOSupervisorORecepcionistaMiddleware = function (req, res, next) {
    if ((res.locals.usuario.rol == 2 && res.locals.usuario.rol_sec == 0) || (res.locals.usuario.rol == 1 && res.locals.usuario.rol_sec == 0) || (res.locals.usuario.rol == 0 && res.locals.usuario.rol_sec == 2)) {
        next();
    } else {
        return res.status(422).send({ titulo: 'No autorizado', detalles: 'No tienes permisos para realizar esta accion' })

    }
}
function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}