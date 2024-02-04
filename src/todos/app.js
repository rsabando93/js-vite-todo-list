import html from './app.html?raw'; // el ?raw permite importar el html y corrige el error de js
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

const ElementsIDs = { //cuando se escribe con mayuscula la constante es para indicar que es una numeracion
    TodoList: '.todo-list', //Lista de tareas - Id del elemento donde se va a renderizar el codigo dinamico
    NewTodoInput: '.new-todo-input',//Input '¿Que necesita ser hecho?'
    ClearCompletedButton: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => { // Funcion que renderiza la aplicacion - elementId es el elemento en especifico que renderiza la app

    const displayTodos = () => { // Renderiza la lista de todos

        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos( ElementsIDs.TodoList, todos );
        updatePendingCount();

    }

    const updatePendingCount = () => {
        renderPending( ElementsIDs.PendingCountLabel );
    }
    // Cuando la funcion App() se llama
    (()=>{  // Funcion anonima autoinvocada
        const app = document.createElement('div');
        app.innerHTML = html; //importa el html de app.html
        document.querySelector(elementId).append( app ); //recibe el elementId(#app) y le agrega los elementos creados
        displayTodos(); //funcion que renderiza la lista
    })();


    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementsIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementsIDs.TodoList );
    const clearCompleted = document.querySelector( ElementsIDs.ClearCompletedButton );
    const filterLIs = document.querySelectorAll( ElementsIDs.TodoFilters );


    newDescriptionInput,addEventListener( 'keyup', ( event ) => {// se ejecuta cuando alguien presiona y suelta una tecla
        //console.log( event.key  ); //muestra ña tecla que se presiono
           if ( event.key !== 'Enter' ) return; //solo va a seguir la ejecucion si la tecla es 'enter'
           // console.log( event ); //muestra ña tecla que se presiono
           // console.log( event.target ); //muestra el html del elemento que se presiono
            //console.log( event.target.value ); //muestra todos lo valores del input

           if ( event.target.value.trim().length === 0) return; //solo va a seguir la ejecucion si el texto enviado no esta vacio
                                                                // trim() permite quitar los espacion de adelanta y atras de un parrafo
            todoStore.addTodo( event.target.value );
            displayTodos(); //renderizo denuevo los todos para refrescar la lista con el nuevo todo ingresado 
            event.target.value = ''; //limpio el input
    });

    todoListUL.addEventListener( 'click', ( event ) => {
        const element = event.target.closest( '[data-id]' ); //devuelve el elemento padre
       // console.log( element );
     //  console.log( element.getAttribute('data-id') );// obtiene el Id del elemento
       //console.log( event.target );//muestra el html del elemento de la lista
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();  //refrescar lista
    });

    todoListUL.addEventListener( 'click', ( event ) => {
        const element = event.target.closest( '[data-id]' );
        const isDestroyElement = event.target.className === 'destroy';//si el elemento tiene el nombre de clase destroy devuelve un true caso contraio un false
        //console.log(event.target.className); //obtiene el nombre de la clase - destroy
        //console.log(event.target.localName); //obtiene el nombre elemento - button
        //if ( event.target.localName !== 'button') return;
       // console.log(isDestroyElement);
        
        if (!element || !isDestroyElement) return; //si el elemento no existe o no es destroy ejecuto return y no ejecuto lo siguiente
        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodos();  //refrescar lista
 
    });

    clearCompleted.addEventListener( 'click', () => {
        todoStore.deleteCompleted(); //elimina todas las tareas completadas
        displayTodos();  //refrescar lista
    });

    filterLIs.forEach( element => { //recorre el arr creado con los elementos html del filtro 'a class="filtro"'
        element.addEventListener( 'click', ( element ) => {
            filterLIs.forEach( el => el.classList.remove( 'selected' )); //se vuelve a recorrer el arr para quitar la clase selected a todos
            element.target.classList.add( 'selected' ); //se añade la clase selected solo al elemento que se le da click
            //console.log( element.target.text ); //obtiene el texto del elemento clickeado
            switch (element.target.text ) {
                case 'Todos':
                    todoStore.setFilter(Filters.All); //envia el filtro seleccionado
                    
                    break;

                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);

                    break;
                
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);

                    break;
            }
            displayTodos();
        });
    });

}