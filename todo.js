import { LitElement, html } from 'https://unpkg.com/lit-element?module';
import './todoList.js';

export class TodoApp extends LitElement {

    static get properties() {
        return {
            todos: { type: Array }
        }
    }
    constructor() {
        super();
        this.todos = [
            { text: 'First task', finished: true },
            { text: 'Second task', finished: false },
            { text: 'Third task', finished: false }
        ];
    }

    connectedCallback() {
        super.connectedCallback();
        console.log('Main Todo app component loaded!');
    }

    render() {
        const finishedCount = this.todos.filter(todoElement => todoElement.finished).length;
        const unfinishedCount = this.todos.length - finishedCount;

        return html`
        <link rel="stylesheet" href="bootstrap.min.css">

        <div class="container jumbotron">
        <h1>Todo App</h1>

        <input id="addTodoInput" placeholder="Name"/>
        <button class="btn btn-primary" @click="${this._addTodo}">Add</button>

            <todo-list .todos="${this.todos}"
            @change-todo-finished="${this._finishTodo}"
            @remove-todo="${this._removeTodo}"
            ></todo-list>

        <div class="alert alert-dismissible alert-info">
            <p>Total finished: ${finishedCount}</p>
            <p>Total unfinished: ${unfinishedCount}</p>
        </div>
        </div>
        `;
    }

    _addTodo() {
        const input = this.shadowRoot.getElementById('addTodoInput');
        const text = input.value;
        console.log(text);
        input.value = '';

        // this.todos.push({ text, finished: false });

        this.todos = [
            ...this.todos,
            { text, finished: false }
        ];

        /**
         * this function is to re-render the UI, to show the updates.
         */
        this.requestUpdate();
    }

    _removeTodo(removeTodo) {
        this.todos = this.todos.filter(todoItem => todoItem !== removeTodo.detail);
    }

    /**
     * The parameter (e) is automatically passed from javascript to your function when you add
     * an event listener. It represents the element that was affected. So in this case, the e represents
     * the checkbox.
     */
    _finishTodo(e) {
        const { changedTodo, finished } = e.detail;

        this.todos = this.todos.map((todo) => {
            if (todo !== changedTodo) {
                return todo;
            }
            return { ...changedTodo, finished };
        });
    }
}
customElements.define('todo-app', TodoApp);