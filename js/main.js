"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('btnAddTask');
    const toCompleteListGroup = document.getElementById('toCompleteListGroup');
    addTaskButton.addEventListener('click', addTask);
    function addTask() {
        let enteredTask = document.getElementById('enteredTask');
        let enteredTaskValue = enteredTask.value.trim();
        if (enteredTaskValue.length === 0) {
            return alert('Please enter a task');
        }
        console.log(enteredTaskValue);
        createTask(enteredTaskValue);
    }
});
function createTask(enteredTaskValue) {
    let taskDiv = document.createElement('div');
    let toCompleteListGroup = document.createElement('h2');
    toCompleteListGroup.textContent = "Tasks to be Completed";
    let checkbox = document.createElement('checkbox');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-2';
    let taskListElement = document.createElement('ul');
    taskListElement.className = 'list-group-item d-flex align-items-center';
    let taskText = document.createElement('li');
    taskText.className = 'task-text';
    taskText.textContent = enteredTaskValue.trim();
    let taskSpan = document.createElement('span');
    taskSpan.textContent = enteredTaskValue.trim();
    taskDiv.appendChild(toCompleteListGroup);
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskListElement);
    taskDiv.appendChild(taskText);
    toCompleteListGroup.append(taskDiv);
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskText.style.textDecoration = 'line-through';
        }
        else {
            taskText.style.textDecoration = 'none';
        }
    });
    let enteredTask = document.getElementById('enteredTask');
    enteredTask.value = "";
    enteredTask.focus();
}
