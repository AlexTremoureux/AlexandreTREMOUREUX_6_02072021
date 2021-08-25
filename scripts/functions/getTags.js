import { url } from '../constantes.js';
// eslint-disable-next-line import/no-cycle
import { getPhotographFilter } from './getPhotographFilter.js';

// Fonction getTags venant fetch les données pour afficher la liste de filtres de navigation
// eslint-disable-next-line import/prefer-default-export
export const getTags = async function getTags() {
  const response = await fetch(url);
  const data = await response.json().catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
  // Boucle sur chaque photographe puis sur chaque tags afin de les stocker dans un array
  const containerTags = document.getElementById('containerTags');
  const tagsList = [];
  data.photographers.forEach((photograph) => {
    photograph.tags.forEach((tagsElement) => {
      tagsList.push(tagsElement);
    });
  });
  // Suppression des tags en doublons et intégration HTML de chaque tags trouvé
  const uniqueArrayTags = [...new Set(tagsList)];
  containerTags.innerHTML = '';
  uniqueArrayTags.forEach((tags) => {
    containerTags.innerHTML += `
      <li><a class="navFilter tagsLinkElement" alt="tag" href="#">#${tags}</a></li>
      `;
  });
  // Ajout du listener avec appel à la fonction getPhotographFilter(filterName)
  let filterName = '';
  const nodeFilter = document.querySelectorAll('.navFilter');
  nodeFilter.forEach((filter) => {
    filter.addEventListener('click', (e) => {
      e.preventDefault();
      filterName = filter.innerHTML.replace('#', '');
      getPhotographFilter(filterName);
    });
  });
};
