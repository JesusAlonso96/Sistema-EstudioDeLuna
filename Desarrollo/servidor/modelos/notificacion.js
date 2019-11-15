const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const notificacionSchema = new Schema({
    titulo: { type: String, required: true },
    mensaje: { type: String, required: true },
    fecha: {type: Date, required:true},
    num_pedido: {type: Number},
    fecha_pedido: {type: Date},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}
});


module.exports = mongoose.model('Notificacion', notificacionSchema);