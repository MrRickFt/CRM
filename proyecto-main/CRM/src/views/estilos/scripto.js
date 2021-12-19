$(document).ready(function () {
  //Ejecutando funciones

  document
    .getElementById("btn__iniciar-sesion")
    .addEventListener("click", iniciarSesion);
  document
    .getElementById("btn__registrarse")
    .addEventListener("click", register);
  window.addEventListener("resize", anchoPage);

  //Declarando variables
  var formulario_login = document.querySelector(".formulario__login");
  var formulario_register = document.querySelector(".formulario__register");
  var contenedor_login_register = document.querySelector(
    ".contenedor__login-register"
  );
  var caja_trasera_login = document.querySelector(".caja__trasera-login");
  var caja_trasera_register = document.querySelector(".caja__trasera-register");

  //FUNCIONES

  function anchoPage() {
    if (window.innerWidth > 850) {
      caja_trasera_register.style.display = "block";
      caja_trasera_login.style.display = "block";
    } else {
      caja_trasera_register.style.display = "block";
      caja_trasera_register.style.opacity = "1";
      caja_trasera_login.style.display = "none";
      formulario_login.style.display = "block";
      contenedor_login_register.style.left = "0px";
      formulario_register.style.display = "none";
    }
  }

  anchoPage();

  function iniciarSesion() {
    if (window.innerWidth > 850) {
      formulario_login.style.display = "block";
      contenedor_login_register.style.left = "10px";
      formulario_register.style.display = "none";
      caja_trasera_register.style.opacity = "1";
      caja_trasera_login.style.opacity = "0";
    } else {
      formulario_login.style.display = "block";
      contenedor_login_register.style.left = "0px";
      formulario_register.style.display = "none";
      caja_trasera_register.style.display = "block";
      caja_trasera_login.style.display = "none";
    }
  }

  function register() {
    if (window.innerWidth > 850) {
      formulario_register.style.display = "block";
      contenedor_login_register.style.left = "410px";
      formulario_login.style.display = "none";
      caja_trasera_register.style.opacity = "0";
      caja_trasera_login.style.opacity = "1";
    } else {
      formulario_register.style.display = "block";
      contenedor_login_register.style.left = "0px";
      formulario_login.style.display = "none";
      caja_trasera_register.style.display = "none";
      caja_trasera_login.style.display = "block";
      caja_trasera_login.style.opacity = "1";
    }
  }
  //Ocultando div y Section

  var user = ["will@wmail.com", "emi@wmail.com"];
  var pass = ["1234", "5678"];
  
  $("#entrar").click(function () {
    var c = $("#correo").val();
    var p = $("#pass").val();
    

    if ((c == user[0] && p == pass[0]) || (c == user[1] && p == pass[1])) {
      ocultarymostrar(".contenedor__todo", ".cont_entrar");
    } else {
      $("#en").text("Por favor regístrarse");
    }
  });

  $("#regis").click(function () {
    
    var n = $("#nom").val();
    var c = $("#corre").val();
    var u = $("#usu").val();
    var t = $("#con").val();

    

    if(n == "" || c == "" || u == "" || t == ""){
        $("#enn").text("Por favor ingrese los datos solicitados");
    }else{
        ocultarymostrar(".contenedor__todo", ".contain_registro");
        $("#al").text("Felicidades " + n);
    }
    
  });

  $("#Cerrar").click(function(){
          ocultarymostrar(".cont_entrar",".contenedor__todo");
          $("#correo").val("");
      $("#pass").val("");
       
  });

  $("#fin").click(function(){
    ocultarymostrar(".contain_registro",".contenedor__todo");
    $("#nom").val("");
    $("#corre").val("");
    $("#usu").val("");
    $("#con").val("");
});

  function ocultarymostrar(a, b) {
    $(a).hide();
    $(b).show();
  }

  //Validando acceso
});