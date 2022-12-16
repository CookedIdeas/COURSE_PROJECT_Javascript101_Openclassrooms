import { API_URL } from "./config.js";

// ================== DISPLAY FUNCTION ================== //

//access the div gallery where works will be displayed

export const displayWorks = (parentElement, fetchedWorks) => {
  let galleryElement = document.querySelector(".gallery");

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
    parentElement.appendChild(figureElement);
  }
};

export const displayWorksInModal = (parentElement, fetchedWorks) => {
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

    //add trash icon in top right of figure
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid");
    trashIcon.classList.add("fa-trash-can");
    trashIcon.classList.add("modal-trash-icon");

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
      displaceIcon.classList.add("modal-trash-icon");

      let displaceIconContainer = document.createElement("a");
      displaceIconContainer.classList.add("modal-trash-icon-container");
      displaceIconContainer.classList.add("modal-displace-icon-container");
      displaceIconContainer.appendChild(displaceIcon);
      figureElement.appendChild(displaceIconContainer);
    }

    //add the created figure to the gallery element
    parentElement.appendChild(figureElement);
  }
};

// ================== FILTER FUNCTION ================== //

export const filterFunction = async () => {
  const filterButtons = document.getElementsByClassName("filter-button");

  for (let filter of filterButtons) {
    filter.addEventListener("click", function () {
      //if there is a previously selected filterButton, remove his selectedInput class
      const prevSelectedFilter =
        document.getElementsByClassName("selectedInput");
      if (prevSelectedFilter.length > 0) {
        prevSelectedFilter[0].classList.remove("selectedInput");
      }

      this.classList.add("selectedInput");
      const localStoredWorks = JSON.parse(window.localStorage.getItem("works"));

      //get the categoryId of the clicked filterButton
      const selectedCategory = Number(this.value);
      let galleryElement = document.querySelector(".gallery");
      //if categoryId > 0, clicked filterButton != all
      if (selectedCategory > 0) {
        //filter localy stored works by their categoryId
        const filteredWorks = localStoredWorks.filter(function (work) {
          return work.categoryId === selectedCategory;
        });

        //empty the gallery div

        galleryElement.replaceChildren();

        //display the filter function result
        displayWorks(galleryElement, filteredWorks);
      } else {
        //display all is selected so empty gallery div and display all localy stored works
        galleryElement.replaceChildren();
        displayWorks(galleryElement, localStoredWorks);
      }
    });
  }
};

//get works and if response is ok, display works in page
export const fetchWorkFunction = () => {
  const fetchWorks = fetch(API_URL + "works", {
    method: "GET",
  })
    .then(function (res) {
      if (res.ok) {
        // console.log(res.json());
        return res.json();
      }
    })
    .then(function (works) {
      window.localStorage.setItem("works", JSON.stringify(works));
      let galleryElement = document.querySelector(".gallery");
      if (galleryElement !== null) {
        displayWorks(galleryElement, works);
      }
      filterFunction();
    })
    .catch(function (error) {
      console.log(error);
    });
};
