const formEl = document.querySelector("#task-form");
const pageContentEl = document.querySelector("#page-content")
const tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIDCounter = 0;

const taskFormHandler = (event) => {
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  if (!taskNameInput || !taskTypeInput) {
    alert("Please fill the form out in its entirety!!");
    return false;
  }

  //task data in object form
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  //send it as an argument to createTaskEl
  createTaskEl(taskDataObj);

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

const taskButtonHandler = (event) => {
    // get target element from event
    const targetEl = event.target;

    //edit button was clicked
    if(targetEl.matches(".edit-btn")) {
        const taskID = event.target.getAttribute("data-task-id");
        editTask(taskID)
    }

    // delete button was clicked
    if (targetEl.matches(".delete-btn")){

        const taskID = event.target.getAttribute("data-task-id");
        deleteTask(taskID)
    }
}

const editTask = (taskID) =>{
    // get task list element
    const taskSelected = document.querySelector(".task-item[data-task-id='"+ taskID + "']")

    //get content from task name and type
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    let taskType = taskSelected.querySelector("span.task-type").textContent;

    // add value above to form
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task"

    formEl.setAttribute("data-task-id", taskID)

}

const deleteTask = (taskID) => {
    const taskSelected = document.querySelector(".task-item[data-task-id='"+ taskID + "']")
    taskSelected.remove();
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler)
