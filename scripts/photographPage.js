import { nbId } from "./variables.js";
import {  prod, dev, env, modal, modalClose, formValid } from "./constantes.js";
import { getPhotographer, getMedias } from "./functions/fonctions.js";
import { launchModal, closeModal, validation } from "./functions/formular.js"
import { Lightbox } from "./class.js";
const fetcher = ( async function () {
    let response = await fetch(dev)
    let data = await response.json()
    .catch(function (error) {
    alert(error)
    })
    console.log("1")
    getPhotographer(data.photographers , nbId);
    getMedias(data.media , nbId);
    console.log("2")
})

const waitBuildDOM = ( async function () {
    let DOMisReady = await fetcher();
    console.log("3")
    
    //-------------------------------------Formular-----------------------------------------
    // launch modal event
    const contact = document.getElementById("btnContact");
    contact.addEventListener("click", launchModal) 
    //Validation du formulaire avant envoi
    formValid.addEventListener('click', validation );
    //Bouton de fermeture du formulaire
    modalClose.addEventListener("click", closeModal );
    //-------------------------------------LightBox------------------
    Lightbox.init()
})()
