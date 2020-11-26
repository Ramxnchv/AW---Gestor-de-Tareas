"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
//const DAOTasks = require("./DAOTasks");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUser = new DAOUsers(pool);
// let daoTask = new DAOTasks(pool);

// Definición de las funciones callback
// Uso de los métodos de las clases DAOUsers y DAOTasks
daoUser.isUserCorrect("ejemplo@ucm.es", "1234", cb_isUserCorrect);
daoUser.getUserImageName("ejemplo@ucm.es", cb_getUserImageName);


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
