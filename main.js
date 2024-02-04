import './style.css'
import { App } from './src/todos/app'; //importa la funcion App
import todoStore from './src/store/todo.store'; //importa el objeto que se esta exportando por defecto en todo.store.js

todoStore.initStore(); //ejecuto la funcion initStore()
App('#app'); //se envia el argumento, en este caso el id del div donde se quiere renderizar la App