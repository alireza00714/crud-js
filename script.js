const fields = 4;
let correctFields = [false, false, false, false];
let users = [];

//add
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("emailaddress");
const phone = document.getElementById("phonenumber");

//edit
const fnameE = document.getElementById("fname-e");
const lnameE = document.getElementById("lname-e");
const emailE = document.getElementById("emailaddress-e");
const phoneE = document.getElementById("phonenumber-e");

//resets the inputs of add and edit forms
const resetInputs = () => {
  fname.value = "";
  lname.value = "";
  email.value = "";
  phone.value = "";
  fnameE.value = "";
  lnameE.value = "";
  emailE.value = "";
  phoneE.value = "";
  correctFields = [false, false, false, false];
  fname.classList.remove("border-error");
  lname.classList.remove("border-error");
  email.classList.remove("border-error");
  phone.classList.remove("border-error");
  document.getElementById("fname-error").textContent = "";
  document.getElementById("lname-error").textContent = "";
  document.getElementById("email-error").textContent = "";
  document.getElementById("phone-error").textContent = "";
};

function User(firstName, lastName, email, phone) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.phone = phone;
  return this;
}

function addUser(name, lastName, email, phone) {
  const user = new User(name, lastName, email, phone);
  users.push(user);
  render();
}

function editUser(index, name, lastName, email, phone) {
  let user = new User(name, lastName, email, phone);
  users = users.map((item, i) => (i == index ? user : item));
  user = undefined;
  render();
}

function deleteUser(index) {
  users = users.filter((item, i) => i != index);
  render();
}

function render() {
  const tbody = document.getElementById("users-table");
  tbody.innerHTML = "";
  let id = 0;
  for (const user of users) {
    let newRow = tbody.insertRow(-1);
    newRow.insertCell(0);
    addInitBtn(newRow, id);
    for (let i = 1; i <= fields; i++) {
      newRow.insertCell(i);
    }
    for (const [key, value] of Object.entries(user)) {
      switch (key) {
        case "email":
          newRow.cells[1].innerHTML = value;
          newRow.cells[1].setAttribute("class", "text-center p-3");
          newRow.cells[1].setAttribute("id", `email-${id}`);
          break;
        case "phone":
          newRow.cells[2].innerHTML = value;
          newRow.cells[2].setAttribute("class", "text-center p-3");
          newRow.cells[2].setAttribute("id", `phone-${id}`);
          break;

        case "lastName":
          newRow.cells[3].innerHTML = value;
          newRow.cells[3].setAttribute("class", "text-center p-3");
          newRow.cells[3].setAttribute("id", `last-name-${id}`);
          break;

        case "firstName":
          newRow.cells[4].innerHTML = value;
          newRow.cells[4].setAttribute("class", "text-center p-3");
          newRow.cells[4].setAttribute("id", `first-name-${id}`);
          break;
      }
    }
    id++;
  }
}

let addInitBtn = (row, id) => {
  let cell = row.cells[0];
  cell.setAttribute("class", "text-center p-3 d-flex justify-content-center align-items-center");
  cell.innerHTML =
    `<button onclick="deleteEvent(this)" id='${id}' class="operation delete p-2 mr-2"><div><img src="./img/delete.svg" class="w-100 h-100" alt="" /></div></button>` +
    `<button onclick="editEvent(this)" id='${id}' class="operation edit p-2"><div><img src="./img/edit.svg" class="w-100 h-100" alt="" /></div></button>`;
};

let deleteEvent = (button) => {
  let userId = button.id;
  openModal(".yes-no-form");
  document.getElementById("yes").addEventListener("click", () => {
    deleteUser(userId);
    closeModal(".yes-no-form");
    userId = undefined;
  });
  document.getElementById("no").addEventListener("click", () => {
    closeModal(".yes-no-form");
  });
};

let editEvent = (button) => {
  let userId = button.id;
  openModal(".edit-form");
  fnameE.value = document.getElementById(`first-name-${userId}`).innerHTML;
  lnameE.value = document.getElementById(`last-name-${userId}`).innerHTML;
  emailE.value = document.getElementById(`email-${userId}`).innerHTML;
  phoneE.value = document.getElementById(`phone-${userId}`).innerHTML;
  document.getElementById("edit-user").addEventListener("click", () => {
    editUser(userId, fnameE.value, lnameE.value, emailE.value, phoneE.value);
    closeModal(".edit-form");
    userId = undefined;
  });
};

const openModal = (htmlClass) => {
  document.querySelector(htmlClass).classList.remove("hidden");
  document.querySelector(htmlClass).classList.add("showed");
  document.querySelector(".overlay").classList.remove("hidden");
  document.querySelector(".overlay").classList.add("showed");
};

const closeModal = (htmlClass) => {
  document.querySelector(htmlClass).classList.remove("showed");
  document.querySelector(htmlClass).classList.add("hidden");
  document.querySelector(".overlay").classList.remove("showed");
  document.querySelector(".overlay").classList.add("hidden");
};

const setError = (input, message, small) => {
  small.textContent = message;
  input.classList.add("border-error");
};

const clearError = (input, small) => {
  small.textContent = "";
  input.classList.remove("border-error");
};

document.getElementById("open-modal").addEventListener("click", () => {
  resetInputs();
  openModal(".add-form");
});
document.getElementById("close-modal").addEventListener("click", () => {
  closeModal(".add-form");
});

document.getElementById("close-modal-e").addEventListener("click", () => {
  closeModal(".edit-form");
});

