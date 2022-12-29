import { API_URL } from "./config.js";
import { eraseCookie, getCookie, setCookie } from "./cookie-management.js";

// const loginButton = document.getElementById("loginButton");
const loginErrorMsg = document.querySelector(".login-error-msg");

//erase token cookie before to test login function
// eraseCookie("token");

export const loginRequest = (usersInputs) => {
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
        //server response is not 500 and is not 200 -> display error message
        console.log(res.status);
        loginErrorMsg.style.visibility = "visible";
      }
    })
    .then(function (user) {
      //response is 200, store token and userId in cookie
      const userToken = user.token;
      setCookie("token", userToken, 24);
      const userId = user.userId;
      setCookie("userId", userId, 24);
      location.replace("http://127.0.0.1:5500/FrontEnd/index.html");
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const logUser = (e) => {
  e.preventDefault();

  //get inputs value and create an object with values
  const userEmail = document.getElementById("userEmailInput").value;
  const userPwd = document.getElementById("userPwdinput").value;
  const reqBody = {
    email: userEmail,
    password: userPwd,
  };

  //launch post request with the inputs object
  loginRequest(reqBody);
};

// loginButton.addEventListener("click", logUser); => displaced in index.js
