"use strict"

class utils{
    getToDoTasks(tasks){
        return (tasks.filter(aux => aux.done === undefined || aux.done === false)).map(aux => aux.text);
    }
    
    findByTag(tasks, tag){
        return tasks.filter(aux => aux.tags.some(aux => aux === tag));
    }
    
    findByTags(tasks, tags){
        return tasks.filter(aux => aux.tags.some(tag => tags.some(t => t === tag)));
    }
    
    countDone(tasks){
        return (tasks.filter(aux => aux.done === true)).reduce((ac,aux) => ac + 1 , 0);
    }
    
    createTask(texto){
        var palabras = texto.split(" ").filter(aux => aux !== "");
    
        var text = palabras.filter(aux => !aux.startsWith("@"));
        var tags = palabras.filter(aux => aux.startsWith("@")).map(aux => aux.slice(1,aux.lenth));
    
        return {text: text.join(" "), tags: tags};
    }
}


module.exports = utils;
