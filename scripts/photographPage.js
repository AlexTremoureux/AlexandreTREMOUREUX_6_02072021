import { container , prod, dev, env} from "./constantes.js";

let pId = window.location.search.split("-");
let nbId= Number (pId[1]);
let name = "";
let firstName = "";
let likes = [];
let countLikes = 0;

const title = document.getElementById("title");
const popular = document.getElementById("popular");
const date = document.getElementById("date");
const titre = document.getElementById("titre");
const price = document.getElementById("price")
//Fonction getPhotographFilter venant fetch les données et remplir les articles filtrés par tags
export const getPhotographer = async function (filterId) {
    let response = await fetch(dev)
    let data = await response.json()
    .catch(function (error) {
      alert(error)
    })
    container.innerHTML = " ";
    //Boucle sur chaque photographe filtré afin de lui créer son propre article
    data.photographers.forEach(photograph => {
        if (photograph.id === filterId) {
             name = photograph.name.split(" ");
             firstName = name [0];
             firstName = firstName.replace("-" , " ");
            title.innerHTML += 
            ` ${photograph.name}`
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
                <btn class="contact">Contactez-moi</btn>
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
            price.innerHTML+=`
            <p>${photograph.price}€ / jour</p>
            `
            //Boucle forEach afin d'afficher les différents tags de chaques photographes
            let tagList = document.getElementById("tagList"+photograph.id);
            photograph.tags.forEach(tagsElement => {
                tagList.innerHTML += 
                `<li id="tags"><a>#${tagsElement}</a></li>`
            });
        }
    });
};


export const getMedias = async function (id) {
    let response = await fetch(dev)
    let data = await response.json()
    .catch(function (error) {
      alert(error)
    })
    console.log(data)
    const containerMedias = document.getElementById("containerMedias")
    data.media.forEach(mediaEl => {
        if (mediaEl.photographerId == id && mediaEl.image) {
            likes.push(mediaEl.likes);
            containerMedias.innerHTML += `
            <li class="medias">
                <img src="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.image.replace("-", "")}" alt="">
                <div class="infoMedias">
                    <p>${mediaEl.title}</p> 
                    <p>${mediaEl.likes} \u2764</p>
                </div>
            </li>`
        }
        if (mediaEl.photographerId == id && mediaEl.video) {
            likes.push(mediaEl.likes);
            containerMedias.innerHTML += `
            <li class="medias">
                <video controls>
                    <source src="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.video}" alt="" type="video/mp4">
                </video>

                <div class="infoMedias">
                    <p>${mediaEl.title}</p>
                    <p>${mediaEl.likes} \u2764</p>
                </div>
                
            </li>`
        }
        
    
    })
    countLikes = likes.reduce((a, b)=> a + b,0);
    price.innerHTML+=`
    <p>${countLikes} \u2764</p>
    `
};
getPhotographer(nbId);
getMedias(nbId);
