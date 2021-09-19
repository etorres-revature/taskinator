const buttonEl = document.querySelector("#save-task");
const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");

const createTaskHandler = (event) => {
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //create li with styling
  let listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //create div to hold task infor and add to list item with styling
  let taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  //add HTML content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskNameInput +
    "</h3><span class='task-type'>" +
    taskTypeInput +
    "</span>";

  listItemEl.appendChild(taskInfoEl);

  //add entire list item to list
  tasksToDoEl.append(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
