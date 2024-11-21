document.addEventListener('DOMContentLoaded', () => {

    const addTaskButton = document.getElementById('btnAddTask') as HTMLButtonElement;
    const toCompleteListGroup = document.getElementById('toCompleteListGroup') as HTMLUListElement;

    // add task button will be clicked and the task will be added to the toCompleteListGroup
    addTaskButton.addEventListener('click', addTask);

    // when task is created the task will add a checkbox linked to the task on the left side of the task
    // the text in the enteredText textbox will be cleared and focus back to the enteredText textbox
    function addTask() {
        // input validation
        let enteredTask = document.getElementById('enteredTask') as HTMLInputElement;
        let enteredTaskValue = enteredTask.value.trim();
        if (enteredTaskValue.length === 0) {
            return alert('Please enter a task');
        }
        console.log(enteredTaskValue);
        // createTask(enteredTaskValue);
    }
}
);



function createTask(enteredTaskValue: string) {
    // create a div element
    let taskDiv: HTMLDivElement = document.createElement('div');

    // create an h2 element
    let toCompleteListGroup: HTMLHeadingElement = document.createElement('h2');
    toCompleteListGroup.textContent = "Tasks to be Completed";

    // Create checkbox
    let checkbox = document.createElement('checkbox') as HTMLInputElement;
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-2';

    // Create list item container
    let taskListElement: HTMLUListElement = document.createElement('ul');
    // this specified class name is necessary to enable the list to be styled by bootstrap
    taskListElement.className = 'list-group-item d-flex align-items-center';

    // add entered task to the list item
    let taskText = document.createElement('li');
    taskText.className = 'task-text';
    taskText.textContent = enteredTaskValue.trim();

    // add span within list item to hold the task text
    let taskSpan = document.createElement('span');
    taskSpan.textContent = enteredTaskValue.trim();

    // add h2, checkbox, and list item to the taskDiv
    taskDiv.appendChild(toCompleteListGroup);
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskListElement);
    taskDiv.appendChild(taskText);

    // add taskDiv to the toCompleteListGroup
    toCompleteListGroup.append(taskDiv);

    // Add checkbox click handler
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskText.style.textDecoration = 'line-through';
        } else {
            taskText.style.textDecoration = 'none';
        }
    });
    // Clear input and put cursor back in input box
    let enteredTask = document.getElementById('enteredTask') as HTMLInputElement;
    enteredTask.value = "";
    enteredTask.focus();
}
// when the checkbox is clicked the task will be moved to the completedListGroup list
// with strikethrough formatting, grayed out, and the checkbox will be checked


// create a function that clears completedListGroup list

// add option to store tasks in local storage
