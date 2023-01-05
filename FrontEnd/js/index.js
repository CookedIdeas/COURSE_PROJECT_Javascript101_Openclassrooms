import { enableAdminMode } from "./admin-mode.js";
import { getCookie } from "./cookie-management.js";
import { FetchAPIgetWorks } from "./fetch-works.js";
import { logUser } from "./login-user.js";

const pageUrl = window.location.pathname;
const thisPageName = pageUrl.split("/")[pageUrl.split("/").length - 1];

if (thisPageName === "index.html") {
  FetchAPIgetWorks();
  const userToken = getCookie("token");
  enableAdminMode(userToken);
  console.log("page load");
} else if (thisPageName === "login.html") {
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", logUser);
}
