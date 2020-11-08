"use strict"

let listaTareas = [
    { text: "Preparar práctica AW", tags: ["AW", "practica"] },
    { text: "Mirar fechas congreso", done: true, tags: [] },
    { text: "Ir al supermercado", tags: ["personal"] },
    { text: "Mudanza", done: false, tags: ["personal"] },
    ];


function getToDoTasks(tasks){
    return (tasks.filter(aux => aux.done === undefined || aux.done === false)).map(aux => aux.text);
}

function findByTag(tasks, tag){
    return tasks.filter(aux => aux.tags.some(aux => aux === tag));
}

function findByTags(tasks, tags){
    return tasks.filter(aux => aux.tags.some(tag => tags.some(t => t === tag)));
}

function countDone(tasks){
    return (tasks.filter(aux => aux.done === true)).reduce((ac,aux) => ac + 1 , 0);
}

function createTask(texto){

    var palabras = texto.split(" ").filter(aux => aux !== "");
    var resultado = "{ text: '";
    var tags = false;

    for(let x of palabras){
        if(!x.startsWith("@"))
            resultado += x + " ";
    }

    resultado = resultado.substring(0, resultado.length - 1);
    resultado += "', tags: [ "

    for(let x of palabras){
        if(x.startsWith("@")){
            resultado += "'" + x.substring(1)+"', ";
            tags = true;
        }
    }
    
    if(tags){
        resultado = resultado.substring(0, resultado.length - 2);
    }
    
    resultado += " ] }"
    return resultado;
}

console.log(countDone(listaTareas));
