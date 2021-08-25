import {
  modalClose, formValid, nbId, arrayMedia, modal, url,
} from './constantes.js';
import { functionSearchMediaById } from './functions/searchFunctions.js';
import {
  getPhotographer,
  getMedias,
  mediasFilterBy,
} from './functions/fonctions.js';
import { launchModal, closeModal, validation } from './functions/formular.js';
import { functionCountTotalLikes } from './functions/likeFunction.js';
import { Lightbox } from './class.js';

// __________Import des données Json et création dynamique des pages____________
const fetcher = async function fetcher() {
  const response = await fetch(url);
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
  const btnFilter = document.getElementById('btnFilter');
  btnFilter.addEventListener('click', () => {
    if (btnFilter.value === 'Popularite') {
      // Comparaison du nombre de likes pour trier l'array
      const arrayFilterByLikes = arrayMedia.sort((el1, el2) => el2.likes - el1.likes);
      mediasFilterBy(arrayFilterByLikes);
    } else if (btnFilter.value === 'Date') {
      // Transformation de la string date en nouvel objet Date puis comparaison
      let arrayFilterByDate = arrayMedia.sort((eA, eB) => new Date(eB.date) - new Date(eA.date));
      // Suppression des doublons avec Set et transformation du Set en array avec le spread operator
      arrayFilterByDate = [...new Set(arrayFilterByDate)];
      mediasFilterBy(arrayFilterByDate);
    } else if (btnFilter.value === 'Titre') {
      // Fonction de comparaison des éléments titre en leur renvoyant une valeur de retour
      const sortTitle = (a, b) => {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
      };
      const arrayFilterByTitle = arrayMedia.sort(sortTitle);
      mediasFilterBy(arrayFilterByTitle);
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
