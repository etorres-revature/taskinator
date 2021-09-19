const buttonEl = document.querySelector("#save-task");
const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");

const taskFormHandler = (event) => {
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']");
  var taskTypeInput = document.querySelector("select[name='task-type']");

  //task data in object form
  var taskDataObj = {
      name: taskNameInput.value,
      type: taskTypeInput.value
  };

  //send it as an argument to createTaskEl
  createTaskEl(taskDataObj)

  taskNameInput.value = "";
  taskTypeInput.value = "";
};

const createTaskEl = (taskDataObj) => {
      //create li with styling
  let listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //create div to hold task infor and add to list item with styling
  let taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  //add HTML content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";

  listItemEl.appendChild(taskInfoEl);

  //add entire list item to list
  tasksToDoEl.append(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);
