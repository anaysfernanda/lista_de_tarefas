let loggedInUser = localStorage.getItem("logged");

if (!loggedInUser) {
  window.location.href = "./login.html";
  alert("Faça seu login!");
}

function elementValidator(selector) {
  if (selector) {
    return selector;
  }
  console.log("Elemento não encontrado.");
}

let listTask = JSON.parse(localStorage.getItem(loggedInUser)) || [];
let formTask = elementValidator(document.getElementById("form-tasks"));
const inputTitle = elementValidator(document.getElementById("input-title"));
const inputDescription = elementValidator(
  document.getElementById("input-description")
);
const iconAdd = elementValidator(document.getElementById("icon-add"));
const btnAdd = elementValidator(document.getElementById("button-add-task"));
const accordion = elementValidator(document.getElementById("card-list"));
const btnDelete = elementValidator(document.getElementById("btnDelete"));
const btnEdit = elementValidator(document.getElementById("btnEdit"));
const btnLogout = elementValidator(document.getElementById("btnConfirmLogout"));
const editTitle = elementValidator(document.getElementById("recipient-name"));
const editDescription = elementValidator(
  document.getElementById("message-text")
);
const containerAlert = elementValidator(
  document.getElementById("container-alert-task")
);
const modalDelete = new bootstrap.Modal("#modalDelete");
const modalEdit = new bootstrap.Modal("#modalEdit");
const modalLogout = new bootstrap.Modal("#modalLogout");

btnAdd.addEventListener("mouseover", () => {
  iconAdd.style.animation = "rotate 1s ease-in-out";
});

btnAdd.addEventListener("mouseleave", () => {
  iconAdd.style.animation = "none";
});

window.addEventListener("load", showTaskList);
function showTaskList() {
  accordion.innerHTML = ""; //Parar de duplicar tarefas;
  accordion.innerHTML = generateTaskList(listTask);
}

const myAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert-size alert alert-${type} alert-dismissible" role="alert alert-close">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  containerAlert.append(wrapper);
};

function closeAlert() {
  setTimeout(() => {
    const alertClose = document.querySelectorAll(".alert-close");
    alertClose.forEach((index) => {
      index.style.display = "none";
    });
  }, 2000);
}

formTask.addEventListener("submit", addTask);
function addTask(e) {
  e.preventDefault();
  if (inputTitle.value == "" || inputDescription.value == "") {
    myAlert("Adicione o nome e/ou a descrição da tarefa.", "danger");
    closeAlert();
  } else {
    const newTask = {
      id: generateNewId(),
      title: inputTitle.value,
      description: inputDescription.value,
    };

    listTask.push(newTask);
    localStorage.setItem(loggedInUser, JSON.stringify(listTask));

    showTaskList();

    inputTitle.value = "";
    inputDescription.value = "";
  }
}

function generateAccordion(element, index) {
  return `<div class="card w-100 mb-1" id="accordion-list">
    <div class="card-body" id="${element.id}">
      <h5 class="card-title font-size">#${index + 1}<span class="ms-3">${
    element.title
  }</span></h5>
      <p class="card-text alert-size mb-2 text-secondary">${element.description}
      </p>
    <button
      class="me-1 btn alert-size btn-secondary"
      onclick="showModalEdit(${element.id})"
    >
      Editar
    </button>
    <button
      class="btn btn-danger alert-size"
      onclick="showModalDelete(${element.id})">
      Excluir
    </button>
    </div>
  </div>`;
}

function generateTaskList(newListTask) {
  let addHtml = "";
  newListTask.forEach((element, index) => {
    addHtml += generateAccordion(element, index);
  });
  return addHtml;
}

function showModalDelete(id) {
  modalDelete.show();
  btnDelete.addEventListener("click", () => deleteTask(id));
}

function deleteTask(id) {
  const listIndex = listTask.findIndex((task) => task.id === id);

  if (listIndex < 0) {
    return;
  }
  listTask.splice(listIndex, 1);

  localStorage.setItem(loggedInUser, JSON.stringify(listTask));

  showTaskList();
  modalDelete.hide();
}

function showModalEdit(id) {
  modalEdit.show();
  let idEdit = listTask.find((data) => data.id === id);
  editTitle.value = idEdit.title;
  editDescription.value = idEdit.description;
  btnEdit.addEventListener("click", () => editTask(id));
}

function editTask(id) {
  const listIndex = listTask.findIndex((value) => value.id === id);
  if (listIndex >= 0) {
    const newListTask = listTask.map((task) => {
      if (task.id === id) {
        task.title = editTitle.value;
        task.description = editDescription.value;
        return task;
      } else {
        return task;
      }
    });

    localStorage.setItem(loggedInUser, JSON.stringify(newListTask));
  }
  showTaskList();
  modalEdit.hide();
}

function generateNewId() {
  return Date.now();
}

btnLogout.addEventListener("click", () => {
  localStorage.setItem("logged", "");
  window.location.href = "./login.html";
});
