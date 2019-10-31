const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    familia: { type:Schema.Types.ObjectId, ref:'Familia'},
    num_fotos: { type: Number, required: false },
    precio: { type: Number, required: true },
    b_n: { type: Boolean },
    c_r: { type: Boolean },
    c_ad: { type: Boolean }
});



module.exports = mongoose.model('Producto', productoSchema);