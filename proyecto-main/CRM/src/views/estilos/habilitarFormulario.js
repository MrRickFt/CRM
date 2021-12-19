
var boton = $('#ModTodo');
var boton1 = $('#ModEst');
var botonHist = $('#histCliente');
boton.on('click', function () {
    $("input[type=text]").show();
    $("input[type=text]").prop('disabled', false);
    $("#estado").show();
    $("#guardar").show();
    $("#asesor").show();
    $("#comentario").show();
    $("input[type=date]").show();

})

boton1.on('click', function () {
    $("input[type=text]").hide();
    $("input[type=text]").prop('disabled', true);
    $("#estado").show();
    $("#nombre").show();
    $("#apellido").show();
    $("#guardar").show();
    $("#asesor").show();
    $("#comentario").show();
    $("input[type=date]").hide();
})

botonHist.on('click', function () {
    var id = $("#llave").val();
    window.location.href = 'http://localhost:3000/historico/'+id;
})