// sign-up page
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var usersData = [];
var userName = "";

if (localStorage.getItem("usersData") !== null) {
  usersData = JSON.parse(localStorage.getItem("usersData"));
}

var signUpBtn = document.querySelector(".signUpBtn");
if (signUpBtn) {
  signUpBtn.addEventListener("click", function () {
    if (
      nameInput.value === "" ||
      emailInput.value === "" ||
      passwordInput.value === ""
    ) {
      redMessage("all inputs required");
    } else {
      if (addUser()) {
        greenMessage("user added successfully");
        setTimeout(openLogin, 1000);
      } else {
        redMessage("email already exists");
      }
    }
  });
}

function openLogin() {
  window.location.href = "./index.html";
}

function addUser() {
  var newData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  for (var i = 0; i < usersData.length; i++) {
    if (newData.email == usersData[i].email) {
      return false;
    }
  }

  usersData.push(newData);
  clearForm();
  localStorage.setItem("usersData", JSON.stringify(usersData));
  return true;
}

function clearForm() {
  nameInput.value = null;
  emailInput.value = null;
  passwordInput.value = null;
}

// log-in page
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");

var loginBtn = document.querySelector(".loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    if (emailInput.value === "" || passwordInput.value === "") {
      redMessage("all inputs required");
    } else {
      if (checkUser()) {
        window.location.href = "./home.html";
      } else {
        redMessage("wrong email or password");
      }
    }
  });
}

function checkUser() {
  var userName = "";
  for (var i = 0; i < usersData.length; i++) {
    if (
      emailInput.value === usersData[i].email &&
      passwordInput.value === usersData[i].password
    ) {
      userName = usersData[i].name;
      localStorage.setItem("currentUser", userName);
      return userName;
    }
}
  return false;
}

var userName = localStorage.getItem("currentUser");
var box = "";
box = `<h2 class="py-3 fw-bolder">Welcome ${userName}</h2>`;
document.getElementById("welcome").innerHTML = box;


function greenMessage(x) {
  var myBox = "";
  myBox = `<h5 class="pt-3 text-success">${x}</h5>`;

  document.getElementById("message").innerHTML = myBox;
}

function redMessage(x) {
  var myBox = "";
  myBox = `<h5 class="pt-3 text-danger">${x}</h5>`;

  document.getElementById("message").innerHTML = myBox;
}
