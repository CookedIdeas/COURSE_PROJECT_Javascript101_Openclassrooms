import { enableAdminMode } from "./admin-mode.js";
import { getCookie } from "./cookie-management.js";
import { fetchWorkFunction } from "./fetch-works.js";
import { logUser } from "./login-user.js";

const pageUrl = window.location.pathname;
const thisPageName = pageUrl.split("/")[pageUrl.split("/").length - 1];

if (thisPageName === "index.html") {
  fetchWorkFunction();
  const userToken = getCookie("token");
  enableAdminMode(userToken);
} else if (thisPageName === "login.html") {
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", logUser);
}