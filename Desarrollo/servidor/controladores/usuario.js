const Usuario = require('../modelos/usuario'),
    jwt = require('jsonwebtoken'),
    config = require('../configuracion/dev');

exports.login = function (req, res) {
    const { username, contrasena } = req.body;
    console.log(username);
    Usuario.findOne({ username:username }, function (err, usuarioEncontrado) {
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
                }, config.SECRET,{expiresIn:'8h'});
                return res.json(token);
            } else {
                return res.status(422).send({titulo: 'Datos incorrectos', detalles: 'Correo electronico o contraseña erroneos'})
            }
        }
    })
}