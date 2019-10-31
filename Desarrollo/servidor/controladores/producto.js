const Familia = require('../modelos/familia'),
    Producto = require('../modelos/producto');

exports.obtenerFamilias = function (req, res) {
    Familia.find()
        .exec(function (err, familias) {
            if (err) {
                return res.status(422).send({ titulo: 'Error', detalles: 'No se pudieron cargar las familias' });

            }
            return res.json(familias);
        })
}
exports.obtenerProductos = function (req, res) {
    Producto.find({ familia: req.params.id })
        .exec(function (err, productosEncontrados) {
            if (err) {
                return res.status(422).send({ titulo: 'Error', detalles: 'No se pudieron cargar los productos de la familia' });
            }
            return res.json(productosEncontrados);
        })
}
exports.obtenerProductosPorCantidad = function (req, res) {
    Producto
        .aggregate()
        .lookup({
            from: "familias",
            localField: "familia",
            foreignField: "_id",
            as: "familia"
        })
        .match({
            "familia.nombre": req.params.nombre
        })
        .group({
            _id: "$num_fotos"
        })
        .sort({
            _id: 1
        })
        .exec(function (err, response) {
            if (err) {
                console.log(err);
            }
            res.json(response);
        })
}
exports.buscarProducto = function (req, res) {
    const { b_n, c_r, familia, num_fotos } = req.body;
    Producto.aggregate()
        .lookup({
            from: 'familias',
            localField: 'familia',
            foreignField: '_id',
            as: 'familia'
        })
        .match({
            'familia.nombre': familia,
            b_n: b_n,
            c_r: c_r,
            num_fotos: num_fotos
        })
        .project('-familia')
        .exec(function (err, productos) {
            if (err) {
                return res.status(422).send({ titulo: 'Error', detalles: 'Ocurrio un problema en el servidor' });
            }
            if (productos) {
                return res.json(productos);
            } else {
                return res.status(422).send({ titulo: 'Error', detalles: 'No existe un producto con estas especificaciones' });
            }
        })

}
