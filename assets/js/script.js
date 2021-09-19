const buttonEl = document.querySelector("#save-task");
const formEl = document.querySelector("#task-form")
const tasksToDoEl = document.querySelector("#tasks-to-do");

const createTaskHandler = (event) => {
    event.preventDefault();
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "New Task to TASK-inate!!";
    tasksToDoEl.append(listItemEl);
}

formEl.addEventListener("submit", createTaskHandler);
