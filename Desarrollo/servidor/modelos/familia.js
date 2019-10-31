const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const familiaSchema = new Schema({
    nombre: { type: String, required: true }
});



module.exports = mongoose.model('Familia', familiaSchema);