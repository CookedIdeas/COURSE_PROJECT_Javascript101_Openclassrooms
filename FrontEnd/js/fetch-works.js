import { API_URL } from "./config.js";

//access the div gallery where works will be displayed
const galleryElement = document.querySelector(".gallery");

const displayWorks = (fetchedWorks) => {
  console.log(fetchedWorks);
  for (let work of fetchedWorks) {
    //create a figure for each work
    let figureElement = document.createElement("figure");

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

//get works and if response is ok, display works in page
const fetchWorks = fetch(API_URL + "works", {
  method: "GET",
})
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (works) {
    displayWorks(works);
  })
  .catch(function (error) {
    console.log(error);
  });
