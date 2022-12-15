import { getCookie } from "./cookie-management.js";
import { displayWorks } from "./fetch-works.js";

const userToken = getCookie("token");

const appendEditElement = (parentElement) => {
  let editElement = document.createElement("button");
  editElement.classList.add("editButton");
  editElement.classList.add("defaultHoverDisabled");
  editElement.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><span>modifier</span>`;

  if (parentElement.tagName === "ARTICLE") {
    parentElement.prepend(editElement);
  } else {
    parentElement.appendChild(editElement);
  }
};

if (userToken) {
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

const modifyProjectsButton = document.querySelector(
  "#portfolio > div > button"
);

const openProjectsModalWindow = () => {
  let cloudyBakgroundElement =
    document.getElementsByClassName("cloudy-background");
  cloudyBakgroundElement[0].style.display = "block";

  const modalPortfolio = document.getElementById("modal-portfolio");
  const localStoredWorks = JSON.parse(window.localStorage.getItem("works"));
  displayWorks(modalPortfolio, localStoredWorks);

  //   const projectsModalWindow = document.createElement("div");
  //   projectsModalWindow.classList.add("modal-window");
  //   cloudyBakgroundElement[0].appendChild(projectsModalWindow);

  cloudyBakgroundElement[0].addEventListener("click", function (e) {
    e.stopPropagation();
    let cloudyBakgroundElement =
      document.getElementsByClassName("cloudy-background");
    cloudyBakgroundElement[0].style.display = "none";
    // projectsModalWindow.remove();
  });
};

modifyProjectsButton.addEventListener("click", openProjectsModalWindow);

// let cloudyBakgroundElement =
//   document.getElementsByClassName("cloudy-background");
// cloudyBakgroundElement[0].style.display = "block";

// const projectsModalWindow = document.createElement("div");
// projectsModalWindow.classList.add("modal-window");
// cloudyBakgroundElement[0].appendChild(projectsModalWindow);
