// Event listener using named function
document.addEventListener("DOMContentLoaded", initializeToDoList);

// Main initialization function
function initializeToDoList() {
    let addTaskButton = document.getElementById("btnAddTask") as HTMLButtonElement;
    let clearTaskButton = document.getElementById("btnClearCompletedTasks") as HTMLButtonElement;
    
    addTaskButton.addEventListener("click", addTask);
    clearTaskButton.addEventListener("click", clearCompletedTasks);
}

/**
 * Function for when the add task button is clicked
 * Run validation ensuring there is something written and run
 * the createTask function
 * @returns void
 */
function addTask() {
    let enteredTask = document.getElementById("enteredTask") as HTMLInputElement;
    let enteredTaskValue = enteredTask.value.trim();
    
    if (isValidTask(enteredTaskValue)) {
        createTask(enteredTaskValue);
        clearInputField(enteredTask);
        enteredTask.focus();
    }
    else {
        showErrorMessage();
    }
    
}


/**
 * Helper function to create a task in the toCompleteTasksContainer along with a checkbox
 * to be displayed on the webpage
 * @param enteredTaskValue user entered task
 */
function createTask(enteredTaskValue: string): void {
    // Get container
    let toCompleteTasksContainer = document.getElementById("toCompleteTasksContainer");

    // Create heading if not exists
    if (!document.querySelector("#toCompleteTasksContainer h2")) {
        let heading = document.createElement("h2");
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
    let listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex align-items-center";

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () => taskCompletion(checkbox));

    // Create text span
    let taskText = document.createElement("span");
    taskText.textContent = enteredTaskValue;
    taskText.className = "ms-2";

    // Append elements
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    taskList.appendChild(listItem);
}

/**
 * Function to move task to completed section when checkbox is checked
 * @param checkbox The checkbox element that was clicked
 */
function taskCompletion(checkbox: HTMLInputElement): void {
    let completedTasksContainer = document.getElementById("completedTasksContainer");
    let listItem = checkbox.parentElement;

    // Get or create the completed tasks list
    let completedTasksList = document.querySelector("#completedTasksContainer ul");
    if (!completedTasksList) {
        let heading = document.createElement("h2");
        heading.textContent = "Completed Tasks";
        completedTasksContainer?.appendChild(heading);

        completedTasksList = document.createElement("ul");
        completedTasksList.className = "list-group";
        completedTasksContainer?.appendChild(completedTasksList);
    }

    if (checkbox.checked && listItem) {
        // Add strike-through style and color to task text
        let taskText = listItem.querySelector("span");
        if (taskText) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }
        // Move to completed tasks
        completedTasksList.appendChild(listItem);
    } else if (!checkbox.checked && listItem) {
        // Remove strike-through style and color
        let taskText = listItem.querySelector("span");
        if (taskText) {
            taskText.style.textDecoration = "none";
            taskText.style.color = "black";
        }
        // Move back to to-do list
        let todoList = document.querySelector("#toCompleteTasksContainer ul");
        if (todoList) {
            todoList.appendChild(listItem);
        }
    }
}

/**
 * Function to move completed tasks to completed section
 */
function moveCompletedTasks(): void {
    // Get containers
    let completedTasksContainer = document.getElementById("completedTasksContainer");
    let completedTasks = document.querySelectorAll('input[type="checkbox"]:checked');

    // Create completed tasks section if it doesn't exist
    if (!document.querySelector("#completedTasksContainer h2")) {
        let heading = document.createElement("h2");
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
        let listItem = checkbox.parentElement;
        if (listItem) {
            // Add strike-through style
            let taskText = listItem.querySelector("span");
            if (taskText) {
                taskText.style.textDecoration = "line-through";
                taskText.style.color = "gray";
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

/**
 * function to validate the task text is not empty
 * @param taskText the user input text
 * @returns true if task text is not empty
 */
function isValidTask(taskText: string): boolean {
    return taskText.length > 0;
}

/**
 * Shows error message for invalid input
 */
function showErrorMessage(): void {
    alert("Please enter a task");
}

/**
 * Clears the input field
 * @param input user task input
 */
function clearInputField(input: HTMLInputElement): void {
    input.value = "";
}