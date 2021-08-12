
import { container } from "../constantes.js";
import {priceDisplay, tagsDisplay, formDisplay, titleDisplay } from "./displayFunctions.js"

//Fonction getPhotographFilter venant construire le DOM 
export const getPhotographer = (source , filterId) => {
    container.innerHTML = " ";
    //Boucle sur chaque photographe filtré afin de lui créer son propre article
    source.forEach(photograph => {
        if (photograph.id === filterId) {
            container.innerHTML += 
            `<article id="photograph${photograph.id}">
            <section class="infoPhotograph">
                <div class="info">
                    <h1 id="name">${photograph.name}</h1>
                    <p id="localisation">${photograph.city}, ${photograph.country}</p>
                    <p id="tagline">${photograph.tagline}</p>
                    <ul id="tagList${photograph.id}">
                    </ul>
                </div>
                <btn id="btnContact" class="contact">Contactez-moi</btn>
                <img id="portrait" src="./Photos/Medias/Sample Photos/Photographers ID Photos/${photograph.portrait}" alt="Photo de ${photograph.name}">
            </section>
            <section class="medias">
                <div class="filter">
                <h2>Trier par</h2>
                <nav id="btnFilter">
                    <div class="deroulant">
                        <a id="popular" href="#"><p>popularité</p><p id="iconMenu"></p></a>
                        <ul class="sous">
                            <li><a id="date" href="#">date</a></li>
                            <li><a id="titre" href="#">titre</a></li>
                        </ul>
                    </div>
                </nav>
                </div>
                <ul id="containerMedias">
                </ul>
            </section>
            </article>`;
            //Affichage du prix journalier
            priceDisplay(photograph.price);
            //Affichage du formulaire
            formDisplay(photograph.name);
            //Affichage du nom du photographe dans le titre de la fenêtre 
            titleDisplay(photograph.name);
            //Affichage des tags correspondant au photographe
            tagsDisplay(photograph.tags,photograph.id);
        }
    });
};

export const getMedias = (source,name) => {
    const containerMedias = document.getElementById("containerMedias");
    source.forEach(mediaEl => {         
        if (mediaEl.image) {
            containerMedias.innerHTML += `
            <li class="medias">
                <a href="./Photos/Medias/Sample Photos/${name}/${mediaEl.image.replace("-", "")}">
                <img src="./Photos/Medias/Sample Photos/${name}/${mediaEl.image.replace("-", "")}" alt="">
                </a>
                <div class="infoMedias">
                    <p>${mediaEl.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount">${mediaEl.likes}</p>
                        <button class="iconLike">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`;
        }
        if (mediaEl.video) {
            containerMedias.innerHTML += `
            <li class="medias" id="medias">
                <a href="./Photos/Medias/Sample Photos/${name}/${mediaEl.video}" alt="" type="video/mp4">
                <video controls>
                    <source src="./Photos/Medias/Sample Photos/${name}/${mediaEl.video}" alt="" type="video/mp4">
                </video>
                </a>
                <div class="infoMedias">
                    <p>${mediaEl.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount">${mediaEl.likes}</p>
                        <button class="iconLike">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`
        }
    })
    
};