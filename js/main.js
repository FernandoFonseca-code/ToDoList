"use strict";
function initializeToDoList() {
    let addTaskButton = document.getElementById("btnAddTask");
    let clearTaskButton = document.getElementById("btnClearCompletedTasks");
    addTaskButton.addEventListener("click", addTask);
    clearTaskButton.addEventListener("click", clearCompletedTasks);
}
document.addEventListener("DOMContentLoaded", initializeToDoList);
function addTask() {
    const enteredTask = document.getElementById("enteredTask");
    const enteredTaskValue = enteredTask.value.trim();
    if (enteredTaskValue.length === 0) {
        return alert("Please enter a task");
    }
    createTask(enteredTaskValue);
}
function createTask(enteredTaskValue) {
    const toCompleteTasksContainer = document.getElementById("toCompleteTasksContainer");
    if (!document.querySelector("#toCompleteTasksContainer h2")) {
        const heading = document.createElement("h2");
        heading.textContent = "Tasks to be Completed";
        toCompleteTasksContainer === null || toCompleteTasksContainer === void 0 ? void 0 : toCompleteTasksContainer.appendChild(heading);
    }
    let taskList = document.querySelector("#toCompleteTasksContainer ul");
    if (!taskList) {
        taskList = document.createElement("ul");
        taskList.className = "list-group";
        toCompleteTasksContainer === null || toCompleteTasksContainer === void 0 ? void 0 : toCompleteTasksContainer.appendChild(taskList);
    }
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex align-items-center";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () => handleTaskCompletion(checkbox));
    const taskText = document.createElement("span");
    taskText.textContent = enteredTaskValue;
    taskText.className = "ms-2";
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    taskList.appendChild(listItem);
    const input = document.getElementById("enteredTask");
    input.value = "";
}
function handleTaskCompletion(checkbox) {
    const completedTasksContainer = document.getElementById("completedTasksContainer");
    const listItem = checkbox.parentElement;
    let completedTasksList = document.querySelector("#completedTasksContainer ul");
    if (!completedTasksList) {
        const heading = document.createElement("h2");
        heading.textContent = "Completed Tasks";
        completedTasksContainer === null || completedTasksContainer === void 0 ? void 0 : completedTasksContainer.appendChild(heading);
        completedTasksList = document.createElement("ul");
        completedTasksList.className = "list-group";
        completedTasksContainer === null || completedTasksContainer === void 0 ? void 0 : completedTasksContainer.appendChild(completedTasksList);
    }
    if (checkbox.checked && listItem) {
        const taskText = listItem.querySelector("span");
        if (taskText) {
            taskText.style.textDecoration = "line-through";
        }
        completedTasksList.appendChild(listItem);
    }
    else if (!checkbox.checked && listItem) {
        const taskText = listItem.querySelector("span");
        if (taskText) {
            taskText.style.textDecoration = "none";
        }
        const todoList = document.querySelector("#toCompleteTasksContainer ul");
        if (todoList) {
            todoList.appendChild(listItem);
        }
    }
}
function moveCompletedTasks() {
    const completedTasksContainer = document.getElementById("completedTasksContainer");
    const completedTasks = document.querySelectorAll('input[type="checkbox"]:checked');
    if (!document.querySelector("#completedTasksContainer h2")) {
        const heading = document.createElement("h2");
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
        const listItem = checkbox.parentElement;
        if (listItem) {
            const taskText = listItem.querySelector("span");
            if (taskText) {
                taskText.style.textDecoration = "line-through";
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
