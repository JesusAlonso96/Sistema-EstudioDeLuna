const express = require('express'),
    mongoose = require('mongoose'),
    config = require('./configuracion/dev'),
    app = express(),
    bodyParser = require('body-parser'),
    servidor = require('http').createServer(app),
    io = require('socket.io')(servidor),
    rutasUsuario = require('./rutas/usuario'),
    rutasEstados = require('./rutas/estados'),
    rutasProducto = require('./rutas/productos'),
    rutasEmpleado = require('./rutas/empleado'),
    rutasCliente = require('./rutas/cliente'),
    Asistencia = require('./modelos/asistencia'),
    Usuario = require('./modelos/usuario'),
    Municipio = require('./modelos/municipio');

    
//Conexion a la base de datos
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.DB_URL, { useNewUrlParser: true });


//Inicializando el servidor
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/v1/usuarios', rutasUsuario);
app.use('/api/v1/empleados', rutasEmpleado);
app.use('/api/v1/estados', rutasEstados);
app.use('/api/v1/productos', rutasProducto);
app.use('/api/v1/clientes', rutasCliente);

const PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
    console.log("servidor funcionando...");
});