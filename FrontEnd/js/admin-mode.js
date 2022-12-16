import { getCookie } from "./cookie-management.js";
import { displayWorks, displayWorksInModal } from "./fetch-works.js";

// const userToken = getCookie("token");

const appendEditElement = (parentElement) => {
  let editElement = document.createElement("button");
  editElement.setAttribute("href", "#modal1");
  editElement.classList.add("editButton");
  editElement.classList.add("js-modal");
  editElement.classList.add("defaultHoverDisabled");
  editElement.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><span>modifier</span>`;

  if (parentElement.tagName === "ARTICLE") {
    parentElement.prepend(editElement);
  } else {
    parentElement.appendChild(editElement);
  }
};

export const enableAdminMode = (token) => {
  if (token) {
    document.querySelector(".filtersContainer").replaceChildren();

    //add black headband on top
    const blackHeadbandElement = document.createElement("div");
    blackHeadbandElement.classList.add("admin-headband");

    const editionModeElement = document.createElement("div");
    editionModeElement.classList.add("edition-mode");
    editionModeElement.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><span>Mode édition</span>`;

    const publishEditElement = document.createElement("button");
    publishEditElement.innerHTML = "publier les changements";

    blackHeadbandElement.appendChild(editionModeElement);
    blackHeadbandElement.appendChild(publishEditElement);

    let bodyElement = document.getElementsByTagName("body");
    bodyElement[0].prepend(blackHeadbandElement);

    //add black editIcon + "modifier" to elements
    const articleElement = document.getElementsByTagName("article");
    appendEditElement(articleElement[0]);

    const sophieBluelPhoto = document.querySelector(
      "#introduction > figure > div"
    );
    appendEditElement(sophieBluelPhoto);

    const mesProjetsElement = document.querySelector(
      ".mes-projets-title-container"
    );
    appendEditElement(mesProjetsElement);
  }
  //open modal window

  const modifyProjectsButton = document.querySelectorAll(".js-modal");

  let modal = null;
  const focusableSelector = "button, a, input, textarea";
  let focusables = [];
  let previouslyFocusedElement = null;
  const modalPortfolio = document.getElementById("modal-portfolio");

  const openProjectsModal = (e) => {
    e.preventDefault();

    const getTarget = () => {
      if (e.target.parentElement.getAttribute("href")) {
        return (modal = document.querySelector(
          e.target.parentElement.getAttribute("href")
        ));
      } else {
        return (modal = document.querySelector(e.target.getAttribute("href")));
      }
    };
    getTarget();

    //ACCESSIBILITY : get focusables elts, put them in array, focus the first one
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    //store the previouslyFocusedElement
    previouslyFocusedElement = document.querySelector(":focus");
    focusables[0].focus();

    //display modal, change aria attributes
    modal.style.display = null;
    modal.setAttribute("aria-hidden", false);
    modal.setAttribute("aria-modal", true);

    modal.addEventListener("click", closeModal); //close when click on background
    modal
      .querySelector(".js-modal-close")
      .addEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-stop")
      .addEventListener("click", stopPropagation); //stop propagation to prevent closing on click inside the modal wrapper

    //display works in modal window
    const localStoredWorks = JSON.parse(window.localStorage.getItem("works"));
    displayWorksInModal(modalPortfolio, localStoredWorks);
  };

  const closeModal = (e) => {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) {
      previouslyFocusedElement.focus();
    }
    e.preventDefault();

    modal.setAttribute("aria-hidden", true);
    modal.removeAttribute("aria-modal");

    //remove eventlistener to "clean" the page after modal closing
    modal.removeEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-close")
      .removeEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-stop")
      .removeEventListener("click", stopPropagation);

    //hide modal and remove animation eventlistener AFTER closing animations
    const hideModal = () => {
      modal.style.display = "none";
      modal.removeEventListener("animationend", hideModal);
      modalPortfolio.replaceChildren();
      modal = null;
    };

    modal.addEventListener("animationend", hideModal);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  //ACCESSIBILITY
  const focusInModal = (e) => {
    e.preventDefault();
    let index = focusables.findIndex(
      (f) => f === modal.querySelector(":focus")
    );
    if (e.shiftKey === true) {
      index--;
    } else {
      index++;
    }

    if (index >= focusables.length) {
      index = 0;
    }
    if (index < 0) {
      index = focusables.length - 1;
    }
    console.log(index);
    focusables[index].focus();
  };

  modifyProjectsButton.forEach((a) => {
    a.addEventListener("click", openProjectsModal);
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
    if (e.key === "Tab" && modal != null) {
      focusInModal(e);
    }
  });
};
