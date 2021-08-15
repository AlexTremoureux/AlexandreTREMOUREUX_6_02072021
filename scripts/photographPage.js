import {
  ENV, modalClose, formValid, nbId, arrayMedia,
} from './constantes.js';
import { functionSearchMediaById } from './functions/searchFunctions.js';
import {
  getPhotographer, getMedias, fillArrayFilter, mediasFilterByDate,
  mediasFilterByLikes, mediasFilterByTitle,
} from './functions/fonctions.js';
import { launchModal, closeModal, validation } from './functions/formular.js';
import { Lightbox } from './class.js';
import { functionCountTotalLikes, like } from './functions/likeFunction.js';

// __________Import des données Json et création dynamique des pages____________
const fetcher = async function fetcher() {
  const response = await fetch(ENV);
  const data = await response.json()
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  // Remplissage de arrayMedia avec les medias correspondants à l'ID dans le window location
  functionSearchMediaById(data.media, nbId);
  // ----------------Création du DOM et import des médias------------------------
  getPhotographer(data.photographers, nbId);
  getMedias(arrayMedia);
  // -------------------------class LightBox-------------------------------------
  Lightbox.init();
  // ---------------Tri par Popularité / Date / Titre----------------------------
  fillArrayFilter();
  const popular = document.getElementById('popular');
  const date = document.getElementById('date');
  const titre = document.getElementById('titre');
  popular.addEventListener('click', mediasFilterByLikes);
  date.addEventListener('click', mediasFilterByDate);
  titre.addEventListener('click', mediasFilterByTitle);
  // ---------------------------likeFunction-------------------------------------
  functionCountTotalLikes();
  like();
  // ----------------------------Formular----------------------------------------
  // launch modal event
  const contact = document.getElementById('btnContact');
  contact.addEventListener('click', launchModal);
  // Validation du formulaire avant envoi
  formValid.addEventListener('click', validation);
  // Bouton de fermeture du formulaire
  modalClose.addEventListener('click', closeModal);
};

fetcher();
