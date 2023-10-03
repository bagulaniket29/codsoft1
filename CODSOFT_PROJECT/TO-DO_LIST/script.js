document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function(task, index) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task}</span>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
        // Save tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add new task
    addTaskBtn.addEventListener("click", function() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            taskInput.value = "";
            renderTasks();
        }
    });

    // Edit or delete tasks
    taskList.addEventListener("click", function(e) {
        if (e.target.classList.contains("edit")) {
            const index = e.target.getAttribute("data-index");
            const updatedTask = prompt("Edit task:", tasks[index]);
            if (updatedTask !== null) {
                tasks[index] = updatedTask;
                renderTasks();
            }
        } else if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    // Initial rendering of tasks
    renderTasks();
});
