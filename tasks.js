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

/*
function createTask(texto){
    return tasks.some(aux => );
}
*/

console.log(countDone(listaTareas));
