var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var persona = new Schema({

    "nombre": String,
    "apellido": String,
    "email": String,
    "tel": Number,
    "pais": String,
    "ciudad": String,
    "direccion": String,
    "fechaInteraccion": String,
    "instagram": String,
    "facebook": String,
    "linkedin": String,
    "twitter": String,
    "estado": String
});

//exportamos el modulo que creamos aquí
module.exports = mongoose.model('persona', persona);