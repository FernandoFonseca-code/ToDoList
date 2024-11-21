// Main initialization function
function initializeToDoList() {
    let addTaskButton = document.getElementById("btnAddTask") as HTMLButtonElement;
    let clearTaskButton = document.getElementById("btnClearCompletedTasks") as HTMLButtonElement;
    addTaskButton.addEventListener("click", addTask);
    clearTaskButton.addEventListener("click", clearCompletedTasks);
}

// Event listener using named function
document.addEventListener("DOMContentLoaded", initializeToDoList);

/**
 * Function for when the add task button is clicked
 * Run validation ensuring there is something written and run
 * the createTask function
 * @returns void
 */
function addTask() {
    // input validation
    const enteredTask = document.getElementById("enteredTask") as HTMLInputElement;
    const enteredTaskValue = enteredTask.value.trim();
    if (enteredTaskValue.length === 0) {
        return alert("Please enter a task");
    }
    // run function to create task
    createTask(enteredTaskValue);
}

/**
 * Helper function to create a task in the toCompleteTasksContainer along with a checkbox
 * to be displayed on the webpage
 * @param enteredTaskValue user entered task
 */
function createTask(enteredTaskValue: string): void {
    // Get container
    const toCompleteTasksContainer = document.getElementById("toCompleteTasksContainer");

    // Create heading if not exists
    if (!document.querySelector("#toCompleteTasksContainer h2")) {
        const heading = document.createElement("h2");
        heading.textContent = "Tasks to be Completed";
        toCompleteTasksContainer?.appendChild(heading);
    }

    // Create or get task list
    let taskList = document.querySelector("#toCompleteTasksContainer ul");
    if (!taskList) {
        taskList = document.createElement("ul");
        taskList.className = "list-group";
        toCompleteTasksContainer?.appendChild(taskList);
    }

    // Create list item
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex align-items-center";

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () => handleTaskCompletion(checkbox));

    // Create text span
    const taskText = document.createElement("span");
    taskText.textContent = enteredTaskValue;
    taskText.className = "ms-2";

    // Append elements
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    taskList.appendChild(listItem);

    // Clear input
    const input = document.getElementById("enteredTask") as HTMLInputElement;
    input.value = "";
}

/**
 * Function to move task to completed section when checkbox is checked
 * @param checkbox The checkbox element that was clicked
 */
function handleTaskCompletion(checkbox: HTMLInputElement): void {
    const completedTasksContainer = document.getElementById("completedTasksContainer");
    const listItem = checkbox.parentElement;

    // Get or create the completed tasks list
    let completedTasksList = document.querySelector("#completedTasksContainer ul");
    if (!completedTasksList) {
        const heading = document.createElement("h2");
        heading.textContent = "Completed Tasks";
        completedTasksContainer?.appendChild(heading);

        completedTasksList = document.createElement("ul");
        completedTasksList.className = "list-group";
        completedTasksContainer?.appendChild(completedTasksList);
    }

    if (checkbox.checked && listItem) {
        // Add strike-through style to task text
        const taskText = listItem.querySelector("span");
        if (taskText) {
            taskText.style.textDecoration = "line-through";
        }
        // Move to completed tasks
        completedTasksList.appendChild(listItem);
    } else if (!checkbox.checked && listItem) {
        // Remove strike-through style
        const taskText = listItem.querySelector("span");
        if (taskText) {
            taskText.style.textDecoration = "none";
        }
        // Move back to to-do list
        const todoList = document.querySelector("#toCompleteTasksContainer ul");
        if (todoList) {
            todoList.appendChild(listItem);
        }
    }
}

/**
 * Function to handle moving completed tasks to completed section
 */
function moveCompletedTasks(): void {
    // Get containers
    const completedTasksContainer = document.getElementById("completedTasksContainer");
    const completedTasks = document.querySelectorAll('input[type="checkbox"]:checked');

    // Create completed tasks section if it doesn't exist
    if (!document.querySelector("#completedTasksContainer h2")) {
        const heading = document.createElement("h2");
        heading.textContent = "Completed Tasks";
        completedTasksContainer?.appendChild(heading);
    }

    // Create or get completed tasks list
    let taskList = document.querySelector("#completedTasksContainer ul");
    if (!taskList) {
        taskList = document.createElement("ul");
        taskList.className = "list-group";
        completedTasksContainer?.appendChild(taskList);
    }

    // Move each completed task
    completedTasks.forEach((checkbox: Element) => {
        const listItem = checkbox.parentElement;
        if (listItem) {
            // Add strike-through style
            const taskText = listItem.querySelector("span");
            if (taskText) {
                taskText.style.textDecoration = "line-through";
            }
            // Move to completed section
            taskList?.appendChild(listItem);
        }
    });
}

/**
 * Function to clear completed tasks
 */
function clearCompletedTasks(): void {
    const completedTasksList = document.querySelector("#completedTasksContainer ul");
    if (completedTasksList) {
        completedTasksList.innerHTML = "";
    }
}