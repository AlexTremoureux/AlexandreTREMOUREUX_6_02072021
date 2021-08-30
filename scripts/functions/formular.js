import {
  elInput, mainWrapper, modal, modalFirstName,
} from '../constantes.js';

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

// launch modal fonction
export const launchModal = () => {
  modal.style.display = 'flex';
  mainWrapper.setAttribute('aria-hidden', true);
  modal.setAttribute('aria-hidden', false);
  const btnClose = document.getElementById('close');
  const focusableElementsArray = [...modal.querySelectorAll('input'), btnClose];
  const firstFocusableElement = focusableElementsArray[0];
  const lastFocusableElement = focusableElementsArray[focusableElementsArray.length - 1];
  // focus sur le premier input du formulaire
  firstFocusableElement.focus();
  // Gestion de la tabulation
  focusableElementsArray.forEach((focusableElement) => {
    if (focusableElement.addEventListener) {
      focusableElement.addEventListener('keydown', (event) => {
        const tab = event.key === 'Tab';
        if (!tab) {
          return;
        }
        // Si retour arrière avec shift + tab sur le formulaire:
        if (event.shiftKey) {
          if (event.target === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else if (event.target === lastFocusableElement) { // Avec tab
          event.preventDefault();
          firstFocusableElement.focus();
        }
      });
    }
  });
};
// close modal fonction
export const closeModal = () => {
  modal.style.display = 'none';
  mainWrapper.setAttribute('aria-hidden', false);
  modal.setAttribute('aria-hidden', true);
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
