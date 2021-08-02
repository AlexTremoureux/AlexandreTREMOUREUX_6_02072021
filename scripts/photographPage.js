//import { nbId , name , firstName , likes , countLikes , btnLike } from "./variables.js";
import { container , prod, dev, env, title , price, popular, date , titre } from "./constantes.js";
//import { getPhotographer } from "./functions/getPhotographer.js";
//import { getMedias } from "./functions/getMedias.js";

export let pId = window.location.search.split("-");
export let nbId= Number (pId[1]);
export let name = "";
export let firstName = "";
export let likes = [];
export let countLikes = 0;
export let btnLike=0;


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
            price.innerHTML+=`
            <p>${photograph.price}€ / jour</p>
            `
            let modalName = document.getElementById('modalText')
            modalName.innerHTML+=`${photograph.name}`
            // launch modal function
            //const launchModal = () => { modal.style.display = "block" } 
            const contact = document.getElementById("btnContact");
            // launch modal event
            contact.addEventListener("click", launchModal) 
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
    
    let arrayMedia = [];
    let arrayFilterByLikes = [];
    let arrayFilterByTitle = [];
    let arrayElementTitle = [];
    let arrayFilterByDate = [];
    const lightboxContainer = document.getElementsByClassName(".lightbox__container");
    const containerMedias = document.getElementById("containerMedias")
    
    
    data.media.forEach(mediaEl => {         
        if (mediaEl.photographerId == id && mediaEl.image) {
            arrayFilterByLikes.push(mediaEl)
            arrayFilterByTitle.push(mediaEl.title),
            arrayElementTitle.push(mediaEl);
            arrayFilterByDate.push(mediaEl.date)
    
            likes.push(mediaEl.likes);
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
            </li>`
            like()
            arrayMedia.push(mediaEl.image)
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
            like()
            arrayMedia.push(mediaEl.video)
            console.log(arrayMedia)
        }

        function like() {
            const iconLike = document.querySelectorAll(".iconLike");
            iconLike.forEach(element => {
                element.addEventListener('click', e => {
                    incrementLikes()
                })
            });
            
            function incrementLikes() {
                const likesCount = document.querySelector(".likesCount");
                let likes = Number (likesCount.innerHTML);
                let newLikes = likes + 1;
                likesCount.innerHTML=`${newLikes}`
                console.log(likesCount.innerHTML)
            }
        }
    })

    

    arrayFilterByLikes.sort((a, b) => b.likes - a.likes )
        console.log(arrayFilterByLikes)
    arrayFilterByTitle.sort()
        console.log(arrayFilterByTitle)
        console.log(arrayElementTitle)
    arrayFilterByDate.sort().reverse();
        console.log(arrayFilterByDate)

    countLikes = likes.reduce((a, b)=> a + b,0);
    price.innerHTML+=`
    <p>${countLikes} <i class="fas fa-heart"></i></p>
    `
    const medias = document.getElementById("medias")
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
    const popular = document.getElementById("popular")
    const date = document.getElementById("date")
    const titre = document.getElementById("titre")
    popular.addEventListener("click" , getMediasFilterByLikes(nbId))
    //date.addEventListener("click" , getMediasFilterByDate(nbId))
    //titre.addEventListener("click" , getMediasFilterByTitle(nbId))

//---------------------------------------LightBox-------------------------------------------
    class Lightbox {
        static init () {
            const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".png"], a[href$=".jpeg"], a[href$=".mp4"]'))
            const gallery = links.map(link => link.getAttribute('href'))
            links.forEach(link => link.addEventListener('click' , e => {
                e.preventDefault()
                new Lightbox(e.currentTarget.getAttribute('href'), gallery)
            }))
        }
        constructor(url, images) {
            this.element = this.buildDOM(url)
            this.images = images
            this.loadImage(url)
            this.onKeyUp = this.onKeyUp.bind(this)
            document.body.appendChild(this.element)
            document.addEventListener('keyup', this.onKeyUp)
        }
        loadImage (url) {
            this.url = null
            const image = new Image();
            const container = this.element.querySelector('.lightbox__container')
            const loader = document.createElement('div')
            loader.classList.add('lightbox__loader')
            container.innerHTML = ""
            container.appendChild(loader)
            image.onload = () => {
                console.log("chargé")
                container.removeChild(loader)
                container.appendChild(image)
                this.url = url
            }
            image.src = url
        }
    
        onKeyUp (e) {
            if (e.key == 'Escape') {
                this.close(e)
            } else if (e.key == 'ArrowLeft') {
                this.prev(e)
            } else if (e.key == 'ArrowRight') {
                this.next(e)
            }
        }

        close (e) {
            e.preventDefault()
            this.element.classList.add('fadeOut')
            window.setTimeout(() => {
                this.element.parentElement.removeChild(this.element)
            }, 500)
            document.removeEventListener('keyup', this.onKeyUp)

        }

        next (e) {
            e.preventDefault()
            let i = this.images.findIndex(image =>image == this.url)
            if (i == this.images.length - 1) {
                i = -1
            }
            this.loadImage(this.images[i + 1])
        }
        prev (e) {
            e.preventDefault()
            let i = this.images.findIndex(image =>image == this.url)
            if (i == 0) {
                i = this.images.length
            }
            this.loadImage(this.images[i - 1])
        }

        buildDOM (url) {
            const dom = document.createElement('div')
            dom.classList.add('lightbox')
            dom.innerHTML = `
            <button class="lightbox__close"></button>
            <button class="lightbox__next"></button>
            <button class="lightbox__prev"></button>
            <div class="lightbox__container">
            </div>`
            dom.querySelector(".lightbox__close").addEventListener('click', this.close.bind(this))
            dom.querySelector(".lightbox__next").addEventListener('click', this.next.bind(this))
            dom.querySelector(".lightbox__prev").addEventListener('click', this.prev.bind(this))

            return dom
        }
    }
    //_______________________________LightBox Fin____________________________
    Lightbox.init()
    
};




getPhotographer(nbId);
getMedias(nbId);




//-------------------------------------Formular-----------------------------------------
    const modal = document.getElementById("myModal");
    const modalClose = document.querySelector(".close");
    const formValid = document.getElementById('btnValidate');
    const modalFirstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const mail = document.getElementById('mail');
    const message = document.getElementById('message');
    const nameValid = /^[a-z ,.'-]{2,30}$/i;
    const emailValid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const messageValid = /^[a-z ,éèà?;:/!-+=°ïöäëêôî&"ç.'-]{2,200}$/i;
    const elInput = [
        {
          scope: modalFirstName,
          regex: nameValid,
          errorMessage: "Veuillez rentrer votre prénom, entre 2 et 30 caractères."
        },
        {
          scope: lastName,
          regex: nameValid,
          errorMessage: "Veuillez rentrer votre nom de famille, entre 2 et 30 caractères."
        },
        {
          scope: mail,
          regex: emailValid,
          errorMessage: "Veuillez entrer une adresse email valide."
        },
        {
          scope: message,
          regex: messageValid,
          errorMessage: "Veuillez saisir un message de 200 caractères maximum."
        }
      ]


    
        const inputValid = () => {
            let countValidationInput = 0;
            for (let element of elInput) {
                console.log(element.scope.nextElementSibling)
                /* Si il n'y a pas de valeurs rentrées, apparition d'un message d'erreur */
                if (element.scope.validity.valueMissing) {
                  element.scope.style.borderColor = "red";
                  /* Sinon si une mauvaise valeur est saisie, apparition d'un message d'erreur personnalisé */
                } else if (!element.regex.test(element.scope.value)) {
                  element.scope.style.borderColor = "red";
                  element.scope.nextElementSibling.innerHTML= element.errorMessage
                  console.log(element.scope.nextElementSibling)
                  /* Sinon effacement du message d'erreur si le champ est saisi correctement*/
                } else {
                    element.scope.nextElementSibling.innerHTML= ""
                  element.scope.style.borderColor = "black";
                  countValidationInput ++;
                }
            }
            return (countValidationInput === elInput.length) 
        }
        // close modal function
      const closeModal = () => { modal.style.display = "none" };
      // launch modal function
      const launchModal = () => { modal.style.display = "flex" } 

        const validation = (event) => {
            event.preventDefault();
            // Validation champ Nom / Prénom / Email / Date de naissance / Nombre de tournois
            const inputValidity = inputValid();
            if ( inputValidity ) {
                setTimeout(() => {
                  closeModal()
                }, 2000);
            } else {
                return false
            }
        }


formValid.addEventListener('click', validation );
modalClose.addEventListener("click", closeModal );