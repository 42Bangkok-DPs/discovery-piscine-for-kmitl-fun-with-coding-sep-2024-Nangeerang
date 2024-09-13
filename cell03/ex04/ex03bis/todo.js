$(document).ready(function() {
    const todoList = $('#ft_list');

    function getCookie(key) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(key + '=')) {
                return cookie.substring(key.length + 1);
            }
        }
        return null;
    }

    function setCookie(key, value) {
        document.cookie = `${key}=${value}; path=/;`;
    }

    function loadTasks() {
        const tasks = getCookie('tasks');
        todoList.html(tasks || '');
        todoList.children().each(function() {
            $(this).on('click', function() {
                removeTask($(this));
            });
        });
    }

    function saveTasks() {
        setCookie('tasks', todoList.html());
    }

    function addTask() {
        const task = prompt('Enter a new task:');
        if (task) {
            const taskElement = $('<div></div>').addClass('task').text(task);
            taskElement.on('click', function() {
                removeTask(taskElement);
            });
            todoList.prepend(taskElement);
            saveTasks();
        }
    }

    function removeTask(taskElement) {
        if (confirm('Do you want to remove this task?')) {
            taskElement.remove();
            saveTasks();
        }
    }

    $('#newTaskBtn').on('click', function() {
        addTask();
    });

    loadTasks();
});