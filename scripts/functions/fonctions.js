import { container, arrayMedia } from '../constantes.js';
import {
  priceDisplay, tagsDisplay, formDisplay, titleDisplay,
} from './displayFunctions.js';
import { Lightbox } from '../class.js';
import { like } from './likeFunction.js';

let firstName = '';

// Fonction getPhotographFilter venant construire le DOM
export const getPhotographer = (source, filterId) => {
  container.innerHTML = ' ';
  // Boucle sur chaque photographe filtré afin de lui créer son propre article
  source.forEach((photograph) => {
    if (photograph.id === filterId) {
      container.innerHTML
            += `
            <article id="photograph${photograph.id}">
                <section class="infoPhotograph">
                    <div class="info">
                        <h1 id="name">${photograph.name}</h1>
                        <p id="localisation">${photograph.city}, ${photograph.country}</p>
                        <p id="tagline">${photograph.tagline}</p>
                        <ul id="tagList${photograph.id}">
                        </ul>
                    </div>
                    <button id="btnContact" alt="Contact Me" class="contact">Contactez-moi</button>
                    <img id="portrait" src="./Photos/Medias/Sample Photos/Photographers ID Photos/${photograph.portrait}" alt="${photograph.name}">
                </section>
                <section class="medias">
                    <div class="filter">
                    <h2>Trier par</h2>
                    <nav id="btnFilter" alt="Order by" role=”button” aria-haspopup="lisbox" aria-expanded>
                        <div class="deroulant">
                            <a id="popular" href="#"><p>popularité</p><i id="iconMenu"></i></a>
                            <ul class="sous" role="listbox", aria-activedescendant, aria-selected,  >
                                <li><a id="date" href="#">date</a></li>
                                <li><a id="titre" href="#">titre</a></li>
                            </ul>
                        </div>
                    </nav>
                    </div>
                    <ul id="containerMedias">
                    </ul>
                </section>
            </article>`;
      // Affichage du prix journalier
      priceDisplay(photograph.price);
      // Affichage du formulaire
      formDisplay(photograph.name);
      // Affichage du nom du photographe dans le titre de la fenêtre
      titleDisplay(photograph.name);
      // Affichage des tags correspondant au photographe
      tagsDisplay(photograph.tags, photograph.id);

      firstName = photograph.name.split(' ')[0].replace('-', ' ');
    }
  });
};

// Fonction getMedia venant afficher les médias non triés
export const getMedias = (source) => {
  const containerMedias = document.getElementById('containerMedias');
  source.forEach((mediaEl) => {
    if (mediaEl.image) {
      containerMedias.innerHTML += `
            <li class="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.image.replace('-', '')}" alt="${mediaEl.alt}">
                <img src="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.image.replace('-', '')}" alt="${mediaEl.alt}">
                </a>
                <div class="infoMedias">
                    <p>${mediaEl.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount">${mediaEl.likes}</p>
                        <button class="iconLike" aria-label="likes">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`;
    }
    if (mediaEl.video) {
      containerMedias.innerHTML += `
            <li class="medias" id="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.video}" alt="${mediaEl.alt}" type="video/mp4">
                <video controls alt="${mediaEl.alt}" type="video/mp4">
                    <source src="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.video}" alt="${mediaEl.alt}" type="video/mp4">
                </video>
                </a>
                <div class="infoMedias">
                    <p>${mediaEl.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount">${mediaEl.likes}</p>
                        <button class="iconLike" aria-label="likes">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`;
    }
  });
};

// Section Tri par Titre / Date / Popularité
let arrayFilterByLikes = [];
let arrayFilterByTitle = [];
let arrayFilterByDate = [];

// Fonction servant à trier les différents array par catégorie
export const fillArrayFilter = () => {
  arrayMedia.forEach((element) => {
    arrayFilterByTitle.push(element.title);
    arrayFilterByDate.push(element.date);
  });
  arrayFilterByLikes = arrayMedia.sort((a, b) => b.likes - a.likes);
  arrayFilterByDate = arrayFilterByDate.sort().reverse();
  arrayFilterByDate = [...new Set(arrayFilterByDate)];
  arrayFilterByTitle = arrayFilterByTitle.sort();
};

