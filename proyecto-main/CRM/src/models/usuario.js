//NUEVO
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var usuario = new Schema({

    "nombre": String,
    "celular": String,
    "cargo": String,
    "correo": String,
    "contrasena": String
},{collection:'usuario'});

//exportamos el modulo que creamos aquí
module.exports = mongoose.model('usuario', usuario);