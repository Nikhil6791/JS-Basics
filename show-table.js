"use strict";

window.addEventListener("load", function () {
  const storeData = localStorage.getItem("users");
  let userInfoDiv = document.getElementById("userinfo");
  if (storeData) {
    const userData = JSON.parse(storeData);
    const table = document.createElement("table");

    table.style.backgroundColor = "rgba(58, 57, 57, 0.066)";
    table.style.height = "100%";
    table.style.width = "100%";

    const headerRow = document.createElement("tr");
    const headers = [
      "Name",
      "E-mail",
      "Password",
      "Age",
      "Phone No",
      "Height",
      "Weight",
      "Gender",
      "Actions",
    ];

    headers.forEach((headerText) => {
      const header = document.createElement("th");
      header.textContent = headerText;
      // header.appendChild(textNode);
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
        <td>
          <span class="cursor-pointer" onclick="confirmDelete(${index})">🗑️</span>
          <span class="cursor-pointer" data-id="${user.id}" onclick="getRowId(event)">✏️</span>
        </td>
      `;

      table.appendChild(row);
    });

    userInfoDiv.appendChild(table);
  } else {
    userInfoDiv.innerText = "No user Found";
  }
});

const getRowId = (event) => {
  const id = event.target.getAttribute("data-id");
  const url = new URL("forms.html", window.location.origin);
  url.searchParams.set("id", id);
  window.location.href = url.href; // Redirect to edit.html with editId query parameter
};

const confirmDelete = (index) => {
  if (confirm("Are you sure you want to delete this row?")) {
    handleDelete(index);
  }
};

const handleDelete = (index) => {
  const userData = JSON.parse(localStorage.getItem("users"));
  userData.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(userData));
  window.location.reload();
};
