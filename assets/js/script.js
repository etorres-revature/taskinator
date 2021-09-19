const buttonEl = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector("#tasks-to-do");

buttonEl.addEventListener("click", () => {
  let listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "New Task to TASK-inate!!";
  tasksToDoEl.append(listItemEl);
});
