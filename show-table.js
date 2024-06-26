"use strict";

window.addEventListener("load", function () {
  const storeData = localStorage.getItem("users");
  let userInfoDiv = document.getElementById("userinfo");
  if (storeData) {
    const userData = JSON.parse(storeData);
    const table = document.createElement("table");

    table.style.backgroundColor = " rgba(58, 57, 57, 0.066)";
    table.style.height = "100%";
    table.style.width = "100%";

    const headerRow = document.createElement("tr");
    const headers = [
      "Name",
      "E-mail",
      "Pasword",
      "Age",
      "Phone No",
      "Height",
      "Weight",
      "Gender",
      "Actions",
    ];

    headers.forEach((headerText) => {
      const header = document.createElement("th");
      const textNode = document.createTextNode(headerText);
      header.appendChild(textNode);
      headerRow.appendChild(header);
      header.style.border = "1px solid black";
      header.style.padding = "5px";
    });
    table.appendChild(headerRow);
    userData.forEach((user, index) => {
      const row = document.createElement("tr");
      row.style.backgroundColor = "#f5f5f5";

      row.innerHTML = `
        <td class="table-row">${user.username}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.age}</td>
        <td>${user.number}</td>
        <td>${user.height}</td>
        <td>${user.weight}</td>
        <td>${user.gender}</td>
        <td><span class="cursor-pointer" onclick={confirmDelete(${index})}>${"🗑️"}</span>
        <span class="cursor-pointer" onclick={editRow(${index})}>${"✏️"}</span>
        </td>
      `;

      table.appendChild(row);
    });

    userInfoDiv.appendChild(table);
  } else {
    userInfoDiv.innerText = "No user Found";
  }
});
const confirmDelete = (index) => {
  if (confirm("Are you sureyou want to delete this row?")) {
    handleDelete(index);
  }
};
const handleDelete = (index) => {
  const userData = JSON.parse(localStorage.getItem("users"));
  userData.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(userData));
  window.location.reload();
};

const editRow = (id) => {
  const userData = JSON.parse(localStorage.getItem("users"));
  const user = userData[id];

  document.getElementById("username").value = user.username;
  document.getElementById("email").value = user.email;
  document.getElementById("password").value = user.password;
  document.getElementById("age").value = user.age;
  document.getElementById("number").value = user.number;
  document.getElementById("height").value = user.height;
  document.getElementById("weight").value = user.weight;
  document.getElementById("gender").value = user.gender;

  document.getElementById("save-button").onclick = () => {
    userData[id] = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      age: document.getElementById("age").value,
      number: document.getElementById("number").value,
      height: document.getElementById("height").value,
      weight: document.getElementById("weight").value,
      gender: document.getElementById("gender").value,
    };
    localStorage.setItem("users", JSON.stringify(userData));
    window.location.reload();
  };
};

// document.querySelectorAll(".edit-icon").forEach((icon, index) => {
//   icon.addEventListener("click", () => editRow(index));
// });
