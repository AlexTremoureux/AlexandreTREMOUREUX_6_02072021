import { elInput, modal, modalFirstName } from '../constantes.js';

// Fonction de validation de chaque Input
const inputValid = () => {
  let countValidationInput = 0;
  elInput.forEach((element) => {
    const el = element;
    /* Si il n'y a pas de valeurs rentrées, apparition d'un message d'erreur */
    if (element.scope.validity.valueMissing) {
      el.scope.style.borderColor = 'red';
      el.scope.nextElementSibling.innerHTML = 'Veuillez remplir ce champ';
      /* Sinon si une mauvaise valeur est saisie, apparition d'un message d'erreur personnalisé */
    } else if (!element.regex.test(element.scope.value)) {
      el.scope.style.borderColor = 'red';
      el.scope.nextElementSibling.innerHTML = element.errorMessage;

      /* Sinon effacement du message d'erreur si le champ est saisi correctement */
    } else {
      el.scope.nextElementSibling.innerHTML = '';
      el.scope.style.borderColor = 'black';
      el.scope.setAttribute('aria-invalid', 'false');
      countValidationInput += 1;
      // eslint-disable-next-line no-console
      console.log(el.scope.name + el.scope.value);
    }
  });
  return countValidationInput === elInput.length;
};
const mainWrapper = document.getElementById('mainWrapper');
// launch modal function
export const launchModal = () => {
  modal.style.display = 'flex';
  modalFirstName.focus();
  mainWrapper.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'false');
};
// close modal function
export const closeModal = () => {
  modal.style.display = 'none';
  mainWrapper.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');
};
// fonction de validation avant envoi du Formulaire
export const validation = (event) => {
  event.preventDefault();
  // Validation champ Nom / Prénom / Email / Date de naissance / Nombre de tournois
  const inputValidity = inputValid();
  if (inputValidity) {
    setTimeout(() => {
      closeModal();
    }, 2000);
  } else {
    modalFirstName.focus();
    return false;
  }
  return true;
};
