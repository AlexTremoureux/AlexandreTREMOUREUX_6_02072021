import { container } from "./constantes";
import { prod } from "./constantes";
import { dev } from "./constantes";
import { env } from "./constantes";

//Fonction getTags venant fetch les données 
export const getTags = async function () {
    let response = await fetch(dev )
    let data = await response.json()
    .catch(function (error) {
      alert(error)
    })
    //Boucle sur chaque photographe afin de récupérer les tags
    const containerTags = document.getElementById("containerTags");
    let tagsList = []
    data.photographers.forEach(element => {
      element.tags.forEach(tagsElement => {
        tagsList += " "+tagsElement
      }); 
    });
    let arrayTags = tagsList.slice(1).split(" ")
    let uniqueArrayTags = [...new Set (arrayTags)]
    console.log(uniqueArrayTags);
    uniqueArrayTags.forEach(tagsElement => {
      containerTags.innerHTML += `
      <li><a id="navFilter${tagsElement}" >#${tagsElement}</a></li>
      `
      const tagId = document.getElementById(tagsElement)
      //tagsElement.addeventListener(onclick, event)
      console.log(tagId)
    }); 
}

//Fonction tagFilter
export const tagFilter = () => {
    const navList = document.getElementById("containerTags");
    let navChild = navList.children;
    
    for (let elementFilter of navChild) {
      
      const filterName = (elementFilter.outerText.replace("#","").toLowerCase());
      const newFilter = document.getElementsByClassName(".navFilter");
    }
};

//Fonction getPhotograph venant fetch les données et remplir les articles
export const getPhotograph = async function () {
    let response = await fetch(dev)
    let data = await response.json()
    .catch(function (error) {
      alert(error)
    })
    //Boucle sur chaque photographe afin de lui créer son propre article
    data.photographers.forEach(element => {
      
      container.innerHTML += 
      `<article id="photograph${element.id}">
        <section class="headerSection">
          <a href="">
            <img id="portrait" src="./Photos/Medias/Sample Photos/Photographers ID Photos/${element.portrait}" alt="">
            <h2 id="name">${element.name}</h2>
          </a>
        </section>
        <section class="mainSection">
          <p id="localisation">${element.city}, ${element.country}</p>
          <p id="tagline">${element.tagline}</p>
          <p id="price">${element.price}€/jour</p>
        </section>
        <section class="tagSection">
          <ul id="tagList${element.id}">
          </ul>
        </section>
      </article>`;
  
      //Boucle forEach afin d'afficher les différents tags de chaque photographe
      let tagList = document.getElementById("tagList"+element.id);
      element.tags.forEach(tagsElement => {
        tagList.innerHTML += 
        `<li id="tags"><a>#${tagsElement}</a></li>`
      });
      let idPhotograph = document.getElementById("photograph"+element.id);
      //Le filtre de tags que je voudrais faire fonctionner avec la variable filterName(remplacer travel par filterName)
      if (!element.tags.filter(tags => tags=="travel").length) {
        idPhotograph.style.display="none";
      } else {
        idPhotograph.style.display="block";
      };
    });
    tagFilter()
};