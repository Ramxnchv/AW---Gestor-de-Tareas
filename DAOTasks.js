"use strict";

const { result } = require("underscore");

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
        connection.query("SELECT task.id, task.text, task.done, tag.tag FROM user JOIN task ON user.email = task.user JOIN tag ON task.id = tag.taskId  WHERE user.email = ?" ,
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
                    callback(null, rows);
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
            [email,task[0]],
            function(err,result) {
                idtarea = result;
                connection.release(); // devolver al pool la conexión
                if (err) {
                    callback(new Error("Error de acceso a la base de datos"));
                }
                else {
                     callback(null);       
                }
                
            });
        }
    }

    
    );
    this.pool.getConnection(function(err, connection) {
        
        if (err) { 
            callback(new Error("Error de conexión a la base de datos"));
        }
        else {
            var valores=[];
            for(var i = 0; i< task[2].length; ++i){
                valores.push([3,task[2][i]]);
            }
    
            connection.query("INSERT INTO tag (taskId, tag) VALUES ?" ,
            [valores],
            function(err,result) {
                
                connection.release(); // devolver al pool la conexión
                if (err) {
                    callback(new Error("Error de acceso a la base de datos"));
                }
                else {
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
