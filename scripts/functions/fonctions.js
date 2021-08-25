import { container } from '../constantes.js';
import {
  priceDisplay,
  tagsDisplay,
  formDisplay,
  titleDisplay,
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
      container.innerHTML += `
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
                        <label for="btnFilter">Trier par</label>
                        <nav>
                            <select id="btnFilter" value=" ">
                                <option value="Popularite">Popularité</option>
                                <option value="Date">Date</option>
                                <option value="Titre">Titre</option>
                            </select>
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
                        <button class="iconLike" aria-label='button-like'>
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`;
    }
    if (mediaEl.video) {
      containerMedias.innerHTML += `
            <li class="medias" id="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.video}" alt="${mediaEl.alt}">
                <video>
                    <source src="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.video}" alt="${mediaEl.alt}" type="video/mp4">
                    Lien vers ${mediaEl.title}
                    <track src="./Photos/Medias/Sample Photos/${firstName}/fichier.vtt" label="French captions" kind="captions" srclang="fr" default>
                </video>
                </a>
                <div class="infoMedias">
                    <p>${mediaEl.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount">${mediaEl.likes}</p>
                        <button class="iconLike" aria-label='button-like'>
                            <i class="fas fa-heart" ></i>
                        </button>
                    </div>
                </div>
            </li>`;
    }
  });
  like();
};

// Fonction venant afficher les médias en fonction de l'array utilisé en paramètre
export const mediasFilterBy = (array) => {
  const containerMedias = document.getElementById('containerMedias');
  containerMedias.innerHTML = '';
  array.forEach((element) => {
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
                <video title="${element.title}" alt="${element.alt}">Lien vers ${element.title}
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
