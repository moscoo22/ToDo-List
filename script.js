// Initialize the task list array
let tasks = [];

// Function to render the task list
function renderTaskList() {
    // Get the <ul> element with the ID 'taskList'
    const taskList = document.getElementById('taskList');

    // Clear the previous content of the list before re-rendering
    taskList.innerHTML = '';

    // Loop through each task in the 'tasks' array
    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        // Create a <div> to contain the task text and icons
        const taskContentDiv = document.createElement('div');
        taskContentDiv.className = 'task-content';

        // Create a <span> element to hold the task text
        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        // Apply a strike-through text decoration if the task is completed
        taskText.style.textDecoration = task.completed ? 'line-through' : 'none';

        // Replace "Complete" button with a checkmark icon
        const completeIcon = document.createElement('i');
        completeIcon.className = task.completed ? 'fas fa-check-circle complete-icon' : 'far fa-circle incomplete-icon';

        // Call the toggleTaskCompletion function when the checkmark icon is clicked
        completeIcon.onclick = () => toggleTaskCompletion(index);

        // Replace "Edit" button with an edit icon
        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit edit-icon';

        // Call the toggleTaskEditing function when the edit icon is clicked
        editIcon.onclick = () => toggleTaskEditing(index);

        // Replace "Delete" button with a trash icon
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash delete-icon';

        // Call the deleteTask function when the trash icon is clicked
        deleteIcon.onclick = () => deleteTask(index);

        if (!task.editing) {
            // If the task is not in the editing state:
            // Append the task text and icons to the task content <div>
            taskContentDiv.appendChild(taskText);
            taskContentDiv.appendChild(completeIcon);
            taskContentDiv.appendChild(editIcon);
            taskContentDiv.appendChild(deleteIcon);
        } else {
            // If the task is in the editing state:

            // Render an input field for editing
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = task.text;

            // Add icons for complete and discard
            const completeIcon = document.createElement('i');
            completeIcon.className = 'fas fa-check-circle complete-icon';

            // Call the saveTaskEditing function when the checkmark icon is clicked
            completeIcon.onclick = () => saveTaskEditing(index, editInput.value);

            // Append the input field and icons to the task content <div>
            taskContentDiv.appendChild(editInput);
            taskContentDiv.appendChild(completeIcon);

            const discardIcon = document.createElement('i');
            discardIcon.className = 'fas fa-times-circle discard-icon';

            // Call the cancelTaskEditing function when the times icon is clicked
            discardIcon.onclick = () => cancelTaskEditing(index);

            // Append the discard icon to the task content <div>
            taskContentDiv.appendChild(discardIcon);
        }

        // Append the task content <div> to the <li> element
        li.appendChild(taskContentDiv);

        // Append the <li> element to the task list (<ul>)
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    // Get the input field element
    const taskInput = document.getElementById('taskInput');

    // Get the value (text) entered by the user in the input field
    const text = taskInput.value.trim();

    // Check if the input field is not empty
    if (text !== '') {
        // Add the new task object to the 'tasks' array with default properties
        tasks.push({ text, completed: false });

        // Clear the input field after adding the task
        taskInput.value = '';

        // Render the updated task list on the webpage
        renderTaskList();
    }
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
    // Toggle the 'completed' property of the task at the given index
    tasks[index].completed = !tasks[index].completed;

    // Render the updated task list on the webpage
    renderTaskList();
}

// Function to toggle task editing
function toggleTaskEditing(index) {
    // Loop through each task in the 'tasks' array
    tasks.forEach((task, i) => {
        // Set the 'editing' property to true for the task at the given index
        task.editing = i === index;
    });

    // Render the updated task list on the webpage
    renderTaskList();
}

// Function to save task editing
function saveTaskEditing(index, newText) {
    // Update the 'text' property of the task at the given index
    tasks[index].text = newText.trim();

    // Set the 'editing' property to false for the task at the given index
    tasks[index].editing = false;

    // Render the updated task list on the webpage
    renderTaskList();
}

// Function to cancel task editing
function cancelTaskEditing(index) {
    // Set the 'editing' property to false for the task at the given index
    tasks[index].editing = false;

    // Render the updated task list on the webpage
    renderTaskList();
}

// Function to delete a task
function deleteTask(index) {
    // Remove the task at the given index from the 'tasks' array
    tasks.splice(index, 1);

    // Render the updated task list on the webpage
    renderTaskList();
}

// Initial rendering of the task list
renderTaskList();
