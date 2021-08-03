
import { nbId , likes , countLikes , btnLike , arrayMedia , arrayElementTitle , arrayFilterByDate , arrayFilterByLikes , arrayFilterByTitle , modalText} from "../variables.js";
import { container , lightboxContainer , prod, dev, env, title , price, popular, date , titre } from "../constantes.js";
import {priceDisplay, tagsDisplay, formDisplay, titleDisplay } from "./displayFunctions.js"

let name = "";
let firstName = "";

function incrementLikes() {
    const likesCount = document.querySelector(".likesCount");
    let likes = Number (likesCount.innerHTML);
    let newLikes = likes + 1;
    likesCount.innerHTML=`${newLikes}`;
    console.log(likesCount);
}
function like() {
    const iconLike = document.querySelectorAll(".iconLike");
    console.log(iconLike)
    iconLike.forEach(element => {element.addEventListener('click', incrementLikes)});
}

//Fonction getPhotographFilter venant construire le DOM 
export const getPhotographer = (source , filterId) => {
    container.innerHTML = " ";
    //Boucle sur chaque photographe filtré afin de lui créer son propre article
    source.forEach(photograph => {
        if (photograph.id === filterId) {
            name = photograph.name.split(" ");
            firstName = name [0];
            firstName = firstName.replace("-" , " ");
    
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
                <img id="portrait" src="./Photos/Medias/Sample Photos/Photographers ID Photos/${photograph.portrait}" alt="">
            </section>
            <section class="medias">
                <div class="filter">
                <h2>Trier par</h2>
                <nav id="btnFilter">
                    <li class="deroulant"><a id="popular" href="#">popularité</a>
                    <ul class="sous">
                        <li><a id="date" href="#">date</a></li>
                        <li><a id="titre" href="#">titre</a></li>
                    </ul>
                    </li>
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

export const getMedias = (source,id) => {
    source.forEach(mediaEl => {         
        if (mediaEl.photographerId == id && mediaEl.image) {
            arrayFilterByLikes.push(mediaEl);
            arrayFilterByTitle.push(mediaEl.title);
            arrayElementTitle.push(mediaEl);
            arrayFilterByDate.push(mediaEl.date);
            likes.push(mediaEl.likes);
            const containerMedias = document.getElementById("containerMedias");
            containerMedias.innerHTML += `
            <li class="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.image.replace("-", "")}">
                <img src="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.image.replace("-", "")}" alt="">
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
            like();
            arrayMedia.push(mediaEl.image);
        }
        if (mediaEl.photographerId == id && mediaEl.video) {
            likes.push(mediaEl.likes);
            containerMedias.innerHTML += `
            <li class="medias" id="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.video}">
                <video controls>
                    <source src="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.video}" alt="" type="video/mp4">
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
            like();
            arrayMedia.push(mediaEl.video);
            console.log(arrayMedia);
        }
    })



    arrayFilterByLikes.sort((a, b) => b.likes - a.likes )
        console.log(arrayFilterByLikes)
    arrayFilterByTitle.sort()
        console.log(arrayFilterByTitle)
        console.log(arrayElementTitle)
    arrayFilterByDate.sort().reverse();
        console.log(arrayFilterByDate)

    //countLikes = likes.reduce((a, b)=> a + b,0);
    price.innerHTML+=`
    <p>${countLikes} <i class="fas fa-heart"></i></p>
    `
    //const medias = document.getElementById("medias")
    
    
};

const getMediasFilterByLikes = () => {
    arrayFilterByLikes.forEach(element => {
    containerMedias.innerHTML+=`<li class="medias">
    <a href="./Photos/Medias/Sample Photos/${firstName}/${element.image.replace("-", "")}">
    <img src="./Photos/Medias/Sample Photos/${firstName}/${element.image.replace("-", "")}" alt="">
    </a>
    <div class="infoMedias">
        <p>${element.title}</p> 
        <div class="likeSection">
            <p class="likesCount">${element.likes}</p>
            <button class="iconLike">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    </div>
    </li>`
    });

}
//const popular = document.getElementById("popular")
//const date = document.getElementById("date")
//const titre = document.getElementById("titre")
//popular.addEventListener("click" , getMediasFilterByLikes(nbId))
//date.addEventListener("click" , getMediasFilterByDate(nbId))
//titre.addEventListener("click" , getMediasFilterByTitle(nbId))
    
    
    







