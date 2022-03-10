import { addTask, saveTasks, getTasks } from "../models/domainObjects.mjs";
import {
  taskListHTMLSelector,
  addTaskInputSelector,
  completedCSSClass,
  checkedCSSClass,
  checkHideShowList,
} from "../models/defines.mjs";

export function task2HTMLElement(taskIndex, taskObject) {
  // Creo los elementos HTML
  const listHTMLItem = document.createElement("li");
  const pHTMLItem = document.createElement("p");
  const inputCheckboxHTMLItem = document.createElement("input");
  // Les proporciono valores
  inputCheckboxHTMLItem.type = "checkbox";
  inputCheckboxHTMLItem.checked = taskObject.completed;
  pHTMLItem.innerHTML = taskObject.taskName;
  // Los anido
  listHTMLItem.append(pHTMLItem, inputCheckboxHTMLItem);
  // Aplico estilos si está completada
  if (taskObject.completed) {
    listHTMLItem.classList.add(completedCSSClass);
  } else {
    listHTMLItem.classList.remove(completedCSSClass);
  }
  // Añado el manejador de eventos
  inputCheckboxHTMLItem.addEventListener("click", (event) => {
    const tasks = getTasks();
    tasks[taskIndex].completed = event.target.checked;
    saveTasks(tasks);
  });
  return listHTMLItem;
}

export function updateTasksHTML(CSSselector, tasksArray) {
  const listHTMLElement = document.querySelector(CSSselector);
  listHTMLElement.innerText = "";
  if (tasksArray.length > 0) {
    for (let index in tasksArray) {
      listHTMLElement.appendChild(task2HTMLElement(index, tasksArray[index]));
    }
  } else {
    listHTMLElement.innerText = "Add your first task...";
  }
}

export function taskAddButtonClickHandler(event) {
  const input = document.querySelector(addTaskInputSelector);
  event.preventDefault();
  const newTask = {
    taskName: input.value,
    completed: false,
  };
  addTask(newTask);
  updateTasksHTML(taskListHTMLSelector, getTasks());
}

hideShow.addEventListener("click", (event) => {
  checkclickhandler(hideShow);
});

function checkclickhandler(hideShow) {
  const listaOcultar = document.querySelector(taskListHTMLSelector);
  const tareaHecha = listaOcultar.querySelectorAll(".completed");
  console.log(tareaHecha);
  console.log(listaOcultar.completed);
  if (hideShow.checked) {
    for (let item of tareaHecha) {
      console.log(item);
      item.className += " checked";
    }
  } else {
    for (let item of tareaHecha) {
      console.log(item);
      item.className -= " checked";
    }
  }
}

//TODO solo enseña y oculta una vez
