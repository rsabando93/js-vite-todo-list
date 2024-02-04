import { Todo } from "../models/todo.model";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = ( todo ) => {
    if ( !todo ) throw new Error( 'A todo object is required' );
    
    const {done, description, id } = todo; //desestructuracion de datos - coje el objeto y lo divide entre sus propiedades o variables
    const html = `
            <div class="view">
                <input class="toggle" type="checkbox" ${ done ? 'checked' : '' }>
                <label> ${ description } </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
    `; //creo un un div con la descripcion del todo
       //si el todo.done es true entonces le doy el valor de checked que muestra un visto verde, caso contrario no pongo nada
    const liElement = document.createElement('li'); //creo un element de tipo lista
    liElement.innerHTML = html;                     //añado la descripcion a la lista li
    liElement.setAttribute('data-id', id);     //agrego el id del objeto 'todo' al id del li creado
    
    if ( todo.done ) //si todo.done es true le añade la clase complete
        liElement.classList.add( 'completed' );         //añado la clase 'completed' al li creado

    return liElement;

}