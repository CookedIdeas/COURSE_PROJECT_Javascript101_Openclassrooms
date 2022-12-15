import { API_URL } from "./config.js";
import { eraseCookie, setCookie } from "./cookie-management.js";

const loginButton = document.getElementById("loginButton");
const loginErrorMsg = document.querySelector(".login-error-msg");

//erase token cookie before to test login function
eraseCookie("token");

const testLogin = (usersInputs) => {
  const fetchLogin = fetch(API_URL + "users/login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(usersInputs),
  })
    .then(function (res) {
      if (res.ok) {
        loginErrorMsg.style.visibility = "hidden";
        return res.json();
      } else {
        //server response is not 200 -> display error message
        console.log(res.status);
        loginErrorMsg.style.visibility = "visible";
      }
    })
    .then(function (user) {
      //response is 200, store token in cookie
      const userToken = user.token;
      setCookie("token", userToken, 24);
      location.replace("http://127.0.0.1:5500/FrontEnd/index.html");
    })
    .catch(function (error) {
      console.log(error);
    });
};

const logUser = (e) => {
  e.preventDefault();

  //get inputs value and create an object with values
  const userEmail = document.getElementById("userEmailInput").value;
  const userPwd = document.getElementById("userPwdinput").value;
  const reqBody = {
    email: userEmail,
    password: userPwd,
  };

  //launch post request with the inputs object
  testLogin(reqBody);
};

loginButton.addEventListener("click", logUser);
