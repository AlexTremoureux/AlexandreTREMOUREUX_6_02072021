//Constantes
const container = document.getElementById("container");
let filterName = "";
let newFilter = "filter"+filterName

const requestURL = 'https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json';

//Fonction getPhotograph venant fetch les données et remplir les articles

/*const getPhotograph = async function () {
  let response = await fetch(requestURL)
  let data = await response.json()

  //compteur pour définir les id = taglist+compteur de la liste de tags
  let countId = 0;

  //Boucle sur chaque photographe afin de lui créer son propre article
  await data.photographers.forEach(element => {
    countId ++;
    container.innerHTML += 
    `<article id="photograph${countId}">
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

    //Et la ça commence à merder!!!!
    const tagFilter = (filterName) => {
      const navList = document.getElementById("navList");
      let navChild = navList.children;
      let idPhotograph = document.getElementById("photograph"+countId);
      for (let elementFilter of navChild) {
        filterName = (elementFilter.outerText.replace("#","").toLowerCase());
        newFilter = document.getElementsByClassName(".navFilter");
      }

      //Le filtre de tags que je voudrais faire fonctionner avec la variable filterName(remplacer travel par filterName)
      if ([...element.tags].filter(tags => tags=="travel").length===0) {
        idPhotograph.style.display="none";
      } else {
        idPhotograph.style.display="block";
      };
    };
    
    //newFilter.addEventListener(onclick, tagFilter())
    tagFilter()
  });
};

console.time('Execution Time');
getPhotograph()
console.timeEnd('Execution Time');

//Pour récupérer l'élément filtre sur les différents tags de la nav
/*const tagsListFilter = () => {
const navList = document.getElementById("navList");
let nav = navList.children
for (let elementFilter of nav) {
  filterName = (elementFilter.outerText.replace("#","").toLowerCase())
}
}*/
//tagsListFilter()

class photographe {
  constructor(name, id, city, country, tags, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tags = tags;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
  }
}
let newPhotographe = [];
const getPhotographFilter = async function () {
  let response = await fetch(requestURL)
  let data = await response.json()
  let countId = 0;
  await data.photographers.forEach(element => {
    newPhotographe = new photographe(element.name, element.id, element.city, element.country, element.tags, element.tagline, element.price, element.portrait);
    console.log(newPhotographe);
    countId ++;
    container.innerHTML += 
    `<article id="photograph${countId}">
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
    let idPhotograph = document.getElementById("photograph"+countId);
    if ([...element.tags].filter(tags => tags=="travel").length===0) {
      idPhotograph.style.display="none";
    } else {
      idPhotograph.style.display="block";
    };
  })}
  //Calcul du temps d'execution de la fonction
console.time('Execution Time');
getPhotographFilter()
console.timeEnd('Execution Time');
