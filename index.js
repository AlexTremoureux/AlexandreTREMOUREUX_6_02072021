//Constantes
const container = document.getElementById("container");
const nav = document.getElementById("nav");
const requestURL = 'https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json';

//Fonction getPhotograph venant fetch les données et remplir les articles
const getPhotograph = async function () {
  let response = await fetch(requestURL)
  let data = await response.json()
  //compteur pour définir les id = taglist+compteur de la liste de tags
  let countId = 0;
  //Boucle sur chaque photographe afin de lui créer son propre article
  data.photographers.forEach(element => {
    countId ++;
    container.innerHTML += 
    `<article>
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
        <ul id="tagList${countId}">
        </ul>
      </section>
    </article>`;
    //Boucle forEach afin d'afficher les différents tags de chaque photographe
    let tagList = document.getElementById("tagList"+countId);
    [...element.tags].forEach(tagsElement => {
      tagList.innerHTML += 
      `<li id="tags"><a>#${tagsElement}</a></li>`
    });
  });
}

//Calcul du temps d'execution de la fonction
console.time('Execution Time');
getPhotograph()
console.timeEnd('Execution Time');
