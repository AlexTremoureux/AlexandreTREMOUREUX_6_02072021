import { container , prod, dev, env} from "../constantes.js";
import { getPhotographFilter } from "./getPhotographFilter.js";

//Fonction getTags venant fetch les données pour afficher la liste de filtres de navigation
export const getTags = async function () {
    let response = await fetch(dev)
    let data = await response.json()
    .catch(function (error) {
      alert(error="erreur")
    })
    //Boucle sur chaque photographe puis sur chaque tags afin de récupérer les tags et les stocker dans un array
    const containerTags = document.getElementById("containerTags");
    let tagsList = []
    data.photographers.forEach(photograph => {
      photograph.tags.forEach(tagsElement => {
        tagsList.push(tagsElement)
      }); 
    });
    //Suppression des tags en doublons et intégration HTML de chaque tags trouvé
    let uniqueArrayTags = [...new Set (tagsList)]
    uniqueArrayTags.forEach(tags => {
      containerTags.innerHTML += `
      <li><a class="navFilter" href="#">#${tags}</a></li>
      `
    }); 
    //Ajout du listener avec appel à la fonction getPhotographFilter(filterName)
    let filterName ="";
    const nodeFilter = document.querySelectorAll(".navFilter");
    console.log(nodeFilter)
    nodeFilter.forEach(filter => {
      filter.addEventListener("click", e => {
        e.preventDefault();
        filterName = (filter.innerHTML.replace("#",""));
        getPhotographFilter(filterName)
      })
    });
}
