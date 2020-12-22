const config = require("./config");
const DAOTasks = require("./DAOTasks");
const DAOUsers = require("./DAOUsers");
const utils = require("./utils");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const sessionStore = new MySQLStore({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database });

// Crear un servidor Express.js
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOTasks
const daoT = new DAOTasks(pool);

// Crear una instancia de DAOUsers
const daoU = new DAOUsers(pool);

const utilidades = new utils();

const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const middlewareSession = session({
    saveUninitialized: false,
    secret: "tasks",
    resave: false,
    store: sessionStore
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(middlewareSession);


function isUserLogged(request, response, next){
    if (request.session.currentUser === undefined) {
        response.redirect("/login");
    } else {
        response.locals = { userEmail: request.session.currentUser };
        next();
    }
}

app.get("/tasks", isUserLogged, function(request, response) {
    daoT.getAllTasks(request.session.currentUser,function(err,taskList){
        if (err) {
            console.log(err.message);
        } else {
            response.render("tasks", { tasks: taskList});
        }
    });
});

app.get("/login", function (request, response) {
    
    response.render("login", { errorMsg: null });
            
});

app.post("/login", function (request, response) {
    daoU.isUserCorrect(request.body.correo,
        request.body.password, function (error, ok) {
            if (error) { // error de acceso a la base de datos
                response.status(500);
                response.render("login", { errorMsg: "Error interno de acceso a la base de datos" });
            }
            else if (ok) {
                request.session.currentUser = request.body.correo;
                response.redirect("/tasks");
            } 
            else {
                response.status(200);
                response.render("login", { errorMsg: "Dirección de correo y/o contraseña no válidos" });
            }
        }
    );
});


app.get("/logout", isUserLogged, function (request, response) {

    request.session.destroy();
    response.redirect("/login");
            
});

app.get("/imagenUsuario", isUserLogged, function (request, response) {
    daoU.getUserImageName(request.session.currentUser, function(err,img){
        if (err) {
            console.log(err.message);
        } 
        else {
            if(img === null){
                response.sendFile(path.join(__dirname, "public", "img", "NoPerfil.png"));
            }
            else{
                response.sendFile(path.join(__dirname, "profile_imgs", img));
            }
        }
    });
            
});


app.post("/addTask", isUserLogged, function(request, response) {
    daoT.insertTask(request.session.currentUser, utilidades.createTask(request.body.nombre_tarea) ,function(err){
        if (err) {
            console.log(err.message);
        } else {
            response.redirect("/tasks");
        }
    });
});

app.get("/finish/:taskId", isUserLogged, function(request, response) {
    daoT.markTaskDone(request.params.taskId,function(err){
        if (err) {
            console.log(err.message);
        } else {
            response.redirect("/tasks");
        }
    });
});

app.get("/deleteCompleted", isUserLogged, function(request, response) {
    daoT.deleteCompleted(request.session.currentUser,function(err){
        if (err) {
            console.log(err.message);
        } else {
            response.redirect("/tasks");
        }
    });
});

// Arrancar el servidor
app.listen(config.port, function(err) {
   if (err) {
       console.log("ERROR al iniciar el servidor");
   }
   else {
       console.log(`Servidor arrancado en el puerto ${config.port}`);
   }
});
