"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-container");
  const submitbutton = form.querySelector('button[type="submit"]');
  submitbutton.addEventListener("click", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    function generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    }

    const newUser = {
      id: generateUUID(),
      username: jsonData.name,
      email: jsonData.email,
      password: jsonData.password,
      age: jsonData.age,
      number: jsonData.number,
      height: jsonData.height,
      weight: jsonData.weight,
      gender: jsonData.gender,
    };

    console.log(newUser.id);

    localStorage.setItem("formData", JSON.stringify(jsonData));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    form.reset();
    alert("form submitted");
  });
});
