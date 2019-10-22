const express = require('express');
      

//Inicializando el servidor
const app = express();

const PORT = process.env.PORT || 3002;

app.listen(PORT, function(){
    console.log("servidor funcionando...");
});