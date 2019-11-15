const Cliente = require('../modelos/cliente')


exports.registrarCliente = function (req, res) {
    const {
        nombre,
        username,
        ape_pat,
        ape_mat,
        email,
        telefono,
        contrasena,
        razonSocial,
        rfc,
        direccion,
        colonia,
        municipio,
        estado,
        cp,
        num_ext,
        num_int,
        fecha_registro
    } = req.body;
    clienteNuevo = new Cliente({
        nombre: nombre,
        username: username,
        ape_pat: ape_pat,
        ape_mat: ape_mat,
        email: email,
        telefono: telefono,
        contrasena: contrasena,
        razonSocial: razonSocial,
        rfc: rfc,
        direccion: direccion,
        colonia: colonia,
        municipio: municipio,
        estado: estado,
        cp: cp,
        num_ext: num_ext,
        num_int: num_int,
        fecha_registro: fecha_registro
    })
    clienteNuevo.save(function (err, exito) {
        if (err) {
            console.log(err);
            return res.status(422).send({ titulo: 'No se pudo crear el registro' });
        }
        return res.json(exito);
    })
}
exports.obtenerClientes = function (req, res) {
    Cliente.find({},{_id:1,nombre:1,ape_mat:1,ape_pat:1,email:1})
        .exec(function (err, clientes) {
            if (err) return res.status(422).send({ titulo: 'No se pudieron obtener los clientes' });
            return res.json(clientes);
        })
}
exports.obtenerClienteNombreEmail = function(req,res){
    Cliente.findOne({nombre:req.params.nombre,email:req.params.email}).exec(function(err,cliente){
        if(err) return res.status(422).send({titulo:'Ocurrio un error al buscar al cliente'});
        return res.json(cliente);
    })
}