import { v4 as uuid } from 'uuid'; //uuid es un paquete que permite generar identificadores unicos - npm i uuid

export class Todo {

    /**
     * 
     * @param {String} description
     */
    constructor ( description ){
        this.id = uuid(); //genero el id con uuid
        this.description = description; //descripción de la tarea
        this.done = false; //saber si ya esta lista o terminada una tarea
        this.createdAt = new Date(); //la fecha en que se creo la tarea

    }
}