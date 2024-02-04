import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./index";

let element;
/**
 * 
 * @param {String} elmentId 
 * @param {Array<Todo>} todos 
 */
export const renderTodos = ( elmentId, todos = [] ) => { //funcion que renderizara mi lista de todos en el div especifico
    // console.log(elmentId, todos);
    if ( !element ) //si el element no existe entonces lo creo - esto permite evitar estar recreando este elemento cada vez que se llama el renderTodos
        element = document.querySelector( elmentId ); //solo la primera vez va a crear este elemento

    if ( !element ) throw new Error( `Element ${ elmentId } not found` ); //se ejecuto solo si no entra en el anterior if - si el argumento del elemtoId recibido no exite ejecuto este error

    element.innerHTML = '';
    todos.forEach( todo => {
        element.append( createTodoHTML( todo )); //llama al metodo createTodoHTML() que crea el elemento li y lo inserta en el div con el id correspondiente(.todo-list)
    });
    
}