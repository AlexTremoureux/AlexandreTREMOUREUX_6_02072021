import { name , firstName } from "../variables.js";
import { container , prod, dev, env, title , price } from "../constantes.js";

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