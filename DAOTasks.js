"use strict";

const { result } = require("underscore");
const { database } = require("./config");

class DAOTasks {
 constructor(pool) {   
     this.pool = pool;  
    }


 getAllTasks(email, callback) {
    this.pool.getConnection(function(err, connection) {
        if (err) { 
            callback(new Error("Error de conexión a la base de datos"));
        }
        else {
        connection.query("SELECT task.id, task.text, task.done, tag.tag FROM user JOIN task ON user.email = task.user JOIN tag ON task.id = tag.taskId  WHERE user.email = ? " ,
        [email],
        function(err, rows) {
            connection.release(); // devolver al pool la conexión
            if (err) {
                callback(new Error("Error de acceso a la base de datos"));
            }
            else {
                if (rows.length === 0) {
                    callback(null, false); //no está el usuario con el password proporcionado
                }
                else {
                    let task={};
                    let hash = {}; //para eliminar repetidos
                    let tasks = rows.map(t => task = {id: t.id, text: t.text, done: t.done, tags: rows.filter(tg => tg.id === t.id).map(a => a.tag)});
                    tasks = tasks.filter(t => hash[t.id] ? false : hash[t.id] = true);
                    callback(null, tasks);
                }           
            }
        });
        }
    }
    );
 }

 insertTask(email, task, callback) {    
    var idtarea="";
    this.pool.getConnection(function(err, connection) {
        
        if (err) { 
            callback(new Error("Error de conexión a la base de datos"));
        }
        else {
            connection.query("INSERT INTO task(task.user, task.text) VALUES (?,?)" ,
            [email,task.text],
            function(err,result) {
                idtarea = result.insertId;
                if (err) {
                    callback(new Error("Error de acceso a la base de datos"));
                }
                else {
                    task.tags.forEach(t => {
                        connection.query("INSERT INTO tag(tag.taskId, tag.tag) VALUES (?,?)" ,
                        [idtarea,t],
                        function(err,result) {
                            idtarea = result;
                            if (err) {
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                        });
                     
                    });  

                    connection.release(); // devolver al pool la conexión
                    callback(null);    
                }
                
            });
            
        }
    }

    
    );
}
 


 markTaskDone(idTask, callback) {  

    this.pool.getConnection(function(err, connection) {
        if (err) { 
            callback(new Error("Error de conexión a la base de datos"));
        }
        else {
        connection.query("UPDATE task SET done = ? WHERE task.id = ?" ,
        [true, idTask],
        function(err, rows) {
            connection.release(); // devolver al pool la conexión
            if (err) {
                callback(new Error("Error de acceso a la base de datos"));
            }
            else {
                callback(null); //no está el usuario con el password proporcionado         
            }
        });
        }
    }
    );

   }
 
 deleteCompleted(email, callback) {  

    this.pool.getConnection(function(err, connection) {
        if (err) { 
            callback(new Error("Error de conexión a la base de datos"));
        }
        else {
        connection.query("DELETE FROM task WHERE task.user = ? AND task.done = ?" ,
        [email, true],
        function(err, rows) {
            connection.release(); // devolver al pool la conexión
            if (err) {
                callback(new Error("Error de acceso a la base de datos"));
            }
            else {
                callback(null); //no está el usuario con el password proporcionado         
            }
        });
        }
    }
    );

   }
}
module.exports = DAOTasks;
