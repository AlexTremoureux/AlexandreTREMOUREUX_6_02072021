import {
  ENV, modalClose, formValid, nbId, arrayMedia, modal,
} from './constantes.js';
import { functionSearchMediaById } from './functions/searchFunctions.js';
import {
  getPhotographer,
  getMedias,
  fillArrayFilter,
  mediasFilterByDate,
  mediasFilterByLikes,
  mediasFilterByTitle,
} from './functions/fonctions.js';
import { launchModal, closeModal, validation } from './functions/formular.js';
import { functionCountTotalLikes } from './functions/likeFunction.js';
import { Lightbox } from './class.js';

// __________Import des données Json et création dynamique des pages____________
const fetcher = async function fetcher() {
  const response = await fetch(ENV);
  const data = await response.json().catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
  // Remplissage de arrayMedia avec les medias correspondants à l'ID dans le window location
  functionSearchMediaById(data.media, nbId);
  // ----------------Création du DOM et import des médias------------------------
  getPhotographer(data.photographers, nbId);
  getMedias(arrayMedia);
  // ---------------Tri par Popularité / Date / Titre----------------------------
  fillArrayFilter();
  const btnFilter = document.getElementById('btnFilter');
  btnFilter.addEventListener('click', () => {
    if (btnFilter.value === 'Popularite') {
      mediasFilterByLikes();
    } else if (btnFilter.value === 'Date') {
      mediasFilterByDate();
    } else if (btnFilter.value === 'Titre') {
      mediasFilterByTitle();
    }
  });
  // ---------------------------likeFunction-------------------------------------
  functionCountTotalLikes();
  // ----------------------------Lightbox----------------------------------------
  Lightbox.init();
  // ----------------------------Formular----------------------------------------
  // launch modal event
  const contact = document.getElementById('btnContact');
  contact.addEventListener('click', launchModal);
  // Validation du formulaire avant envoi
  formValid.addEventListener('click', validation);
  // Bouton de fermeture du formulaire
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
};

fetcher();
