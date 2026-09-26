document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskIdInput = document.getElementById('task-id');
    const taskTitleInput = document.getElementById('task-title');
    const taskPriorityInput = document.getElementById('task-priority');
    const submitBtn = document.getElementById('submit-btn');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    let searchQuery = '';

    // Render initial tasks
    renderTasks();

    // Form Submit (Add or Edit)
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskTitleInput.value.trim();
        const priority = taskPriorityInput.value;
        const id = taskIdInput.value;

        if (!title) return;

        if (id) {
            // Edit task
            tasks = tasks.map(task => task.id == id ? { ...task, title, priority } : task);
            taskIdInput.value = '';
            submitBtn.textContent = 'Add Task';
        } else {
            // Add task
            const newTask = {
                id: Date.now(),
                title,
                priority,
                completed: false
            };
            tasks.push(newTask);
        }

        saveAndRender();
        taskForm.reset();
    });

    // Event Delegation for Task List Actions (Complete, Edit, Delete)
    taskList.addEventListener('click', (e) => {
        const listItem = e.target.closest('.task-item');
        if (!listItem) return;
        const id = listItem.dataset.id;

        if (e.target.classList.contains('complete-checkbox')) {
            tasks = tasks.map(task => task.id == id ? { ...task, completed: e.target.checked } : task);
            saveAndRender();
        } else if (e.target.classList.contains('delete-btn')) {
            tasks = tasks.filter(task => task.id != id);
            saveAndRender();
        } else if (e.target.classList.contains('edit-btn')) {
            const task = tasks.find(t => t.id == id);
            if (task) {
                taskTitleInput.value = task.title;
                taskPriorityInput.value = task.priority;
                taskIdInput.value = task.id;
                submitBtn.textContent = 'Update Task';
            }
        }
    });

    // Filter Buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // Search Input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderTasks();
    });

    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';

        let filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        }).filter(task => task.title.toLowerCase().includes(searchQuery));

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<p style="text-align: center; color: #777; padding: 1rem;">No tasks found.</p>';
            return;
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            li.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''}>
                    <span><strong>[${task.priority}]</strong> ${escapeHtml(task.title)}</span>
                </div>
                <div class="task-actions">
                    <button type="button" class="edit-btn">Edit</button>
                    <button type="button" class="delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});