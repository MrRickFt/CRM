var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cliente = express();
var mongoose = require("mongoose"); //Manejar BD en MongoDB
var Persona = require("./models/persona"); //Modelo de la base de datos
const persona = require("./models/persona");
var Historico = require("./models/historico"); //Modelo de historico
var Usuario = require("./models/usuario"); //Modelo de usuarios
var Tarea = require("./models/Tareas"); //importamos nuestro modelo de la base de datos donde posteriormente vamos a insertar

mongoose
  .connect("mongodb+srv://root:1234@cluster0.gsqtf.mongodb.net/CRM")
  .then(function (db) {
    console.log("Conectado a la Base de Datos");
  })
  .catch(function (err) {
    console.log(err);
  });

//Configuraciones
cliente.set("views", path.join(__dirname, "views")); // las vistas o los html van a estar en la carpeta views
cliente.set("view engine", "ejs"); //le decimos a express que el gestor de plantillas va a ser ejs
cliente.use(bodyParser.urlencoded({ extended: true })); // peticiones con url muy larga

cliente.use(express.static(__dirname + "/views/estilos")); //donde van a estar lo archivos estáticos

cliente.get("/nuevoCliente", function (request, response) {
  response.render("crearCliente", {});
});

cliente.get("/historico/:id", async function (request, response) {
  var historicos = await Historico.find({ idCliente: request.params.id });
  console.log(historicos);
  response.render("historico", {
    historico: historicos,
  });
});
// cliente.get("/inicio", function (request, response) {
//   response.render("index", {});
// });

// NUEVO
cliente.get("/login", function (request, response) {
  response.render("login", { error: false, correo: "", register: false });
});

// NUEVO
cliente.post('/login', async function (request, response) {
  var usuario = await Usuario.findOne({ correo: request.body.correo, contrasena: request.body.pass });
  if (usuario) {
      response.redirect('/inicio')
  }
  else {
      response.render('login', { error: true, correo: request.body.correo, register:false });
  }
})

// NUEVO
cliente.post('/registro', async function (request, response) {
  var usuario = new Usuario(request.body);
  await usuario.save();
  response.render('login', { error: false, correo: request.body.correo, register:true });
})


//Enrutado de la pagina de busqueda
cliente.get("/buscar", function (request, response) {
  response.render("buscar", {});
});

//TIENE CAMBIOS
cliente.get("/modificaCliente/:id", async function (request, response) {
  console.log(request.params.id);
  var id = request.params.id;
  var personaEncontrada = await Persona.findById(id);
  var usuarios = await Usuario.find();
  console.log(personaEncontrada);
  response.render("modificaCliente", {
    personaEncontrada: personaEncontrada,
    usuarios: usuarios,
  });
});

cliente.post("/guardarNuevoCliente", async function (request, response) {
  console.log(request.body);
  var persona = new Persona(request.body);
  await persona.save();
  response.render("crearCliente", {
    body: request.body,
  });
});
//TIENE CAMBIOS
cliente.post(
  '/guardarModCliente/:id', async function (request, response) {
      console.log(request.body);
      var id = request.params.id;
      var personaEncontrada = await Persona.findById(id);
      console.log(personaEncontrada);
      if (personaEncontrada.estado != request.body.estado) {
          var historico = new Historico({
              fecha: new Date(),
              usuario: request.body.asesor,
              comentario: request.body.comentario,
              descripcion: "Modificación de " + personaEncontrada.estado + " a " + request.body.estado,
              idCliente: personaEncontrada.id
          });

          await historico.save();
          console.log(historico);
      }
      personaEncontrada.nombre = (request.body.nombre) ? request.body.nombre : personaEncontrada.nombre;
      personaEncontrada.apellido = (request.body.apellido) ? request.body.apellido : personaEncontrada.apellido;
      personaEncontrada.email = (request.body.email) ? request.body.email : personaEncontrada.email;
      personaEncontrada.tel = (request.body.tel) ? request.body.tel : personaEncontrada.tel;
      personaEncontrada.pais = (request.body.pais) ? request.body.pais : personaEncontrada.pais;
      personaEncontrada.ciudad = (request.body.ciudad) ? request.body.ciudad : personaEncontrada.ciudad;
      personaEncontrada.fechaInteraccion = (request.body.fechaInteraccion) ? request.body.fechaInteraccion : personaEncontrada.fechaInteraccion;
      personaEncontrada.direccion = (request.body.direccion) ? request.body.direccion : personaEncontrada.direccion;
      personaEncontrada.instagram = (request.body.instagram) ? request.body.instagram : personaEncontrada.instagram;
      personaEncontrada.facebook = (request.body.facebook) ? request.body.facebook : personaEncontrada.facebook;
      personaEncontrada.linkedin = (request.body.linkedin) ? request.body.linkedin : personaEncontrada.linkedin;
      personaEncontrada.twitter = (request.body.twitter) ? request.body.twitter : personaEncontrada.twitter;
      personaEncontrada.estado = (request.body.estado) ? request.body.estado : personaEncontrada.estado;

      await personaEncontrada.save();
      response.redirect('/respuestaEditar/' + personaEncontrada.id);
  }

)

///carlos
function filtro() {
  return listaCliente.filter(
    (nombre) => cliente.nombre.toLowerCase().indexOf(buscar.toLowerCase()) > -1
  );
}

