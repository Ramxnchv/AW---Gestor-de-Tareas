"use strict";

class DAOUsers {

  constructor(pool) {  ...  }

  isUserCorrect(email, password, callback) {

    this.pool.getConnection(function(err, connection) {
        if (err) { 
            callback(new Error("Error de conexión a la base de datos"));
        }
        else {
        connection.query("SELECT * FROM user WHERE email = ? AND password = ?" ,
        [email,password],
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
                    callback(null, true);
                }           
            }
        });
        }
    }
    );
}  

  getUserImageName(email, callback) {  ...  }
}
module.exports = DAOUsers;
