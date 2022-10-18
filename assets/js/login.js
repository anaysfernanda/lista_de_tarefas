const loggedUser = localStorage.getItem("logged");
if (loggedUser) {
  window.location.href = "./tasks.html";
}

function elementValidator(selector) {
  if (selector) {
    return selector;
  }
  alert("Elemento não encontrado.");
}

const buttonLogin = elementValidator(document.getElementById("button-login"));
const formLogin = elementValidator(document.getElementById("form-login"));
const userPassword = elementValidator(
  document.getElementById("input-password")
);
const userEmail = elementValidator(document.getElementById("input-email"));
const iconOpen = elementValidator(document.querySelector("#i-eye"));
const iconClose = elementValidator(document.querySelector("#i-eye3"));
const msgError = elementValidator(document.getElementById("msg-error-regist"));

buttonLogin.addEventListener("mouseover", () => {
  arrow.style.animation = "arrow 0.7s infinite";
});

buttonLogin.addEventListener("mouseleave", () => {
  arrow.style.animation = "none";
});

function toggleEye() {
  if (userPassword.getAttribute("type") === "password") {
    userPassword.setAttribute("type", "text");
    iconOpen.style.display = "none";
    iconClose.style.display = "block";
  } else {
    userPassword.setAttribute("type", "password");
    iconOpen.style.display = "block";
    iconClose.style.display = "none";
  }
}

iconOpen.addEventListener("click", () => {
  toggleEye();
});

iconClose.addEventListener("click", () => {
  toggleEye();
});

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

function validation() {
  let accountList = JSON.parse(localStorage.getItem("users")) || [];

  const userExist = accountList.some(
    (item) =>
      userEmail.value === item.email && userPassword.value === item.password
  );
  return userExist;
}
formLogin.addEventListener("submit", doLogin);
function doLogin(e) {
  e.preventDefault();
  const userExist = validation();
  if (userExist) {
    localStorage.setItem("logged", userEmail.value);
    window.location.href = "./tasks.html";
  }
}
let estado = -1;
buttonLogin.addEventListener("mouseenter", () => {
  const userExist = validation();
  if (userExist) {
    return;
  }
  estado++;
  if (estado === 0) {
    buttonLogin.style.transform = "translate(7em)";
  }
  if (estado === 1) {
    buttonLogin.style.transform = "translate(-7em)";
    estado = -1;
  }
  msgError.setAttribute("style", "display: block");
  msgError.innerHTML =
    "<p class='p-2'>Dados inválidos! Preencha senha e/ou e-mail corretos. Se ainda não tem cadastro, cadastre-se abaixo.</p>";
  setTimeout(() => {
    msgError.setAttribute("style", "display: none");
  }, 6000);
  userEmail.classList.add("is-invalid");
  userPassword.classList.add("is-invalid");
  userEmail.value = "";
  userPassword.value = "";
  userEmail.focus();
});
