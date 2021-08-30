import { priceInfo, title, modalText } from '../constantes.js';

// Fonction pour passer à la partie contenu de la homePage
export const goToContent = () => {
  const body = document.querySelector('body');
  body.insertAdjacentHTML('afterbegin',
    `<div id='goContent'>
    <a class='linkGoContent' href = '#container' title='cliquez afin de passer au contenu'
      <h4>Passer au contenu</h4>
    </a>
  </div>
  `);
  const showLinkGoContent = () => {
    const divGoContent = document.getElementById('goContent');
    body.onscroll = () => {
      divGoContent.style.display = 'block';
      divGoContent.focus();
    };
  };
  showLinkGoContent();
};

// Affichage des tags correspondant au photographe
export const tagsDisplay = (tags, id) => {
  const tagList = document.getElementById(`tagList${id}`);
  tags.forEach((tagsElement) => {
    tagList.innerHTML += `<li id="tags"><a class="tagsLinkElement" href="./index.html?tag-${tagsElement}">#${tagsElement}</a></li>`;
  });
};

// Affichage du prix journalier
export const priceDisplay = (photographerPrice) => {
  priceInfo.innerHTML += `<p>${photographerPrice}€ / jour</p>`;
};

// Affichage du formulaire
export const formDisplay = (name) => {
  modalText.innerHTML += `${name}`;
};

// Affichage du nom du photographe dans le titre de la fenêtre
export const titleDisplay = (name) => {
  title.innerHTML += ` ${name}`;
};
