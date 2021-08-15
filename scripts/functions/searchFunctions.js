import { arrayMedia } from '../constantes.js';

// Remplissage de arrayMedia avec les medias correspondants à l'ID dans le window location
// eslint-disable-next-line import/prefer-default-export
export const functionSearchMediaById = (source, id) => {
  source.forEach((element) => {
    if (element.photographerId === id) {
      arrayMedia.push(element);
    }
    return arrayMedia;
  });
};
