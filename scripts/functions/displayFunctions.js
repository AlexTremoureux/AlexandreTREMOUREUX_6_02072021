import { priceInfo, title, modalText } from "../constantes.js";
//Affichage des tags correspondant au photographe
export const tagsDisplay = (tags,id) => {
    let tagList = document.getElementById("tagList"+id);
    tags.forEach(tagsElement => {
    tagList.innerHTML += 
    `<li id="tags"><a>#${tagsElement}</a></li>`
    });
}
//Affichage du prix journalier
export const priceDisplay = (photographerPrice) => {
    priceInfo.innerHTML+=`<p>${photographerPrice}€ / jour</p>`
}
//Affichage du formulaire
export const formDisplay = (name) => {
        modalText.innerHTML+=`${name}`
};
//Affichage du nom du photographe dans le titre de la fenêtre 
export const titleDisplay = (name) => {
    title.innerHTML += ` ${name}`
}