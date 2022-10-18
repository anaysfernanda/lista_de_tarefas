function elementValidator(selector) {
  if (selector) {
    return selector;
  }
  alert("Elemento não encontrado.");
}

const userList = localStorage.getItem("users");
let userListArray = JSON.parse(userList) || [];
const buttonLogin = elementValidator(
  document.getElementById("button-cad-login")
);
const arrow = elementValidator(document.getElementById("arrow2"));
const formCadastro = elementValidator(document.getElementById("form-cadastro"));
const inputEmail = elementValidator(document.getElementById("input-cad-email"));
const inputPassword = elementValidator(
  document.getElementById("input-cad-password")
);
const inputConfirm = elementValidator(document.getElementById("input-confirm"));
const iconOpenPassword = elementValidator(document.querySelector("#i-eye"));
const iconOpenConfirm = elementValidator(document.querySelector("#i-eye2"));
const iconClosePassword = elementValidator(document.querySelector("#i-eye3"));
const iconCloseConfirm = elementValidator(document.querySelector("#i-eye4"));

const containerAlert = elementValidator(
  document.getElementById("container-alert-account")
);
const msgError = elementValidator(document.getElementById("msg-error-regist"));
let validPassword = false;
let validConfirm = false;
let validEmail = false;

const myAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert-size alert alert-${type} alert-dismissible alert-close" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  containerAlert.append(wrapper);
};

function closeAlert() {
  setTimeout(() => {
    const alertClose = document.getElementsByClassName("alert-close");
    for (let index = 0; index < alertClose.length; index++) {
      alertClose[index].style.display = "none";
    }
  }, 5000);
}

formCadastro.addEventListener("submit", submitFormUser);
function submitFormUser(e) {
  e.preventDefault();

  if (validPassword && validConfirm && validEmail) {
    const login = {
      email: inputEmail.value,
      password: inputPassword.value,
      passwordConfirm: inputConfirm.value,
    };

    if (!isEmailValid(login.email)) return;

    userListArray.push(login);
    localStorage.setItem("users", JSON.stringify(userListArray));

    window.location.href = "./login.html";
  } else {
    myAlert("Preencha as senhas corretamente.", "danger");
    closeAlert();
  }
}

buttonLogin.addEventListener("mouseover", () => {
  arrow.style.animation = "arrow2 0.7s infinite";
});

buttonLogin.addEventListener("mouseleave", () => {
  arrow.style.animation = "none";
});

function showPassword() {
  if (inputPassword.getAttribute("type") === "password") {
    inputPassword.setAttribute("type", "text");
    inputConfirm.setAttribute("type", "text");
    iconOpenPassword.style.display = "none";
    iconClosePassword.style.display = "block";
    iconOpenConfirm.style.display = "none";
    iconCloseConfirm.style.display = "block";
  } else {
    inputPassword.setAttribute("type", "password");
    inputConfirm.setAttribute("type", "password");
    iconOpenPassword.style.display = "block";
    iconClosePassword.style.display = "none";
    iconOpenConfirm.style.display = "block";
    iconCloseConfirm.style.display = "none";
  }
}

iconOpenPassword.addEventListener("click", () => {
  showPassword();
});

iconOpenConfirm.addEventListener("click", () => {
  showPassword();
});

iconClosePassword.addEventListener("click", () => {
  showPassword();
});

iconCloseConfirm.addEventListener("click", () => {
  showPassword();
});

buttonLogin.addEventListener("click", () => {
  if (inputEmail.value === "") {
    inputEmail.classList.add("is-invalid");
    myAlert("Preencha o e-mail.", "danger");
    closeAlert();
    validEmail = false;
  } else {
    validEmail = true;
    inputEmail.classList.remove("is-invalid");
  }
});

buttonLogin.addEventListener("click", () => {
  if (inputPassword.value.length <= 5) {
    inputPassword.classList.add("is-invalid");
    myAlert("A senha precisa ter no mínimo 6 caracteres.", "danger");
    closeAlert();
    validPassword = false;
  } else {
    validPassword = true;
    inputPassword.classList.remove("is-invalid");
  }
});

buttonLogin.addEventListener("click", () => {
  if (
    inputPassword.value !== inputConfirm.value ||
    inputPassword.value === "" ||
    inputConfirm.value === ""
  ) {
    inputPassword.classList.add("is-invalid");
    inputConfirm.classList.add("is-invalid");
    myAlert("As senhas não conferem.", "danger");
    closeAlert();
    validConfirm = false;
  } else {
    validConfirm = true;
    inputPassword.classList.remove("is-invalid");
    inputConfirm.classList.remove("is-invalid");
  }
});

function isEmailValid(email) {
  if (userListArray.some((user) => email === user.email)) {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML =
      "<p class='p-2'>E-mail já cadastrado. </br><a href='./login.html'>Clique aqui e faça o login</a> ou cadastre novo e-mail</p>";
    inputEmail.focus();
    return false;
  }
  return true;
}
