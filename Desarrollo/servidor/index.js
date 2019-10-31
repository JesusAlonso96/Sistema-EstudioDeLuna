const express = require('express'),
    mongoose = require('mongoose'),
    config = require('./configuracion/dev'),
    bodyParser = require('body-parser'),
    rutasUsuario = require('./rutas/usuario'),
    rutasEstados = require('./rutas/estados'),
    rutasProducto = require('./rutas/productos'),
    Usuario = require('./modelos/usuario'),
    Producto = require('./modelos/producto'),
    Municipio = require('./modelos/municipio');


//Conexion a la base de datos
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.DB_URL, { useNewUrlParser: true });


//Inicializando el servidor
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
prod = new Producto({
    nombre: 'Infantil',
    num_fotos: 12,
    precio: 100,
    familia: '5db730bfbecb90002031cce6',
    b_n: true,
    c_r: false,
    c_ad: false
})
prod.save();

prod.save();
prod = new Producto({
    nombre: 'Credencial rect',
    num_fotos: 12,
    precio: 110,
    familia: '5db730bfbecb90002031cce7',
    detalles: {
        b_n: true,
        c_r: true,
        c_ad: false
    }
})
prod.save();
prod = new Producto({
    nombre: 'Credencial rect',
    num_fotos: 14,
    precio: 120,
    familia: '5db730bfbecb90002031cce7',
    detalles: {
        b_n: true,
        c_r: true,
        c_ad: false
    }
})
prod.save();

