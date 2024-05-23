document.getElementById('todoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const todoInput = document.getElementById('todoInput');
    const newTodo = todoInput.value.trim();

    if (newTodo) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ name: newTodo, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));

        const message = document.getElementById('message');
        message.textContent = "TODO guardado correctamente";
        message.style.display = 'block';

        todoInput.value = '';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000); // Redireccionar después de 3 segundos
    }
});
