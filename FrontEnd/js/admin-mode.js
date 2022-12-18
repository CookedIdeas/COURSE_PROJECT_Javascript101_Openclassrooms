import { API_URL } from "./config.js";
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
    modal
      .querySelector(".js-modal-previous")
      .addEventListener("click", goToPreviousModal);
    modal
      .querySelector(".js-modal-previous")
      .addEventListener("click", stopPropagation);
    //display works in modal window
    const localStoredWorks = JSON.parse(window.localStorage.getItem("works"));
    displayWorksInModal(modalPortfolio, localStoredWorks);
  };

  //ADD PHOTO MODAL

  const addPhotoButton = document.querySelector(".modal-add-button");
  const modalWorksDisplay = document.querySelector("#modal-opening");
  const modalAddPhoto = document.querySelector("#modal-add-photo");

  const openAddPhotoModal = (e) => {
    e.preventDefault;
    console.log("clicked");
    modalWorksDisplay.style.display = "none";
    modalAddPhoto.style.display = "flex";
  };

  addPhotoButton.addEventListener("click", openAddPhotoModal);

  const goToPreviousModal = () => {
    modalWorksDisplay.style.display = "flex";
    modalAddPhoto.style.display = "none";
  };

  //ADD PHOTO FORM
  const selectedImagePreviewElement = document.getElementById("img-preview");
  const chooseImageInput = document.getElementById("select-photo");
  const chooseImageLabel = document.getElementById("select-photo-label");
  const addPhotoWrapper = document.querySelector(".modal-add-photo-wrapper");

  const addPhotoWrapperOtherElements = [
    chooseImageInput,
    document.querySelector(".modal-add-photo-wrapper > i"),
    document.querySelector(".js-image-type"),
  ];
  console.log(addPhotoWrapperOtherElements);

  const getImgData = () => {
    const files = chooseImageInput.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        selectedImagePreviewElement.style.display = "block";
        selectedImagePreviewElement.innerHTML =
          '<img src="' + this.result + '" />';
      });
    }
  };

  chooseImageInput.addEventListener("change", function () {
    getImgData();
    addPhotoWrapperOtherElements.forEach((element) => {
      element.style.display = "none";
    });
    chooseImageLabel.classList.add("modal-change-selected-photo-btn");
    chooseImageLabel.innerHTML = "Changer photo";
  });

  const addPhotoInputs = document.querySelectorAll(".js-modal-add-photo-input");
  const validateAddPhotoButton = document.getElementsByClassName(
    "modal-validate-button"
  )[0];

  const formErrorMeassage =
    document.getElementsByClassName("form-error-msg")[0];

  const isAddPhotoFormFullfilled = () => {
    const addedPhoto = chooseImageInput.files[0];
    const titleValue = document.getElementById("photoTitleInput").value;
    const categoryValue = document.getElementById("photoCategoryInput").value;
    if (addedPhoto !== undefined && titleValue && categoryValue) {
      console.log("fullfilled");
      validateAddPhotoButton.removeAttribute("disabled");
      formErrorMeassage.style.visibility = "hidden";
    } else {
      validateAddPhotoButton.setAttribute("disabled", true);
      formErrorMeassage.style.visibility = "visible";
    }
  };

  addPhotoInputs.forEach((input) => {
    input.addEventListener("input", isAddPhotoFormFullfilled);
  });

  const sendPhoto = (e) => {
    e.preventDefault();
  };

  validateAddPhotoButton.addEventListener("click", sendPhoto);

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
      modalAddPhoto.style.display = "none";
      modalWorksDisplay.style.display = "flex";
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

// ================== DELETE THIS WORK ================== //

//<figure data-category="1"><img crossorigin="anonymous" src="http://localhost:5678/images/abajour-tahina1651286843956.png" alt="Abajour Tahina"><figcaption>Abajour Tahina</figcaption></figure>

{
  /* <figure data-category="2"><img crossorigin="anonymous" src="http://localhost:5678/images/appartement-paris-v1651287270508.png" alt="Appartement Paris V"><a>éditer</a><a class="modal-trash-icon-container"><i class="fa-solid fa-trash-can modal-trash-icon" data-photo-id="2"></i></a><a class="modal-trash-icon-container modal-displace-icon-container"><i class="fa-solid fa-arrows-up-down-left-right modal-arrows-icon"></i></a></figure> 
  <figure data-category="3"><img crossorigin="anonymous" src="http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png" alt="Restaurant Sushisen - Londres"><figcaption>Restaurant Sushisen - Londres</figcaption></figure>*/
}

const deleteThisWorkRequest = (workId) => {
  const deleteWork = fetch(API_URL + "works/" + workId, {
    headers: {
      Authorization: "BEARER " + getCookie("token"),
    },
    method: "DELETE",
  })
    .then(function (res) {
      if (res.ok) {
        debugger;
        // openProjectsModal();
        return res.json();
      }
    })
    .then(function () {})
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
