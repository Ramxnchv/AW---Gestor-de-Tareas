"use strict";

class DAOTasks {
 constructor(pool) {  ...  }
 getAllTasks(email, callback) {  ...  }
 insertTask(email, task, callback) {  ...  }
 markTaskDone(idTask, callback) {  ...  }
 deleteCompleted(email, callback) {  ...  }
}
module.exports = DAOTasks;
