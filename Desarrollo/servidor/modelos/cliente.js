const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nombre: { type: String, required: true },
    username: { type: String, required: false },
    ape_pat: { type: String, required: true },
    ape_mat: { type: String, required: true },
    email: { type: String, required: false },
    telefono: { type: Number, required: false },
    contrasena: { type: String, required: true },
    razonSocial: { type: String, required: false },
    rfc: { type: String, required: false },//en caso de querer factura
    direccion: { type: String, required: true },
    colonia: { type: String, required: true },
    municipio: { type: String, required: true },
    estado: { type: String, required: true },
    cp: { type: Number, required: true },
    num_ext: { type: Number, required: true },
    num_int: { type: Number, required: false },
    pedidos: [{ type: Schema.Types.ObjectId, ref: 'Pedido' }],
    fecha_registro: { type: Date, required: true }

});
//funcion para verificar la contrasena encriptada
clienteSchema.methods.verificarContrasena = function (contrasena) {
    return bcrypt.compareSync(contrasena, this.contrasena);
}
//funcion para encriptar contrasena
clienteSchema.pre('save', function (next) {
    const usuario = this;
    //generar contrasena aleatoria
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(usuario.contrasena, salt, function (err, hash) {
            usuario.contrasena = hash;
            next();
        })
    })
})

module.exports = mongoose.model('Cliente', clienteSchema);