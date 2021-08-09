import { nbId,arrayMedia } from "./variables.js";
import {  PROD, DEV, ENV, modal, modalClose, formValid } from "./constantes.js";
import { functionSearchMediaById, functionSearchFirstName } from "./functions/searchFunctions.js";
import { getPhotographer, getMedias } from "./functions/fonctions.js";
import { launchModal, closeModal, validation } from "./functions/formular.js";
import { fillArrayFilter, mediasFilterByDate, mediasFilterByLikes, mediasFilterByTitle } from "./functions/filterFunctions.js";
import { Lightbox } from "./class.js";
import { functionCountTotalLikes, like } from "./functions/likeFunction.js";
import { firstName } from "./functions/searchFunctions.js";
//_________________________________________Import des données Json et création dynamique des pages________________________________________


const fetcher = ( async function () {
    let response = await fetch(ENV)
    let data = await response.json()
    .catch(function (error) {
    alert(error)
    })
    //------------------------Recherche des medias et du prénom en fonction de l'ID dans le window location------------------------------------------
    functionSearchMediaById(data.media,nbId)
    functionSearchFirstName(data.photographers, nbId)
    //--------------------------------------------Création du DOM et import des médias---------------------------------------------------------------
    getPhotographer(data.photographers , nbId);
    getMedias(arrayMedia, firstName);
    //--------------------------------------------------------class LightBox-------------------------------------------------------------------------
    Lightbox.init()
    //--------------------------------------------Tri par Popularité / Date / Titre------------------------------------------------------------------
     const containerMedias = document.getElementById("containerMedias");
    fillArrayFilter()
    const popular = document.getElementById("popular")
    const date = document.getElementById("date")
    const titre = document.getElementById("titre")
    popular.addEventListener("click" , mediasFilterByLikes)
    date.addEventListener("click" , mediasFilterByDate)
    titre.addEventListener("click" , mediasFilterByTitle)
    //---------------------------------------------------------likeFunction--------------------------------------------------------------------------
    console.time('Execution Time');
    functionCountTotalLikes()
    like()
    console.timeEnd('Execution Time');
    //-----------------------------------------------------------Formular----------------------------------------------------------------------------
    // launch modal event
    const contact = document.getElementById("btnContact");
    contact.addEventListener("click", launchModal) 
    //Validation du formulaire avant envoi
    formValid.addEventListener('click', validation );
    //Bouton de fermeture du formulaire
    modalClose.addEventListener("click", closeModal );
})()

//_________________________________Attente de la création du DOM avant la mise en place des autres fonctions_________________________________________
/*const waitBuildDOM = ( async function () {
    
    let DOMisReady = await fetcher();
    
    
    
 
})*/
