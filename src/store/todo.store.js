import { Todo } from '../todos/models/todo.model';

export const Filters = { //cuando se escribe con mayuscula la constante es para indicar que es una numeracion

    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
}

const state = { // en state guardamos la informacion global que requiera en mi aplicacion
                // la data del store o state no debe ser visible ni debe poder ser modificado por usarios del exterior
                // cualquier acceso al store debe ser a traves de una funcion controlada (en este caso getCurrentFilter())
    todos: [ 
        new Todo( 'Piedra del alma' ),
        new Todo( 'Piedra del espacio' ),
        new Todo( 'Piedra del tiempo' ),
        new Todo( 'Piedra del poder' ),
        new Todo( 'Piedra de realidad' ),

    ],
    filter: Filters.All, //saber que filtro quiero aplicar Ejem: Todos, Pendientes, Completados....
}

const initStore = () => { //funcion que inicia el Store

    //console.log(state);
    loadStore();
    console.log('InitStore');

}

const loadStore = () => { //permite hacer persistente nuestra informacion
    if( !localStorage.getItem( 'state' ) ) return;
    //console.log( JSON.parse(localStorage.getItem( 'state' ))); //JSON.parse convierte un string en un objeto - es el opuesto de stringify
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem( 'state' )); //convierte un string en un objeto, luego lo desestructura para poder usar sus valores(el arr de todos y el filter)
    state.todos = todos;                                                                      //esto permite mantener como const el objeto state
    state.filter = filter;
    //console.log(localStorage.getItem( 'state' ));
    //throw new Error( 'Not implemented' );
}

const saveStateToLocalStorage = () => {
    //console.log( JSON.stringify( state ) ); //stringify es una funcion del objeto JSON que permite serializar con un string el objeto que se envie como parametro(en este caso el state)
    //localStorage.setItem( 'state','Hola mundo' ); //el localStorage se puede considerar como asyncrona
    localStorage.setItem( 'state', JSON.stringify( state ) ); //el localStorage solo puede almacenar strings por eso se debe transformar el objeto con la funcion JSON.stringify
}

const getTodos = ( filter = Filters.All ) => {
    switch ( filter ) {
        case Filters.All:
            return [...state.todos]; //convertimos el state en un nuevo arreglo con el metodo spread '...' para no hacer referencia al objeto y no sea visible en el exterior
    
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);        // esto hace lo mismo que la linea de abajo - si todo.done es true añade el elemento al arr y si es false lo ignora
       // return state.todos.filter( todo => todo.done === true); //filter() es una funcion de los arreglos que permite regresar un nuevo arreglo con los
        case Filters.Pending:                                   //elementos que cumplan con la condicion (todo.done ===true)
            return state.todos.filter( todo => !todo.done);     //si la condicion es false añado el elemento (!todo.done es la negacion de todo.done) - es decir si es falso añado el elemento
        default:
        throw new Error( `Option ${ filter } is not valid` );

    }
}

/**
 * 
 * @param {String} descripción 
 */
const addTodo = ( descripción ) => { //recibe como argumento la descripcion de un todo para poder inicializarlo
    if ( !descripción ) throw new Error( 'Description is required' ); //si la descripcion esta vacia mando un error y no continuo la ejecucion del proceso

    state.todos.push( new Todo( descripción )); //instancio un nuevo Todo con la descripcion y lo añado al arr 'todos' que esta dentro del objeto state
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId Todo identifier
 */
const toggleTodo = ( todoId ) => { //permite saber si la tarea esta pendiente o terminada
    state.todos = state.todos.map( todo => { //map al igual que filter es una funcion que permite barrer un arr
                                             // si la lista es muy grande seria recomendable hacer esta funcion con un find en vez de map()
        if ( todo.id === todoId){
            todo.done =! todo.done; //si es true lo convierto en false y viceversa
        }
        return todo; //regreso el elemento modificado
    });
    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => { //permite eliminar una tarea
    state.todos = state.todos.filter( todo => todo.id !== todoId ); //regreso un nuevo arr con todos los elementos menos el elemento que tenga el id que recibe como argumento la funcion (todoId)
    saveStateToLocalStorage();                                      //y lo guardo en el arr 'todos' del objeto state (state.todos)
}

const deleteCompleted = () => { //permite eliminar todos las tareas completadas
    state.todos = state.todos.filter( todo => !todo.done ); //regreso un nuevo arr donde la propiedad 'done' del objeto 'todo' sea false
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => { //asignar filtro
    
    // if (Object.keys(Filters).includes(newFilter)){//valido si el filtro recibido esta dentro de mi lista de filtros permitidos
        state.filter = newFilter;
        saveStateToLocalStorage();
    // }else{
    //     throw new Error ( 'No existe el filtro' );
    // }
}

const getCurrentFilter = () => { //funcion controlada para obtener los filtros
    return state.filter;
}


//todas estas funciones ene ste modulo son privadas mientras no tengan el export

export default { //permite a los usuarios externos tener acceso a las funciones que se definan
    addTodo,     //objetos que se esta exportando
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}
