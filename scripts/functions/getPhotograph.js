import { container , prod, dev, env} from "../constantes.js";

//Fonction getPhotograph venant fetch les données et remplir les articles
export const getPhotograph = async function () {
    let response = await fetch(dev)
    let data = await response.json()
    .catch(function (error) {
      alert(error="erreur")
    })
    //Boucle sur chaque photographe afin de lui créer son propre article
    data.photographers.forEach(photograph => {
      container.innerHTML += 
      `<article id="photograph${photograph.id}">
        <section class="headerSection">
          <a href="">
            <img id="portrait" src="./Photos/Medias/Sample Photos/Photographers ID Photos/${photograph.portrait}" alt="">
            <h2 id="name">${photograph.name}</h2>
          </a>
        </section>
        <section class="mainSection">
          <p id="localisation">${photograph.city}, ${photograph.country}</p>
          <p id="tagline">${photograph.tagline}</p>
          <p id="price">${photograph.price}€/jour</p>
        </section>
        <section class="tagSection">
          <ul id="tagList${photograph.id}">
          </ul>
        </section>
      </article>`;
      
      //Boucle forEach afin d'afficher les différents tags de chaque photographe
      let tagList = document.getElementById("tagList"+photograph.id);
      photograph.tags.forEach(tagsElement => {
        tagList.innerHTML += 
        `<li id="tags"><a>#${tagsElement}</a></li>`
      });
    });
};