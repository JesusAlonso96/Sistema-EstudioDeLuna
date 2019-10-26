const Estado = require('../modelos/estado'),
    Municipio = require('../modelos/municipio');

exports.obtenerEstados = function (req, res) {
    Estado.find()
        .exec(function (err, estados) {
            if (err) {
                return res.status(422).send({ title: 'Error', details: 'No se pudieron cargar los estados' });
            }
            return res.json(estados);
        })
}
exports.obtenerMunicipios = function (req, res) {
    console.log(req.params.id);
    Municipio.find({estado: req.params.id})
             .exec(function(err, municipios){
                if (err) {
                    return res.status(422).send({ title: 'Error', details: 'No se pudieron cargar los municipios' });
                }
                console.log(municipios);
                return res.json(municipios);
             })
}