// Fonction venant trier les titres des médias par ordre alphabétique
export const mediasFilterByTitle = () => {
  const containerMedias = document.getElementById('containerMedias');
  containerMedias.innerHTML = '';
  arrayFilterByTitle.forEach((titre) => {
    arrayMedia.forEach((element) => {
      if (element.title === titre && element.image) {
        containerMedias.innerHTML += `
            <li class="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${element.image.replace('-', '')}" alt="${element.alt}">
                <img src="./Photos/Medias/Sample Photos/${firstName}/${element.image.replace('-', '')}" alt="${element.alt}">
                </a>
                <div class="infoMedias">
                    <p>${element.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount">${element.likes}</p>
                        <button class="iconLike" aria-label="likes">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`;
      }
      if (element.title === titre && element.video) {
        containerMedias.innerHTML += `
            <li class="medias" id="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${element.video}" alt="${element.alt}" type="video/mp4">
                <video controls alt="${element.alt}" type="video/mp4">
                    <source src="./Photos/Medias/Sample Photos/${firstName}/${element.video}" alt="${element.alt}" type="video/mp4">
                </video>
                </a>
                <div class="infoMedias">
                    <p>${element.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount likesCount${element.id}">${element.likes}</p>
                        <button class="iconLike iconLike${element.id}" aria-label="likes">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`;
      }
    });
  });
  Lightbox.init();
  like();
};

// Fonction venant trier les médias par date
export const mediasFilterByDate = () => {
  const containerMedias = document.getElementById('containerMedias');
  containerMedias.innerHTML = '';
  arrayFilterByDate.forEach((date) => {
    arrayMedia.forEach((element) => {
      if (element.date === date && element.image) {
        containerMedias.innerHTML += `
            <li class="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${element.image.replace('-', '')}" alt="${element.alt}">
                <img src="./Photos/Medias/Sample Photos/${firstName}/${element.image.replace('-', '')}" alt="alt="${element.alt}">
                </a>
                <div class="infoMedias">
                    <p>${element.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount">${element.likes}</p>
                        <button class="iconLike" aria-label="likes">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`;
      }
      if (element.date === date && element.video) {
        containerMedias.innerHTML += `
            <li class="medias" id="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${element.video}" alt="${element.alt}" type="video/mp4">
                <video controls>
                    <source src="./Photos/Medias/Sample Photos/${firstName}/${element.video}" alt="${element.alt}" type="video/mp4">
                </video>
                </a>
                <div class="infoMedias">
                    <p>${element.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount likesCount${element.id}">${element.likes}</p>
                        <button class="iconLike iconLike${element.id}" aria-label="likes">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`;
      }
    });
  });
  Lightbox.init();
  like();
};

// Fonction venant trier les médias par popularité
export const mediasFilterByLikes = () => {
  const containerMedias = document.getElementById('containerMedias');
  containerMedias.innerHTML = '';
  arrayFilterByLikes.forEach((element) => {
    if (element.image) {
      containerMedias.innerHTML += `
        <li class="medias">
            <a href="./Photos/Medias/Sample Photos/${firstName}/${element.image.replace('-', '')}" alt="${element.alt}">
            <img src="./Photos/Medias/Sample Photos/${firstName}/${element.image.replace('-', '')}" alt="${element.alt}">
            </a>
            <div class="infoMedias">
                <p>${element.title}</p> 
                <div class="likeSection">
                    <p class="likesCount">${element.likes}</p>
                    <button class="iconLike" aria-label="likes">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </li>`;
    }
    if (element.video) {
      containerMedias.innerHTML += `
            <li class="medias" id="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${element.video}" alt="${element.alt}" type="video/mp4">
                <video controls>
                    <source src="./Photos/Medias/Sample Photos/${firstName}/${element.video}" alt="${element.alt}" type="video/mp4">
                </video>
                </a>
                <div class="infoMedias">
                    <p>${element.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount likesCount${element.id}">${element.likes}</p>
                        <button class="iconLike iconLike${element.id}" aria-label="likes">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`;
    }
  });
  Lightbox.init();
  like();
};
