import { deleteThisWork } from "./admin-mode.js";
import { API_URL } from "./config.js";
import { getCookie } from "./cookie-management.js";

//access the div gallery where works will be displayed
const galleryElement = document.querySelector(".gallery");

// ================== DISPLAY FUNCTION ================== //

export const displayWorks = (fetchedWorks) => {
  console.table(fetchedWorks);
  // for each work of fetchedWorks, create a figure with img inside, figcaption and a data-category
  for (let work of fetchedWorks) {
    //create a figure for each work
    let figureElement = document.createElement("figure");

    //give data-category with the right category
    figureElement.setAttribute("data-category", work.categoryId);

    //create a img with src and alt attributes for each work
    let imgElement = document.createElement("img");

    imgElement.setAttribute("crossorigin", "anonymous"); //to prevent ERR_BLOCKED_BY_RESPONSE.NotSameOrigin
    imgElement.setAttribute("src", work.imageUrl);
    imgElement.setAttribute("alt", work.title);

    //create a figcaption with the work title for each work
    let figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerHTML = work.title;

    //add img and figcaption children to the figure
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);

    //add the created figure to the gallery element
    galleryElement.appendChild(figureElement);
  }
};

export const displayWorksInModal = (parentElement, fetchedWorks) => {
  for (let work of fetchedWorks) {
    // console.log(work);
    //create a figure for each work
    let figureElement = document.createElement("figure");
    //give data-category with the right category
    figureElement.setAttribute("data-category", work.categoryId);

    //create a img with src and alt attributes for each work
    let imgElement = document.createElement("img");

    imgElement.setAttribute("crossorigin", "anonymous"); //to prevent ERR_BLOCKED_BY_RESPONSE.NotSameOrigin
    imgElement.setAttribute("src", work.imageUrl);
    imgElement.setAttribute("alt", work.title);

    //add trash icon in top right of figure
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid");
    trashIcon.classList.add("fa-trash-can");
    trashIcon.classList.add("modal-trash-icon");
    trashIcon.setAttribute("data-photo-id", work.id);
    // trashIcon.setAttribute("data-user-id", work.userId);
    trashIcon.addEventListener("click", deleteThisWork);

    let trashIconContainer = document.createElement("a");
    trashIconContainer.classList.add("modal-trash-icon-container");
    trashIconContainer.appendChild(trashIcon);

    //create a figcaption with the work title for each work
    let editElement = document.createElement("a");
    editElement.innerHTML = "éditer";

    //add img and figcaption children to the figure
    figureElement.appendChild(imgElement);
    figureElement.appendChild(editElement);
    figureElement.appendChild(trashIconContainer);

    //add displace icon in top right of figure for first figure
    if (fetchedWorks.indexOf(work) === 0) {
      let displaceIcon = document.createElement("i");
      displaceIcon.classList.add("fa-solid");
      displaceIcon.classList.add("fa-arrows-up-down-left-right");
      displaceIcon.classList.add("modal-arrows-icon");

      let displaceIconContainer = document.createElement("a");
      displaceIconContainer.classList.add("modal-trash-icon-container");
      displaceIconContainer.classList.add("modal-displace-icon-container");
      displaceIconContainer.appendChild(displaceIcon);
      figureElement.appendChild(displaceIconContainer);
    }

    //add the created figure to the gallery element
    parentElement.appendChild(figureElement);
  }
  // eventListenerToTrashIcon();
};

// ================== FILTER FUNCTION ================== //

const categoryArray = [
  { id: 1, name: "Objets" },
  { id: 2, name: "Appartements" },
  { id: 3, name: "Hotels & restaurants" },
];
console.table(categoryArray);

const filterButtonIsClicked = (clickedButton) => {
  //if there is a previously selected filterButton, remove his selectedInput class
  const prevSelectedFilter = document.getElementsByClassName("selectedInput");
  if (prevSelectedFilter.length > 0) {
    prevSelectedFilter[0].classList.remove("selectedInput");
  }

  //give selected style to clicked btn
  clickedButton.classList.add("selectedInput");

  //get the categoryId of the clicked filterButton, /\ it's a string, we need number
  const selectedCategory = Number(clickedButton.value);

  const localStoredWorks = JSON.parse(window.sessionStorage.getItem("works"));

  //if selected categoryId > 0, asked category is !== "all"
  if (selectedCategory > 0) {
    //filter localy stored works by their categoryId
    const filteredWorks = localStoredWorks.filter(function (work) {
      return work.categoryId === selectedCategory;
    });

    //empty the gallery div
    galleryElement.replaceChildren();

    //display the filter function result
    displayWorks(filteredWorks);
  } else {
    //"display all" is selected so empty gallery div and display all localy stored works
    galleryElement.replaceChildren();
    displayWorks(localStoredWorks);
  }
};

export const filterFunction = async () => {
  const filterButtons = document.getElementsByClassName("filter-button");

  for (let filter of filterButtons) {
    filter.addEventListener("click", function () {
      filterButtonIsClicked(this);
    });
  }
};

// ================== ERROR MESSAGES ================== //

const displayErrorMsgIn = (element) => {
  let errorMsg = document.createElement("p");
  errorMsg.classList.add("error-msg-gallery");
  errorMsg.innerHTML =
    "Message erreur à rédiger / connexion avec base de données échouée";

  element.classList.add("gallery-for-error-msg");

  element.appendChild(errorMsg);
};

// ================== GET WORKS FROM API ================== //

//get works and if response is ok, display works in page, else display error msg in gallery
export const FetchAPIgetWorks = () => {
  fetch(API_URL + "works", {
    method: "GET",
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (works) {
      window.sessionStorage.setItem("works", JSON.stringify(works));
      if (galleryElement !== null) {
        galleryElement.classList.remove("gallery-for-error-msg");
        galleryElement.replaceChildren();
        displayWorks(works);
        filterFunction();
      }
    })
    .catch(function (error) {
      console.log(error);
      displayErrorMsgIn(galleryElement);
    });
};

// ================== DELETE THIS WORK ================== //

export const FetchAPIdeleteThisWork = (workId) => {
  fetch(API_URL + "works/" + workId, {
    headers: {
      Authorization: "BEARER " + getCookie("token"),
    },
    method: "DELETE",
  })
    .then(function (res) {
      if (res.ok) {
        // openProjectsModal();
        return res.json();
      }
    })
    .then(function (work) {
      console.log(work);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// ================== POST WORK ================== //

export const FetchAPIpostWork = (data) => {
  // console.log(Object.fromEntries(data));
  fetch(API_URL + "works", {
    headers: {
      Authorization: "BEARER " + getCookie("token"),
    },
    method: "POST",
    body: data,
  })
    .then(function (response) {
      console.log(response.status);
      return response.json;
    })
    .catch(function (error) {
      console.log(error);
    });
};
