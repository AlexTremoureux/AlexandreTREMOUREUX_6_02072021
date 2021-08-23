import { container, ENV } from '../constantes.js';
// eslint-disable-next-line import/no-cycle
import { getTags } from './getTags.js';

// Fonction getPhotographFilter venant fetch les données et remplir les articles filtrés par tags
// eslint-disable-next-line import/prefer-default-export
export const getPhotographFilter = async function getPhotographFilter(filter) {
  const response = await fetch(ENV);
  const data = await response.json().catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
  container.innerHTML = ' ';
  // Boucle sur chaque photographe filtré afin de lui créer son propre article
  data.photographers.forEach((photograph) => {
    if (photograph.tags.includes(filter)) {
      container.innerHTML += `<article id="photograph${photograph.id}">
          <section class="headerSection">
            <a href="./photographPage.html?id-${photograph.id}">
              <img id="portrait" src="./Photos/Medias/Sample Photos/Photographers ID Photos/${photograph.portrait}" alt="">
              <h2 id="name">${photograph.name}</h2>
            </a>
          </section>
          <section class="mainSection">
            <p id="localisation">${photograph.city}, ${photograph.country}</p>
            <p id="tagline">${photograph.tagline}</p>
            <p id="price">${photograph.price}€/jour</p>
          </section>
          <section class="tagSection">
            <ul id="tagList${photograph.id}">
            </ul>
          </section>
        </article>`;
      // Boucle forEach afin d'afficher les différents tags de chaque photographe
      const tagList = document.getElementById(`tagList${photograph.id}`);
      photograph.tags.forEach((tagsElement) => {
        tagList.innerHTML += `<li id="tags"><a class="navFilter tagsLinkElement" alt="tag" href="#">#${tagsElement}</a></li>`;
      });
    }
  });
  getTags();
};
