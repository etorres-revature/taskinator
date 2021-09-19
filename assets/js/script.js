const formEl = document.querySelector("#task-form");
const pageContentEl = document.querySelector("#page-content");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");
let taskIDCounter = 0;
let tasks = [];

const taskFormHandler = (event) => {
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  if (!taskNameInput || !taskTypeInput) {
    alert("Please fill the form out in its entirety!!");
    return false;
  }

  let isEdit = formEl.hasAttribute("data-task-id");

  // has data attribute, get task id and call func to complete edit
  if (isEdit) {
    const taskID = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskID);
  }
  // no data attribute, create object and pass to create TaskEl function
  else {
    //task data in object form
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
  }

  formEl.reset();
};

const createTaskEl = (taskDataObj) => {
  //create li with styling
  let listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIDCounter);

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

  taskDataObj.id = taskIDCounter;

  tasks.push(taskDataObj);

  // ust createTaskAction to create edit/delete buttons and status change dropdown
  const taskActionEl = createTaskActions(taskIDCounter);
  // append the delete/edit buttons and status change dropdown
  listItemEl.appendChild(taskActionEl);

  //add entire list item to list
  tasksToDoEl.append(listItemEl);

  // increase task counter for next unique id
  taskIDCounter++;
};

const createTaskActions = (taskID) => {
  let actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  const editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskID);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskID);

  actionContainerEl.appendChild(deleteButtonEl);

  // create select dropdown to change status
  const statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskID);

  const statusChoices = ["To Do", "In Progress", "TASK-inated!!"];

  for (let i = 0; i < statusChoices.length; i++) {
    let statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
};

const taskStatusChangeHandler = (event) => {
  event.preventDefault();

  const targetEl = event.target;

  // get the task item id
  const taskID = targetEl.getAttribute("data-task-id");

  //get the currently selected option's value and convert it to lowercase
  const statusValue = targetEl.value.toLowerCase();

  // find the parent task item element based on the id
  const taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskID + "']"
  );

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "task-inated!!") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  //update task's in tasks array
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskID)) {
      tasls[i].status = statusValue;
    }
  }
};

const taskButtonHandler = (event) => {
  // get target element from event
  const targetEl = event.target;

  //edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    const taskID = event.target.getAttribute("data-task-id");
    editTask(taskID);
  }

  // delete button was clicked
  if (targetEl.matches(".delete-btn")) {
    const taskID = event.target.getAttribute("data-task-id");
    deleteTask(taskID);
  }
};

const editTask = (taskID) => {
  // get task list element
  const taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskID + "']"
  );

  //get content from task name and type
  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  let taskType = taskSelected.querySelector("span.task-type").textContent;

  // add value above to form
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "Re-TASK-inate";

  formEl.setAttribute("data-task-id", taskID);
};

const completeEditTask = (taskName, taskType, taskID) => {
  // find the matching task list item
  const taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskID + "']"
  );

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // loop through tasks array and task object with new content
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskID)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  alert("This task has been successfully updated...");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "TASK-inate!";
};

const deleteTask = (taskID) => {
  const taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskID + "']"
  );
  taskSelected.remove();
};

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
