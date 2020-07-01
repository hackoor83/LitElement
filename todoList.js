import { LitElement, html } from 'https://unpkg.com/lit-element?module';

export class TodoList extends LitElement {
    static get properties() {
        return {
            todos: { type: Array }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        console.log('todo list component connected');
    }

    render() {
        if (!this.todos) {
            return html``;
        }

        return html`
                <link rel="stylesheet" href="bootstrap.min.css">

        <ol>
            ${this.todos.map(
            todo => html`
            <li>
                <input type="checkbox"
                .checked=${todo.finished} 
                @change=${e => this._finishTodo(e, todo)}
                />
            ${todo.text} (${todo.finished ? 'Finished' : 'Unfinished'}) 
                <button class="btn btn-danger btn-sm" @click=${() => this._removeTodo(todo)}>X</button>
            </li>`
        )}
        </ol>
        `;
    }

    _finishTodo(e, changedTodo) {
        /**
         * Because this component (i.e. the todoList) is embedded within the body of the parent component (i.e. the todo)
         * the child component needs to send the event details to the parent component. The parent component
         * have the actual todo list array. Therefore, any events comming from the child, should be applied 
         * to the parent's todo list array. That is why we are sending the EventDetails object from the child.
         */
        //Here we are creating the object which includes the event details.
        const eventDetails = { changedTodo, finished: e.target.checked };

        //Here we are dipatching (or emitting) the event. However, we are creating a custom event, 
        // and we have called it "change-todo-finished", and we are sending the event details object
        // as an object with the key "detail".
        this.dispatchEvent(new CustomEvent('change-todo-finished', { detail: eventDetails }));
    }

    _removeTodo(item) {
        this.dispatchEvent(new CustomEvent('remove-todo', { detail: item }));
    }

}
customElements.define('todo-list', TodoList);