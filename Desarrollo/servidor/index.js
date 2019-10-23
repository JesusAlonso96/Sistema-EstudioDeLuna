const express = require('express'),
      mongoose = require('mongoose'),
      config = require('./configuracion/dev'),
      bodyParser = require('body-parser'),
      rutasUsuario = require('./rutas/usuario'),
      Usuario = require('./modelos/usuario');

      
//Conexion a la base de datos
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.DB_URL,{ useNewUrlParser: true });


//Inicializando el servidor
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

/*const usuario = new Usuario( {
    nombre:"Alonso",
    username:"alonso96",
    ape_pat:"Castro",
    ape_mat:"Lopez",
    email: "jalonso.cl96@gmail.com",
    telefono:6871747211,
    contrasena:"hola",
    rol:0,
    rol_sec:1
})
usuario.save();
*/
//Endpoints
app.use('/api/v1/usuarios',rutasUsuario);


const PORT = process.env.PORT || 3002;
app.listen(PORT, function(){
    console.log("servidor funcionando...");
});