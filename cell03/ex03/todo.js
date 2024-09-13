let todoList = [];
const ftList = document.getElementById('ft_list');
const addBtn = document.getElementById('addBtn');

const render = () => {
  ftList.innerHTML = '';
  todoList.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.textContent = task;
    taskDiv.style.padding = '10px';
    taskDiv.style.margin = '5px';
    taskDiv.style.borderRadius = '4px';
    taskDiv.style.border = '1px solid #ddd';
    taskDiv.style.backgroundColor = '#f9f9f9';

    if (index === 0) {
      taskDiv.style.borderColor = '#4CAF50';
      taskDiv.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)';
    }

    taskDiv.addEventListener('click', () => {
      const confirmDelete = confirm('Do you want to remove this task?');
      if (confirmDelete) {
        removeTask(index);
      }
    });
    ftList.insertBefore(taskDiv, ftList.firstChild);
  });
};

const addTask = (task) => {
  todoList.unshift(task);
  saveTasks();
  render();
};

const removeTask = (index) => {
  todoList.splice(index, 1);
  saveTasks();
  render();
};

const saveTasks = () => {
  setCookie('todoList', JSON.stringify(todoList), 7);
};

const setCookie = (key, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; ${expires}; path=/`;
};

const getCookie = (key) => {
  const cookies = document.cookie.split(';').map(c => c.trim());
  const cookie = cookies.find(c => c.startsWith(`${encodeURIComponent(key)}=`));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
};

window.onload = () => {
  const savedTasks = getCookie('todoList');
  if (savedTasks) {
    todoList = JSON.parse(savedTasks);
    render();
  }
};

addBtn.addEventListener('click', () => {
  const newTask = prompt('Enter new task:');
  if (newTask && newTask.trim()) {
    addTask(newTask);
  }
});