import { container , prod, dev, env} from "./constantes.js";


//Fonction getPhotographFilter venant fetch les données et remplir les articles filtrés par tags
export const getPhotographer = async function (filter) {
    let response = await fetch(dev)
    let data = await response.json()
    .catch(function (error) {
      alert(error)
    })
    container.innerHTML = " ";
    //Boucle sur chaque photographe filtré afin de lui créer son propre article
    data.photographers.forEach(photograph => {
        if (photograph.tags.includes(filter)) {
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
                <p class="contact">Contactez-moi</p>
                <img id="portrait" src="./Photos/Medias/Sample Photos/Photographers ID Photos/${photograph.portrait}" alt="">
            </section>
            <section class="medias">
                <h2>Trier par</h2>
                <btn>popularité/date/titre</btn>
                <ul id="medias">
                </ul>
            </section>
            <p id="price">${photograph.price}€/jour</p>
            </article>`;
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
    const containerMedias = document.getElementById("medias")
    let arraysMedias = []
    data.media.forEach(mediaEl => {
        console.log(mediaEl)
        if (mediaEl.photographerId == 82) {
            console.log(mediaEl.image)
            containerMedias.innerHTML += `
            <li>
                <img src="./Photos/Medias/Sample Photos/Tracy/${mediaEl.image}" alt="">
            </li>`
        }
        arraysMedias.push(mediaEl.photographerId)
    })
    console.log(arraysMedias.includes(82))
    let uniqueArrayMediasPhotographerId = [...new Set (arraysMedias)]  
    console.log(uniqueArrayMediasPhotographerId)
};
getPhotographer("sport");
getMedias();