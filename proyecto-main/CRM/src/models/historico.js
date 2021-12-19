var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var historico = new Schema({

    "fecha": Date,
    "usuario": String,
    "comentario" : String,
    "descripcion": String,
    "idCliente" : String
},{collection:'historico'});

//exportamos el modulo que creamos aquí
module.exports = mongoose.model('historico', historico);