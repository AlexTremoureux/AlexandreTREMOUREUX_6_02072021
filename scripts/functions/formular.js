import { elInput , modal } from "../constantes.js"
//Fonction de validation de chaque Input
const inputValid = () => {
    let countValidationInput = 0;
    for (let element of elInput) {
        console.log(element.scope.nextElementSibling)
        /* Si il n'y a pas de valeurs rentrées, apparition d'un message d'erreur */
        if (element.scope.validity.valueMissing) {
          element.scope.style.borderColor = "red";
          /* Sinon si une mauvaise valeur est saisie, apparition d'un message d'erreur personnalisé */
        } else if (!element.regex.test(element.scope.value)) {
          element.scope.style.borderColor = "red";
          element.scope.nextElementSibling.innerHTML= element.errorMessage
          console.log(element.scope.nextElementSibling)
          /* Sinon effacement du message d'erreur si le champ est saisi correctement*/
        } else {
            element.scope.nextElementSibling.innerHTML= ""
          element.scope.style.borderColor = "black";
          countValidationInput ++;
        }
    }
    return (countValidationInput === elInput.length) 
}
// launch modal function
export const launchModal = () => { modal.style.display = "flex" } 
// close modal function
export const closeModal = () => { modal.style.display = "none" };

//fonction de validation avant envoi du Formulaire
export const validation = (event) => {
    event.preventDefault();
    // Validation champ Nom / Prénom / Email / Date de naissance / Nombre de tournois
    const inputValidity = inputValid();
    if ( inputValidity ) {
        setTimeout(() => {
          closeModal()
        }, 2000);
    } else {
        return false
    }
}