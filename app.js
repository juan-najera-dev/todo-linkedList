import { LinkedList } from "./modules/LinkedList.js";
import { Queue } from "./modules/Queue.js";

// ****** select items **********

const form = document.querySelector(".tasks-form");
const alert = document.querySelector(".alert");
const title = document.getElementById("task-title");
const container = document.querySelector(".tasks-container");
const list = document.querySelector(".tasks-list");
const clearBtn = document.querySelector(".clear-btn");
const undoBtn = document.getElementById("undo-btn");

let taskList; // linkedList variable
let taskQueue; // Queue task variable

// ****** event listeners **********

form.addEventListener("submit", addItem); // submit form
clearBtn.addEventListener("click", clearItems); // clear list
undoBtn.addEventListener("click", qeueRemoveItem); // remove item from queue
window.addEventListener("DOMContentLoaded", setupItems); // display items onload

// ****** local storage **********

function getLocalStorage() {
  let taskList = JSON.parse(localStorage.getItem("tasks"));
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

// Load local Storage
function setupItems() {
  let items = getLocalStorage();

  items.forEach(function (item) {});

  if (items.length > 0) {
    items.forEach(function (item) {
      const id = item.id;
      const value = item.value;
      const node = { id, value };

      createListItem(item.id, item.value);
      if (taskList != null) {
        taskList.push(node);
      } else {
        taskList = new LinkedList(node);
      }
    });
    // console.log("taskList values: ", taskList.toString());
    // console.log("taskList lenght: ", taskList.length());
    container.classList.add("show-container");
  }
}

function addToLocalStorage(id, value) {
  const task = { id, value };
  let items = getLocalStorage();
  items.push(task);
  localStorage.setItem("tasks", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(items));
}

// ******* Qeue ***********

function qeueRemoveItem(e) {
  let item;
  e.preventDefault();
  if (taskQueue != null && taskQueue.length() > 0) {
    item = taskQueue.desencole();
    // console.log("queue values: ", taskQueue.toString());
    // console.log("queue lenght: ", taskQueue.length());

    const id = item.value.id;
    //console.log("id", id);
    const element = document.querySelector(`[data-id='${item.value.id}']`);
    //console.log("value", item.value.value);
    //console.log(element);

    list.removeChild(element);

    taskList.delete(id);

    if (list.children.length === 0) {
      container.classList.remove("show-container");
    }
    displayAlert("tarea eliminada", "danger");

    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);

    // if (taskList.length() > 0) {
    // 	console.log("taskList values: ", taskList.toString());
    // 	console.log("taskList lenght: ", taskList.length());
    // }
  }
}

// add item
function addItem(e) {
  e.preventDefault();
  const value = title.value;
  const id = new Date().getTime().toString();

  if (value !== "") {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("task-item");
    element.innerHTML = `
	<div style="display:flex; flex-direction: row; align-items: center; justify-content:space-between;">
		<h5 class="title">${value}</h5>
		<input class="completed" type="checkbox">
		<button type="button" class="delete-btn">
			<i class="fas fa-trash"></i>
		</button>
		</div>
		`;
    // add event listeners to delete button;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    // add event listeners to checkbox
    const completed = element.querySelector(".completed");
    completed.addEventListener("click", completedTask);

    // append child
    list.appendChild(element);
    // display alert
    displayAlert("tarea añadida a la lista", "success");
    // show container
    container.classList.add("show-container");

    // set linked List

    if (taskList != null) {
      taskList.push({ id, value });
    } else {
      taskList = new LinkedList({ id, value });
    }
    // console.log("taskList values: ", taskList.toString());
    // console.log("taskList lenght: ", taskList.length());

    // set queue

    if (taskQueue != null) {
      taskQueue.encole({ id, value });
    } else {
      taskQueue = new Queue();
      taskQueue.encole({ id, value });
    }

    // console.log("queue values: ", taskQueue.toString());
    // console.log("queue lenght: ", taskQueue.length());

    // set local storagevalue
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else {
    displayAlert("Ingrese los campos", "danger");
  }
}

// create item from local storage
function createListItem(listId, listValue) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = listId;
  element.setAttributeNode(attr);
  element.classList.add("task-item");
  element.innerHTML = `
  <div style="display:flex; flex-direction: row; align-items: center; justify-content:space-between;">
  <h5 class="title">${listValue}</h5>
  <input class="completed" type="checkbox">
  <button type="button" class="delete-btn">
    <i class="fas fa-trash"></i>
  </button>
  </div>
  `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  // const editBtn = element.querySelector(".edit-btn");
  // editBtn.addEventListener("click", editItem);
  const completed = element.querySelector(".completed");
  completed.addEventListener("click", completedTask);

  // append child
  list.appendChild(element);
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  taskList.delete(id);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("tarea eliminada", "danger");

  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);

  // console.log("taskList values: ", taskList.toString());
  // console.log("taskList lenght: ", taskList.length());
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".task-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("lista de tareas vacia", "danger");
  setBackToDefault();
  localStorage.removeItem("tasks");
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// Reset inputs and flags
function setBackToDefault() {
  const str = document.getElementById("task-title");
  str.value = "";
}

function completedTask(e) {
  const element = e.currentTarget.parentElement;
  element.classList.toggle("checked-task");
  const card = e.currentTarget.parentElement.parentElement;
  card.classList.toggle("checked-card");
}
