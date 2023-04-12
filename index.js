// index.js
import _ from "lodash";
import "./style.css";
import "./modules/AddTask.js";
import { clearTasks } from "./modules/Checkbox.js";

function component() {
  const demo = document.getElementById("Demo");
  demo.className = "list-item-2";
  demo.innerHTML = `
  <span id="demo">Demo</span>
  <button id="reload">
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 0 0-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 0 1 655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 0 1 279 755.2a342.16 342.16 0 0 1-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 0 1 109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"></path></svg>
  </button>`;
  demo.style = "justify-content: space-between";

  const addTask = document.getElementById("Add-to-list");
  addTask.className = "list-item-2";
  addTask.innerHTML = `
  <form id="add-task-form">
    <input type="text" placeholder="Add to your list..." id="add-task"/>
  </form>
  <button id="submit-task">
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M16,13h-6v-3l-5,4l5,4v-3h7c0.553,0,1-0.447,1-1V5h-2V13z"></path></svg>
  </button>`;
  addTask.style = "padding: 0 10px;";

  const remove = document.getElementById("Remove");
  const clearCompleted = document.createElement("button");
  clearCompleted.id = "remove";
  clearCompleted.innerHTML = "Clear all completed";
  clearCompleted.onclick = clearTasks;
  remove.className = "list-item-2";
  remove.style = "justify-content: center";
  remove.appendChild(clearCompleted);
}

document.body.appendChild(component());

// AddTask.js
import { checkTaskDone } from "./Checkbox.js";

export class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const set = (list) => {
  localStorage.setItem("toDoList", JSON.stringify(list));
};

const lists = localStorage.getItem("toDoList");
const get = JSON.parse(lists);

let tasks = [];

const toDoList = document.getElementById("to-do-list");
toDoList.classList.add("list");

export const display = () => {
  const lists = localStorage.getItem("toDoList");
  const get = JSON.parse(lists);

  if (get !== null) {
    toDoList.innerHTML = "";
    tasks = get;
    toDoList.style.display = "block";
    tasks.forEach((item, indexNo) => {
      item.index = indexNo;
      const listItem = document.createElement("li");
      listItem.className = "list-item";

      const completed = document.createElement("button");
      completed.className = "todo";
      completed.onclick = checkTaskDone;

      const description = document.createElement("span");
      description.className = "task-item";
      description.textContent = item.description;

      if (item.completed === true) {
        listItem.classList.add("completed");
        completed.innerHTML =
          '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h10a1.5 1.5 0 001.5-1.5V8a.5.5 0 00-1 0v5a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h8a.5.5 0 000-1H3A1.5 1.5 0 001.5 3v10z" clip-rule="evenodd"></path></svg>';
        description.style.textDecoration = "line-through";
      }
      if (item.completed === false) {
        listItem.classList.add("uncompleted");
        completed.innerHTML =
          '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M7,5C5.897,5,5,5.897,5,7v10c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V7c0-1.103-0.897-2-2-2H7z M7,17V7h10l0.002,10H7z"></path></svg>';
        description.style.textDecoration = "none";
      }
      // Edit Buttons
      const editBtnSave = document.createElement("button");
      editBtnSave.className = "edit-btn-save";
      editBtnSave.innerHTML = "<p>Save</p>";
      editBtnSave.style.display = "none";

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.style.marginLeft = "auto";
      editBtn.innerHTML =
        '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path></svg>';

      // Edit function
      const editItemSave = (e) => {
        e.preventDefault();
        const newValue = document.querySelector("#edit");
        item.description = newValue.value;
        set(tasks);
        display();
        editBtnSave.style.display = "none";
        editBtn.style.display = "";
      };

      const editItemClick = (e) => {
        const originalText = e.currentTarget.parentNode.children[1];
        const writeEdit = document.createElement("input");
        writeEdit.id = "edit";
        writeEdit.value = originalText.innerHTML;
        originalText.innerHTML = "";
        originalText.parentNode.insertBefore(
          writeEdit,
          originalText.nextSibling
        );
        editBtnSave.style.display = "";
        editBtn.style.display = "none";
      };

      editBtn.onclick = editItemClick;
      editBtnSave.onclick = editItemSave;

      const deleteTask = () => {
        tasks.splice(indexNo, 1);
        set(tasks);
        display();
      };

      const deleteItem = document.createElement("button");
      deleteItem.className = "delete-item";
      deleteItem.innerHTML =
        '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path></svg>';
      deleteItem.addEventListener("click", (e) => deleteTask);

      const move = document.createElement("button");
      move.className = "move-item";
      move.innerHTML =
        '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"></path></svg>';
      listItem.appendChild(completed);
      listItem.appendChild(description);
      listItem.appendChild(editBtnSave);
      listItem.appendChild(editBtn);
      listItem.appendChild(deleteItem);
      listItem.appendChild(move);
      toDoList.appendChild(listItem);
    });
    set(tasks);
  }
};

window.addEventListener("DOMContentLoaded", (e) => {
  display();
  const form = document.getElementById("add-task-form");
  const taskInput = document.getElementById("add-task");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const completed = false;
    const index = tasks.length;
    const description = taskInput.value;
    const task = new Task(description, completed, index);
    tasks.push(task);
    taskInput.value = "";
    set(tasks);
    display();
  });

  const addTask = () => {
    e.preventDefault();
    const completed = false;
    const index = tasks.length;
    const description = taskInput.value;
    const task = new Task(description, completed, index);
    tasks.push(task);
    taskInput.value = "";
    set(tasks);
    display();
  };

  const enter = document.querySelector("#submit-task");
  enter.addEventListener("click", (e) => addTask);
});

//Checkbox.js

import { display } from "./AddTask.js";

export const checkTaskDone = (e) => {
  const set = (list) => {
    localStorage.setItem("toDoList", JSON.stringify(list));
  };
  const lists = localStorage.getItem("toDoList");
  const get = JSON.parse(lists);

  let tasks = [];

  if (get !== null) {
    tasks = get;
  }

  const todoList = e.currentTarget.parentNode;
  const targetBox = e.currentTarget.parentNode.children[1].innerHTML;

  if (todoList.classList.contains("completed")) {
    tasks.forEach((taskItem) => {
      if (taskItem.description === targetBox) {
        taskItem.completed = false;
        set(tasks);
      }
    });
    display();
  }

  if (todoList.classList.contains("uncompleted")) {
    tasks.forEach((taskItem) => {
      if (taskItem.description === targetBox) {
        taskItem.completed = true;
        set(tasks);
      }
    });
    display();
  }
};

export const clearTasks = () => {
  const set = (list) => {
    localStorage.setItem("toDoList", JSON.stringify(list));
  };

  const lists = localStorage.getItem("toDoList");
  const get = JSON.parse(lists);

  let tasks = [];

  if (get !== null) {
    tasks = get;
  }
  const filteredList = tasks.filter((item) => item.completed === false);
  set(filteredList);
  display();
};
