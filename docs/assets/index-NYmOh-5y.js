(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&d(n)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const v=`<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
    </header>
    
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>    
                <!-- selected -->
                <a class="filtro" class="selected" href="#/">Todos</a>
            </li>
            <li>
                <a class="filtro" href="#/active">Pendientes</a>
            </li>
            <li>
                <a class="filtro" href="#/completed">Completados</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Creado por <a href="http://todomvc.com">ti</a></p>
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`;let f;const L=new Uint8Array(16);function S(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(L)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function C(e,t=0){return s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:E};function P(e,t,i){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const d=e.random||(e.rng||S)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return C(d)}class m{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"completed",Pending:"pending"},l={todos:[new m("Piedra del alma"),new m("Piedra del espacio"),new m("Piedra del tiempo"),new m("Piedra del poder"),new m("Piedra de realidad")],filter:c.All},A=()=>{T(),console.log("InitStore")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(l))},k=(e=c.All)=>{switch(e){case c.All:return[...l.todos];case c.Completed:return l.todos.filter(t=>t.done);case c.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},I=e=>{if(!e)throw new Error("Description is required");l.todos.push(new m(e)),g()},U=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},x=e=>{l.todos=l.todos.filter(t=>t.id!==e),g()},q=()=>{l.todos=l.todos.filter(e=>!e.done),g()},F=(e=c.All)=>{l.filter=e,g()},M=()=>l.filter,a={addTodo:I,deleteCompleted:q,deleteTodo:x,getCurrentFilter:M,getTodos:k,initStore:A,loadStore:T,setFilter:F,toggleTodo:U};let y;const D=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=a.getTodos(c.Pending).length},O=e=>{if(!e)throw new Error("A todo object is required");const{done:t,description:i,id:d}=e,o=`
            <div class="view">
                <input class="toggle" type="checkbox" ${t?"checked":""}>
                <label> ${i} </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
    `,r=document.createElement("li");return r.innerHTML=o,r.setAttribute("data-id",d),e.done&&r.classList.add("completed"),r};let h;const N=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(i=>{h.append(O(i))})},p={TodoList:".todo-list",NewTodoInput:".new-todo-input",ClearCompletedButton:".clear-completed",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},H=e=>{const t=()=>{const n=a.getTodos(a.getCurrentFilter());N(p.TodoList,n),i()},i=()=>{D(p.PendingCountLabel)};(()=>{const n=document.createElement("div");n.innerHTML=v,document.querySelector(e).append(n),t()})(),document.querySelector(p.NewTodoInput);const d=document.querySelector(p.TodoList),o=document.querySelector(p.ClearCompletedButton),r=document.querySelectorAll(p.TodoFilters);addEventListener("keyup",n=>{n.key==="Enter"&&n.target.value.trim().length!==0&&(a.addTodo(n.target.value),t(),n.target.value="")}),d.addEventListener("click",n=>{const u=n.target.closest("[data-id]");a.toggleTodo(u.getAttribute("data-id")),t()}),d.addEventListener("click",n=>{const u=n.target.closest("[data-id]"),b=n.target.className==="destroy";!u||!b||(a.deleteTodo(u.getAttribute("data-id")),t())}),o.addEventListener("click",()=>{a.deleteCompleted(),t()}),r.forEach(n=>{n.addEventListener("click",u=>{switch(r.forEach(b=>b.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":a.setFilter(c.All);break;case"Pendientes":a.setFilter(c.Pending);break;case"Completados":a.setFilter(c.Completed);break}t()})})};a.initStore();H("#app");
