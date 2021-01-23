"use strict"

$(document).ready(function () {
    $("#text_nueva_tarea").on("change", function (event) {
        // Obtenemos valor actual
        let valor = $(this).val().trim();
        $("#mostrartask").text(valor).addClass("titulotaream");
        
    });
});

$(document).ready(function () {
    $("#boton_nueva_etiqueta").on("click", function (event) {
        let rep = false;
        if($("#text_nueva_etiqueta").val().trim() !== "" &&  $("#mostrartask").text().trim() !== ""){
            let nuevoTag = $(`<div>${$("#text_nueva_etiqueta").val()}</div>`).addClass("tagm");
            $(".tagm").each(function(i,el){
                if($(el).text() === nuevoTag.text()){
                    rep = true;
                }
            });
            if(!rep){
                $("#mostrartask").append(nuevoTag);
            }
            $("#text_nueva_etiqueta").val("");
        }   
    });
});

$(document).ready(function () {
    $("#mostrartask").on("click", ".tagm", function (event) {
        $(event.target).remove();
    });
});

$(document).ready(function () {
    $("#form_tarea button[type=submit]").on("click", function (event) {
        if($("#text_nueva_tarea").val() === ""){
            alert("El nombre de la tarea no puede ser vacío");
            event.preventDefault();
        }
        else{
            let input = $("#text_nueva_tarea").val() + " ";
            $(".tagm").each(function(i,el){
                input += `@${$(el).text()} `;   
            });
            $("#inputarea").val(`${input}`);
        }
    });
});


