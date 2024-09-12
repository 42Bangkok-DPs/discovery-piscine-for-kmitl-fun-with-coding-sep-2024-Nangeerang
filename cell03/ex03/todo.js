function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to save the list in cookies
function saveToCookie() {
    const todos = document.querySelectorAll(".todo-item");
    const todoArray = Array.from(todos).map(todo => todo.innerText); 
    document.cookie = `todoList=${encodeURIComponent(JSON.stringify(todoArray))}; path=/`;
}

// Function to load tasks from the cookie
function loadFromCookie() {
    const todoList = getCookie("todoList");
    if (todoList) {
        try {
            const todos = JSON.parse(decodeURIComponent(todoList));
            todos.forEach(createTodoElement);
        } catch (error) {
            console.error("Error parsing todos from cookie:", error);
        }
    }
}

  function loadTodosFromCookie() {
    try {
        let todos = localStorage.getItem('todos');
        if (todos) {
            todos = JSON.parse(todos);
            todos.forEach(addTodo);
        }
    } catch (error) {
        console.error("Error loading todos from local storage:", error);
        // แสดงข้อความแจ้งผู้ใช้ หรือดำเนินการอื่นๆ ที่เหมาะสม
    }
}

  
  // Function to create a new TODO div element
  function createTodoElement(todoText) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    todoDiv.innerText = todoText;
  
    // Add click event to the todo to confirm deletion
    todoDiv.onclick = function () {
      const confirmDelete = confirm("Do you want to remove this TO DO?");
      if (confirmDelete) {
        todoDiv.remove();
        saveToCookie();
      }
    };
  
    // Prepend the new todo at the top of the list
    const ftList = document.getElementById("ft_list");
    ftList.insertBefore(todoDiv, ftList.firstChild);
  }
  
  // Function to handle new TODO creation
  function newTodo() {
    const todoText = prompt("Enter your new TO DO:");
    if (todoText !== null && todoText.trim() !== "") {
      createTodoElement(todoText);
      saveToCookie();
    }
  }
  
  // Load todos from cookies when the page loads
  window.onload = function () {
    loadFromCookie();
  };
      