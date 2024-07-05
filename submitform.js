"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-container");
  const submitButton = form.querySelector('button[type="submit"]');
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get("id");

  // Function to update user data in localStorage
  function updateUserData(userData) {
    localStorage.setItem("users", JSON.stringify(userData));
  }

  // Function to fetch user data from localStorage based on ID
  function fetchUserData(id) {
    const userData = JSON.parse(localStorage.getItem("users")) || [];
    const user = userData.find((user) => user.id === id);

    if (user) {
      document.getElementById("username").value = user.username;
      document.getElementById("email").value = user.email;
      document.getElementById("password").value = user.password;
      document.getElementById("age").value = user.age;
      document.getElementById("number").value = user.number;
      document.getElementById("height").value = user.height;
      document.getElementById("weight").value = user.weight;
      document.getElementById("gender").value = user.gender;
    } else {
      console.log(`User with ID ${id} not found.`);
    }

    return user;
  }

  // Handle form submission
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    if (editId) {
      // Editing existing user data
      const userData = JSON.parse(localStorage.getItem("users")) || [];
      const index = userData.findIndex((user) => user.id === editId);

      if (index !== -1) {
        userData[index] = {
          id: editId,
          username: jsonData.username,
          email: jsonData.email,
          password: jsonData.password,
          age: jsonData.age,
          number: jsonData.number,
          height: jsonData.height,
          weight: jsonData.weight,
          gender: jsonData.gender,
        };

        // Update user data in localStorage
        updateUserData(userData);
        alert("User data updated successfully.");
        form.reset();
      } else {
        console.log(`User with ID ${editId} not found in localStorage.`);
      }
    } else {
      // Adding new user data
      function generateUUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
          c
        ) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }

      const newUser = {
        id: generateUUID(),
        username: jsonData.username,
        email: jsonData.email,
        password: jsonData.password,
        age: jsonData.age,
        number: jsonData.number,
        height: jsonData.height,
        weight: jsonData.weight,
        gender: jsonData.gender,
      };

      // Update localStorage with new user data
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(newUser);
      updateUserData(users);
      alert("New user added successfully.");
      form.reset();
    }
  });

  // If in edit mode, fetch and populate form with existing user data
  if (editId) {
    fetchUserData(editId);
  }
});