document.querySelector(".overlay").addEventListener("click", () => {
  closeModal(".add-form");
  closeModal(".yes-no-form");
  closeModal(".edit-form");
});

document.getElementById("add-user").addEventListener("click", () => {
  for (const state of correctFields) {
    if (!state) {
      return;
    } else {
      continue;
    }
  }
  addUser(fname.value, lname.value, email.value, phone.value);
  closeModal(".add-form");
});

//validations
//add
fname.addEventListener("keyup", () => {
  let small = document.getElementById("fname-error");
  if (fname.value === "") {
    setError(fname, "فیلد نمیتواند خالی باشد", small);
    correctFields[0] = false;
  } else if (fname.value.trim().length < 3) {
    setError(fname, "نام نمیتواند کمتر از 3 کلمه باشد", small);
    correctFields[0] = false;
  } else if (fname.value.match(/\d/)) {
    setError(fname, "نام نمیتواند شامل عدد باشد", small);
    correctFields[0] = false;
  } else if (fname.value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    setError(fname, "نام نمیتواند شامل کاراکتر خاص باشد", small);
    correctFields[0] = false;
  } else {
    clearError(fname, small);
    correctFields[0] = true;
  }
});

lname.addEventListener("keyup", () => {
  let small = document.getElementById("lname-error");
  if (lname.value === "") {
    setError(lname, "فیلد نمیتواند خالی باشد", small);
    correctFields[1] = false;
  } else if (lname.value.trim().length < 3) {
    setError(lname, "نام خانوادگی نمیتواند کمتر از 3 کلمه باشد", small);
    correctFields[1] = false;
  } else if (lname.value.match(/\d/)) {
    setError(lname, "نام خانوادگی نمیتواند شامل عدد باشد", small);
    correctFields[1] = false;
  } else if (lname.value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    setError(lname, "نام خانوادگی نمیتواند شامل کاراکتر خاص باشد", small);
    correctFields[1] = false;
  } else {
    clearError(lname, small);
    correctFields[1] = true;
  }
});

email.addEventListener("keyup", () => {
  let small = document.getElementById("email-error");
  if (email.value === "") {
    setError(email, "فیلد نمیتواند خالی باشد", small);
    correctFields[2] = false;
  } else if (
    !email.value.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    setError(email, "فرمت ایمیل ورودی صحیح نیست", small);
    correctFields[2] = false;
  } else {
    clearError(email, small);
    correctFields[2] = true;
  }
});

phone.addEventListener("keyup", () => {
  let small = document.getElementById("phone-error");
  if (phone.value === "") {
    setError(phone, "فیلد نمیتواند خالی باشد", small);
    correctFields[3] = false;
  } else if (!phone.value.match(/^(\+98|0)?9\d{9}$/)) {
    setError(phone, "شماره موبایل صحیح نمیباشد", small);
    correctFields[3] = false;
  } else {
    clearError(phone, small);
    correctFields[3] = true;
  }
});

//edit
fnameE.addEventListener("keyup", () => {
  let small = document.getElementById("fname-error-e");
  if (fnameE.value === "") {
    setError(fnameE, "فیلد نمیتواند خالی باشد", small);
    correctFields[0] = false;
  } else if (fnameE.value.trim().length < 3) {
    setError(fnameE, "نام خانوادگی نمیتواند کمتر از 3 کلمه باشد", small);
    correctFields[0] = false;
  } else if (fnameE.value.match(/\d/)) {
    setError(fnameE, "نام خانوادگی نمیتواند شامل عدد باشد", small);
    correctFields[0] = false;
  } else if (fnameE.value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    setError(fnameE, "نام خانوادگی نمیتواند شامل کاراکتر خاص باشد", small);
    correctFields[0] = false;
  } else {
    clearError(fnameE, small);
    correctFields[0] = true;
  }
});

lnameE.addEventListener("keyup", () => {
  let small = document.getElementById("lname-error-e");
  if (lnameE.value === "") {
    setError(lnameE, "فیلد نمیتواند خالی باشد", small);
    correctFields[1] = false;
  } else if (lnameE.value.trim().length < 3) {
    setError(lnameE, "نام خانوادگی نمیتواند کمتر از 3 کلمه باشد", small);
    correctFields[1] = false;
  } else if (lnameE.value.match(/\d/)) {
    setError(lnameE, "نام خانوادگی نمیتواند شامل عدد باشد", small);
    correctFields[1] = false;
  } else if (lnameE.value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    setError(lnameE, "نام خانوادگی نمیتواند شامل کاراکتر خاص باشد", small);
    correctFields[1] = false;
  } else {
    clearError(lnameE, small);
    correctFields[1] = true;
  }
});

emailE.addEventListener("keyup", () => {
  let small = document.getElementById("email-error-e");
  if (emailE.value === "") {
    setError(emailE, "فیلد نمیتواند خالی باشد", small);
    correctFields[2] = false;
  } else if (
    !emailE.value.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    setError(emailE, "فرمت ایمیل ورودی صحیح نیست", small);
    correctFields[2] = false;
  } else {
    clearError(emailE, small);
    correctFields[2] = true;
  }
});

phoneE.addEventListener("keyup", () => {
  let small = document.getElementById("phone-error-e");
  if (phoneE.value === "") {
    setError(phoneE, "فیلد نمیتواند خالی باشد", small);
    correctFields[3] = false;
  } else if (!phoneE.value.match(/^(\+98|0)?9\d{9}$/)) {
    setError(phoneE, "شماره موبایل صحیح نمیباشد", small);
    correctFields[3] = false;
  } else {
    clearError(phoneE, small);
    correctFields[3] = true;
  }
});