const getfiltro = async () => {
  const res = await axios.get(URL + "/" + texto);
  setListaLibro(res.data);
};

const buscando = () => {
  setListaCliente(filtro());
};

const getLibros = async () => {
  const res = await axios.get(URL);
  setListaCliente(res.data);
};
////carlos
cliente.get("/respuestaEditar/:id", function (request, response) {
  console.log(request.params.id);
  response.render("resultadoModificaCliente", {
    id: request.params.id,
  });
});

/*William Mora*/
cliente.get("/clientes", async function (req, res) {
  console.log(
    "----------------- Estas en la pagina de clientes ----------------------"
  );
  var documentos = await Persona.find();
  res.render("clientes", {
    personas: documentos,
  });
});

cliente.get("/eliminar/:id", async function (req, res) {
  var id = req.params.id;
  console.log("Eliminando:" + id);

  var persona = await Persona.findById(id);
  var historico = await Historico.deleteMany({idCliente: id});
  await persona.remove();
  res.redirect("/clientes");
});


//Rutas de tareas
cliente.get("/nuevaTarea", async function (req, res) {
  var usuarios = await Usuario.find();
  var personas = await Persona.find();
  res.render("agregarTarea.ejs", {
    usuarios : usuarios,
    personas : personas
  }); //no es necesario aclarar la extensión ni donde está ubicado porque en las lineas 22 y 21 ya está
});

cliente.get("/tareas", async function (req, res) {
  var ta = await Tarea.find();

  res.render("tareas", {
    tareas: ta,
  }); //no es necesario aclarar la extensión ni donde está ubicado porque en las lineas 22 y 21 ya está
});

//Boton de modificar tarea *selección*
cliente.get("/modificarTarea/:id", async function (req, res) {
  var id_enviado = req.params.id;

  var doc = await Tarea.findById(id_enviado);
  var usuarios = await Usuario.find();
  var personas = await Persona.find();
  console.log(doc);

  res.render("modificarTarea", {
    tarea: doc,
    usuarios : usuarios,
    personas : personas
  });
});

//Actualizando tarea
cliente.post("/actualizarTarea/:id", async function (request, res) {
  var datos = request.body;

  console.log("Este es el ID: " + request.params.id);

  var tarea_doc = await Tarea.findById(request.params.id);
  tarea_doc.fecha = datos.fecha;
  tarea_doc.cliente = datos.cliente;
  tarea_doc.observacion = datos.observacion;
  tarea_doc.asesor = datos.asesor;
  tarea_doc.estado = datos.estado;
  var fe = tarea_doc.fecha.length;
  var cl = tarea_doc.cliente.length;
  var ob = tarea_doc.observacion.length;
  var ase = tarea_doc.asesor.length;
  var est = tarea_doc.asesor;

  console.log("fecha: " + fe + " cliente: " + cl);

  if (fe == 0 || cl == 0 || ob == 0 || ase == 0 || est == "") {
    console.log(
      "No se pueden ingresar datos en la DB porque faltan campos por llenar"
    );
  } else {
    await tarea_doc.save();
    console.log("imprimiendo el estado : " + est);
    console.log("datos guardados correctamente");
    res.redirect("/tareas");
  }
});

//Enviando una tarea de un formularo por el metodo POST
cliente.post("/nuevaTarea", async function (req, res) {
  var t = new Tarea(req.body);
  await t.save(); //inserta en la base de datos
  res.redirect("/tareas"); //redirecciona al /home
});

//Eliminando por ID
cliente.get("/eliminarTarea/:id", async function (req, res) {
  var id = req.params.id; //capturando el id que está seleccionando el usuario en el cliente para modificar
  console.log("El id que estamos eliminando es: " + id);

  //forma 1
  var tarea = await Tarea.findById(id); //buscando por id
  await tarea.remove();
  res.redirect("/tareas"); //redirecciona al cliente al home mientras inserta
});



// Pagina Principal
cliente.get("/inicio", async function (request, response) {
  // DESDE AQUI EMPIEZA LAS GRAFICAS
  var numInter = 0;
  var numPro = 0;
  var numClienR = 0;
  var numClien = 0;
  var numNoClien = 0;
  var seg = await persona.find({}, { estado: 1, _id: 0 });
  console.log(seg);
  for (let i = 0; i < seg.length; i++) {
    if (seg[i].estado == "Interesado") {
      numInter += 1;
    } else if (seg[i].estado == "Presupuesto enviado") {
      numPro += 1;
    } else if (seg[i].estado == "Cliente") {
      numClien += 1;
    } else if (seg[i].estado == "Cliente recurrente") {
      numClienR += 1;
    } else if (seg[i].estado == "No Cliente") {
      numNoClien += 1;
    }
  }
  console.log(
    numInter +
      " " +
      numPro +
      " " +
      numClien +
      " " +
      numClienR +
      " " +
      numNoClien
  );
  response.render("index", {
    numInter,
    numPro,
    numClienR,
    numClien,
    numNoClien,
  });
});
//AQUI TERMINA IVAN N

/*---------------------------------------------------------------------*/
cliente.get('/', function (req, res) {
  res.redirect('/login');
});
var port = 3000;

/*---------------------------------------------------------------------*/
// metodos http: GET, POST, PUT, DELETE, OPTIONS

cliente.listen(port, function () {
  console.log("Funciono!");
});
