import { API_URL } from "./config.js";
import { getCookie } from "./cookie-management.js";

//<figure data-category="1"><img crossorigin="anonymous" src="http://localhost:5678/images/abajour-tahina1651286843956.png" alt="Abajour Tahina"><figcaption>Abajour Tahina</figcaption></figure>

const deleteThisWorkRequest = (workId) => {
  const deleteWork = fetch(API_URL + "works/" + workId, {
    headers: {
      Authorization: "BEARER " + getCookie("token"),
    },
    method: "DELETE",
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (works) {})
    .catch(function (error) {
      console.log(error);
    });
};
const deleteThisWork = (e) => {
  const thisId = e.target.getAttribute("data-photo-id");
  deleteThisWorkRequest(thisId);
};

export const eventListenerToTrashIcon = () => {
  const deleteIcon = document.getElementsByClassName("modal-trash-icon");

  for (let deleteButton of deleteIcon) {
    deleteButton.addEventListener("click", deleteThisWork);
  }
};
