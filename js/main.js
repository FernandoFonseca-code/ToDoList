"use strict";
document.addEventListener("DOMContentLoaded", initializeToDoList);
function initializeToDoList() {
    let addTaskButton = document.getElementById("btnAddTask");
    let clearTaskButton = document.getElementById("btnClearCompletedTasks");
    addTaskButton.addEventListener("click", addTask);
    clearTaskButton.addEventListener("click", clearCompletedTasks);
}
function addTask() {
    let enteredTask = document.getElementById("enteredTask");
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
function createTask(enteredTaskValue) {
    let toCompleteTasksContainer = document.getElementById("toCompleteTasksContainer");
    if (!document.querySelector("#toCompleteTasksContainer h2")) {
        let heading = document.createElement("h2");
        heading.textContent = "Tasks to be Completed";
        toCompleteTasksContainer === null || toCompleteTasksContainer === void 0 ? void 0 : toCompleteTasksContainer.appendChild(heading);
    }
    let taskList = document.querySelector("#toCompleteTasksContainer ul");
    if (!taskList) {
        taskList = document.createElement("ul");
        taskList.className = "list-group";
        toCompleteTasksContainer === null || toCompleteTasksContainer === void 0 ? void 0 : toCompleteTasksContainer.appendChild(taskList);
    }
    let listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex align-items-center";
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () => taskCompletion(checkbox));
    let taskText = document.createElement("span");
    taskText.textContent = enteredTaskValue;
    taskText.className = "ms-2";
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    taskList.appendChild(listItem);
}
function taskCompletion(checkbox) {
    let completedTasksContainer = document.getElementById("completedTasksContainer");
    let listItem = checkbox.parentElement;
    let completedTasksList = document.querySelector("#completedTasksContainer ul");
    if (!completedTasksList) {
        let heading = document.createElement("h2");
        heading.textContent = "Completed Tasks";
        completedTasksContainer === null || completedTasksContainer === void 0 ? void 0 : completedTasksContainer.appendChild(heading);
        completedTasksList = document.createElement("ul");
        completedTasksList.className = "list-group";
        completedTasksContainer === null || completedTasksContainer === void 0 ? void 0 : completedTasksContainer.appendChild(completedTasksList);
    }
    if (checkbox.checked && listItem) {
        let taskText = listItem.querySelector("span");
        if (taskText) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }
        completedTasksList.appendChild(listItem);
    }
    else if (!checkbox.checked && listItem) {
        let taskText = listItem.querySelector("span");
        if (taskText) {
            taskText.style.textDecoration = "none";
            taskText.style.color = "black";
        }
        let todoList = document.querySelector("#toCompleteTasksContainer ul");
        if (todoList) {
            todoList.appendChild(listItem);
        }
    }
}
function moveCompletedTasks() {
    let completedTasksContainer = document.getElementById("completedTasksContainer");
    let completedTasks = document.querySelectorAll('input[type="checkbox"]:checked');
    if (!document.querySelector("#completedTasksContainer h2")) {
        let heading = document.createElement("h2");
        heading.textContent = "Completed Tasks";
        completedTasksContainer === null || completedTasksContainer === void 0 ? void 0 : completedTasksContainer.appendChild(heading);
    }
    let taskList = document.querySelector("#completedTasksContainer ul");
    if (!taskList) {
        taskList = document.createElement("ul");
        taskList.className = "list-group";
        completedTasksContainer === null || completedTasksContainer === void 0 ? void 0 : completedTasksContainer.appendChild(taskList);
    }
    completedTasks.forEach((checkbox) => {
        let listItem = checkbox.parentElement;
        if (listItem) {
            let taskText = listItem.querySelector("span");
            if (taskText) {
                taskText.style.textDecoration = "line-through";
                taskText.style.color = "gray";
            }
            taskList === null || taskList === void 0 ? void 0 : taskList.appendChild(listItem);
        }
    });
}
function clearCompletedTasks() {
    const completedTasksList = document.querySelector("#completedTasksContainer ul");
    if (completedTasksList) {
        completedTasksList.innerHTML = "";
    }
}
function isValidTask(taskText) {
    return taskText.length > 0;
}
function showErrorMessage() {
    alert("Please enter a task");
}
function clearInputField(input) {
    input.value = "";
}
