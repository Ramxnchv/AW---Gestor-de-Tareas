"use strict";

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
    this.pool.getConnection(function(err, connection) {
        if (err) { 
            callback(new Error("Error de conexión a la base de datos"));
        }
        else {
        connection.query("INSERT INTO task(task.user, task.text) VALUES (?,?)" ,
        [email,task[0]],
        function(err,result) {
            connection.release(); // devolver al pool la conexión
            if (err) {
                callback(new Error("Error de acceso a la base de datos"));
            }
            else {
                    callback(null, true);         
            }
            
        });
        
        // connection.query("INSERT INTO tag (taskId, tag) VALUES (?, ?), (?, ?), (?, ?), .." ,
        // [idTarea,task[2]],
        // function(err) {
        //     // connection.release(); // devolver al pool la conexión
        //     if (err) {
        //         callback(new Error("Error de acceso a la base de datos"));
        //     }
        //     else {
        //             callback(null, true);         
        //     }
        // });
        }
    }
    );
 }
 
 markTaskDone(idTask, callback) {    }
 
 deleteCompleted(email, callback) {    }
}
module.exports = DAOTasks;
