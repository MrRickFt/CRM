var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Tarea = new Schema({
    fecha : String,
    cliente : String,
    observacion : String,
    asesor : String,
    estado : {
        type: String,
        default: "Pendiente"
    }
    
});

//Exportamos el modulo que creamos llamado "Tarea", con el nombre 'tareas'
module.exports = mongoose.model('tareas', Tarea);