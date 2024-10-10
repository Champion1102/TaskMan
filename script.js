const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const searchInput = document.getElementById("search-input");
const autocompleteList = document.getElementById("autocomplete-list");
const sortCompletedBtn = document.getElementById("sort-completed");
const sortAlphaBtn = document.getElementById("sort-alpha");

let todos = [];

function renderTodos(todosToRender) {
    todoList.innerHTML = "";
    todosToRender.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = `${todo.text} (${todo.completed ? "Completed" : "Pending"})`;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTodo(index);

        const statusBtn = document.createElement("button");
        statusBtn.textContent = todo.completed ? "Mark as Pending" : "Mark as Completed";
        statusBtn.onclick = () => toggleTodoStatus(index);

        li.appendChild(statusBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const newTodoText = todoInput.value.trim();
    if (newTodoText !== "") {
        todos.push({ text: newTodoText, completed: false });
        todoInput.value = ""; 
        renderTodos(todos);
    }
});

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos(todos);
}

function toggleTodoStatus(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos(todos);
}

sortCompletedBtn.addEventListener("click", () => {
    todos.sort((a, b) => a.completed - b.completed);
    renderTodos(todos);
});

sortAlphaBtn.addEventListener("click", () => {
    todos.sort((a, b) => a.text.localeCompare(b.text));
    renderTodos(todos);
});

searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchText));
    showAutocomplete(filteredTodos.map(todo => todo.text));
    renderTodos(filteredTodos);
});

function showAutocomplete(suggestions) {
    autocompleteList.innerHTML = "";
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const li = document.createElement("li");
            li.textContent = suggestion;
            li.onclick = () => {
                searchInput.value = suggestion;
                autocompleteList.innerHTML = ""; 
            };
            autocompleteList.appendChild(li);
        });
    }
}

searchInput.addEventListener("blur", () => {
    setTimeout(() => {
        autocompleteList.innerHTML = "";
    }, 100);
});