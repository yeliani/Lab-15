document.addEventListener('DOMContentLoaded', () => {
    const tasksContainer = document.getElementById('tasksContainer');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');
    const pendingTasks = document.getElementById('pendingTasks');

    const setDate = () => {
        const date = new Date();
        document.getElementById('dateNumber').textContent = date.toLocaleString('es', { day: 'numeric' });
        document.getElementById('dateText').textContent = date.toLocaleString('es', { weekday: 'long' });
        document.getElementById('dateMonth').textContent = date.toLocaleString('es', { month: 'short' });
        document.getElementById('dateYear').textContent = date.getFullYear();
    };

    const addTask = (name, completed = false) => {
        const task = document.createElement('div');
        task.classList.add('task', 'roundBorder');
        if (completed) {
            task.classList.add('done');
        }
        task.textContent = name;
        task.addEventListener('click', () => toggleTaskState(task));
        tasksContainer.appendChild(task);
    };

    const toggleTaskState = (task) => {
        task.classList.toggle('done');
        updateTaskCount();
        saveTasks();
    };

    const updateTaskCount = () => {
        const total = tasksContainer.childElementCount;
        const completed = tasksContainer.querySelectorAll('.done').length;
        totalTasks.textContent = total;
        completedTasks.textContent = completed;
        pendingTasks.textContent = total - completed;
    };

    const saveTasks = () => {
        const tasks = [];
        tasksContainer.childNodes.forEach(task => {
            tasks.push({
                name: task.textContent,
                completed: task.classList.contains('done')
            });
        });
        localStorage.setItem('todos', JSON.stringify(tasks));
    };

    const loadTasks = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTask(todo.name, todo.completed));
    };

    setDate();
    loadTasks();
    updateTaskCount();
});
