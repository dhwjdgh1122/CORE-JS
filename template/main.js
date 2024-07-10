import { TodoList } from './components/TodoList/TodoList.js'


const app = document.getElementById('app');


const defineElements = () => {
  customElements.define('todo-app',TodoList);
}


defineElements()


const todoElement = document.createElement('todo-app');

app.append(todoElement);