const est = new Municipio( {
    nombre: "Malinaltepec",
    estado: '5db33328019cec161853ae84'
})
const est2 = new Municipio( {
    nombre: "Marquelia",
    estado: '5db33328019cec161853ae84'
})
const est3 = new Municipio( {
    nombre: "Mártir de Cuilapan",
    estado: '5db33328019cec161853ae84'
})
const est4 = new Municipio( {
    nombre: "Metlatónoc",
    estado: '5db33328019cec161853ae84'
})
const est5 = new Municipio( {
    nombre: "Mochitlán",
    estado: '5db33328019cec161853ae84'
})
const est6 = new Municipio( {
    nombre: "Olinalá",
    estado: '5db33328019cec161853ae84'
})
const est7 = new Municipio( {
    nombre: "Ometepec",
    estado: '5db33328019cec161853ae84'
})
const est8 = new Municipio( {
    nombre: "Pedro Ascencio Alquisiras",
    estado: '5db33328019cec161853ae84'
})
const est9 = new Municipio( {
    nombre: "Petatlán",
    estado: '5db33328019cec161853ae84'
})
const est10 = new Municipio( {
    nombre: "Pilcaya",
    estado: '5db33328019cec161853ae84'
})
const est11 = new Municipio( {
    nombre: "Pungarabato",
    estado: '5db33328019cec161853ae84'
})
const est12 = new Municipio( {
    nombre: "Quechultenango",
    estado: '5db33328019cec161853ae84'
})
const est13 = new Municipio( {
    nombre: "San Luis Acatlán",
    estado: '5db33328019cec161853ae84'
})
const est14 = new Municipio( {
    nombre: "San Marcos",
    estado: '5db33328019cec161853ae84'
})
const est15 = new Municipio( {
    nombre: "San Miguel Totolapan",
    estado: '5db33328019cec161853ae84'
})
const est16 = new Municipio( {
    nombre: "Taxco de Alarcón",
    estado: '5db33328019cec161853ae84'
})
const est17 = new Municipio( {
    nombre: "Tecoanapa",
    estado: '5db33328019cec161853ae84'
})
const est18 = new Municipio( {
    nombre: "Técpan de Galeana",
    estado: '5db33328019cec161853ae84'
})
const est19 = new Municipio( {
    nombre: "Teloloapan",
    estado: '5db33328019cec161853ae84'
})
const est20 = new Municipio( {
    nombre: "Tepecoacuilco de Trujano",
    estado: '5db33328019cec161853ae84'
})
const est21 = new Municipio( {
    nombre: "Tetipac",
    estado: '5db33328019cec161853ae84'
})
const est22 = new Municipio( {
    nombre: "Tixtla de Guerrero",
    estado: '5db33328019cec161853ae84'
})
const est23 = new Municipio( {
    nombre: "Tlacoachistlahuaca",
    estado: '5db33328019cec161853ae84'
})
const est24 = new Municipio( {
    nombre: "Tlacoapa",
    estado: '5db33328019cec161853ae84'
})
const est25 = new Municipio( {
    nombre: "Tlalchapa",
    estado: '5db33328019cec161853ae84'
})
const est26 = new Municipio( {
    nombre: "Tlalixtlaquilla de Maldanado",
    estado: '5db33328019cec161853ae84'
})
const est27 = new Municipio( {
    nombre: "Tlapa de Comonfort",
    estado: '5db33328019cec161853ae84'
})
const est28 = new Municipio( {
    nombre: "Tlapehuala",
    estado: '5db33328019cec161853ae84'
})
const est29 = new Municipio( {
    nombre: "Xalpatláhuac",
    estado: '5db33328019cec161853ae84'
})
const est30 = new Municipio( {
    nombre: "Xochihuehuetlán",
    estado: '5db33328019cec161853ae84'
})
const est31 = new Municipio( {
    nombre: "Xochistlahuaca",
    estado: '5db33328019cec161853ae84'
})
const est32 = new Municipio( {
    nombre: "Zapotitlán Tablas",
    estado: '5db33328019cec161853ae84'
})
const est33 = new Municipio( {
    nombre: "Zihuatanejo de Azueta",
    estado: '5db33328019cec161853ae84'
})
const est34 = new Municipio( {
    nombre: "Zirándaro de los Chávez",
    estado: '5db33328019cec161853ae84'
})
const est35 = new Municipio( {
    nombre: "Zitlala",
    estado: '5db33328019cec161853ae84'
})
const est36 = new Municipio( {
    nombre: "Huamuxtitlán",
    estado: '5db33328019cec161853ae84'
})
const est37 = new Municipio( {
    nombre: "Huitzuco de los Figueroa",
    estado: '5db33328019cec161853ae84'
})
const est38 = new Municipio( {
    nombre: "Iguala de la Independencia",
    estado: '5db33328019cec161853ae84'
})
const est39 = new Municipio( {
    nombre: "Igualapa",
    estado: '5db33328019cec161853ae84'
})
const est40 = new Municipio( {
    nombre: "Iliatenco",
    estado: '5db33328019cec161853ae84'
})
const est41 = new Municipio( {
    nombre: "Ixcateopan de Cuauhtémoc",
    estado: '5db33328019cec161853ae84'
})
const est42 = new Municipio( {
    nombre: "José Joaquín de Herrera",
    estado: '5db33328019cec161853ae84'
})
const est43 = new Municipio( {
    nombre: "Juan R. Escudero",
    estado: '5db33328019cec161853ae84'
})
const est44 = new Municipio( {
    nombre: "Juchitán",
    estado: '5db33328019cec161853ae84'
})
const est45 = new Municipio( {
    nombre: "La Unión de Isidoro Montes de Oca",
    estado: '5db33328019cec161853ae84'
})
const est46 = new Municipio( {
    nombre: "Leonardo Bravo",
    estado: '5db33328019cec161853ae84'
})
est.save();
est2.save();
est3.save();
est4.save();
est5.save();
est6.save();
est7.save();
est8.save();
est9.save();
est10.save();
est11.save();
est12.save();
est13.save();
est14.save();
est15.save();
est16.save();
est17.save();
est18.save();
est19.save();
est20.save();
est21.save();
est22.save();
est23.save();
est24.save();
est25.save();
est26.save();
est27.save();
est28.save();
est29.save();
est30.save();
est31.save();
est32.save();
est33.save();
est34.save();
est35.save();
/*est36.save();
est37.save();
est38.save();
est39.save();
est40.save();
est41.save();
est42.save();
est43.save();
est44.save();
est45.save();
est46.save();

*/



//Endpoints
app.use('/api/v1/usuarios', rutasUsuario);
app.use('/api/v1/estados', rutasEstados);
app.use('/api/v1/productos', rutasProducto);

const PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
    console.log("servidor funcionando...");
});