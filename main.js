"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
const DAOTasks = require("./DAOTasks");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUser = new DAOUsers(pool);
let daoTask = new DAOTasks(pool);

// Definición de las funciones callback
// Uso de los métodos de las clases DAOUsers y DAOTasks
daoUser.isUserCorrect("ejemplo@ucm.es", "1234", cb_isUserCorrect);
daoUser.getUserImageName("ejemplo@ucm.es", cb_getUserImageName);
daoTask.getAllTasks("ejemplo@ucm.es",cb_getAllTasks);
daoTask.insertTask("ejemplo@ucm.es", {text: "ejemplo insert", done: 0, tags: ["SQL","Insercion"] },cb_insertTask);
daoTask.markTaskDone(2,cb_maskTaskDone);
daoTask.deleteCompleted("ejemplo@ucm.es",cb_deleteCompleted);

function cb_isUserCorrect(err, result){
   if (err) {
       console.log(err.message);
   } else if (result) {
       console.log("Usuario y contraseña correctos");
   } else {
       console.log("Usuario y/o contraseña incorrectos");
   }
}

function cb_getUserImageName(err, result){
    if (err) {
        console.log(err.message);
    } else {
        console.log(result);
    }
}

function cb_getAllTasks(err, result){
    if (err) {
        console.log(err.message);
    } else {
        console.log(result);
    }
}

function cb_insertTask(err){
    if (err) {
        console.log(err.message);
    
    } else {
        console.log("Tarea insertada con exito");
    }
}

function cb_maskTaskDone(err){
    if (err) {
        console.log(err.message);
    } else {
        console.log("Tareas marcadas como finalizadas con exito");
    }
}

function cb_deleteCompleted(err){
    if (err) {
        console.log(err.message);
    } else {
        console.log("Tareas finalizadas eliminadas con exito");
    }
}
