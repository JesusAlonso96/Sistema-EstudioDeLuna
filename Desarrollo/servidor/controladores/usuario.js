const Usuario = require('../modelos/usuario'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    Asistencia = require('../modelos/asistencia'),
    Pedido = require('../modelos/pedido'),
    momento = require('moment'),
    config = require('../configuracion/dev');

exports.login = function (req, res) {
    const { username, contrasena } = req.body;
    Usuario.findOne({ username: username }, function (err, usuarioEncontrado) {
        if (err) {
            return res.status(422).send({ title: 'Error', details: 'Error desconocido, intentalo de nuevo mas tarde' });
        }
        if (!usuarioEncontrado) {
            return res.status(422).send({ titulo: 'Usuario no encontrado', detalles: 'No existe un usuario con estos datos' });
        } else {
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
    }).exec(function(err,exito){
        if(err){
            return res.status(422).send({titulo:'Error',detalles:'No se pudo crear la asistencia'});
        }
        return res.json(exito);
    })
}
exports.obtenerUsuario = function(req,res){
    Usuario.findById(req.params.id).exec(function(err,usuarioEncontrado){
        if (err) {
            console.log(err);
            return res.status(422).send({ title: 'Error', details: 'No se encontro el usuario solicitado' });
        }
        return res.json(usuarioEncontrado);

    })
}
exports.autenticacionMiddleware = function(req,res,next){
    const token = req.headers.authorization;
    if(token){
        const usuario = parseToken(token);
        Usuario.findById(usuario.id, function(err, usuarioEncontrado){
            if(usuarioEncontrado){
                res.locals.usuario = usuarioEncontrado;
                next();
            } else {
                return res.status(422).send({titulo:'No autorizado', detalles:'Necesitar iniciar sesion para tener acceso'})
            }
        })
    }
}



function parseToken(token){
    return jwt.verify(token.split(' ')[1], config.SECRET);
}