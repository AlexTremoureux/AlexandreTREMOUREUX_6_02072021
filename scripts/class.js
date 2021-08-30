import { mainWrapper } from './constantes.js';

// eslint-disable-next-line import/prefer-default-export
export class Lightbox {
  // Méthode init afin d'initialiser la lightbox.
  static init() {
    // Création d'une instance d'array à partir du query selector venant récupérer les liens
    const links = Array.from(
      document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'),
    );
    // Création de tableaux de valeurs href/alt/title des médias
    const gallery = links.map((link) => link.getAttribute('href'));
    const txtAlt = links.map((link) => link.getAttribute('alt'));
    const arrayTitle = links.map((link) => link.getAttribute('title'));
    // Tableau regroupant les chemins de vichiers .vtt
    const trackVtt = Array.from(document.querySelectorAll('track[src$=".vtt"]'));
    const urlVtt = trackVtt.map((vtt) => vtt.getAttribute('src'));
    // Listener sur chaque liens
    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-unused-vars
      const lightbox = new Lightbox(
        e.currentTarget.getAttribute('href'),
        e.currentTarget.getAttribute('alt'),
        txtAlt,
        gallery,
        e.currentTarget.getAttribute('title'),
        arrayTitle,
        urlVtt,
      );
    }));
  }

  // Paramètres: url de l'image, chemin des images de la lightbox
  constructor(url, alt, txtAlt, medias, title, arrayTitle, urlVtt) {
    // construction du DOM à partir de l'url
    this.element = this.buildDOM();
    this.txtAlt = txtAlt;
    this.medias = medias;
    this.title = title;
    this.arrayTitle = arrayTitle;
    this.urlVtt = urlVtt;
    this.loadMedias(url, alt, title, urlVtt);
    this.onKeyUp = this.onKeyUp.bind(this);
    // Ajout de l'element lightbox
    document.body.appendChild(this.element);
    document.addEventListener('keydown', this.onKeyUp);
  }

  loadMedias(url, alt, title, urlVtt) {
    if (url.includes('.jpg')) {
      const image = new Image();
      const paragraphTitle = document.createElement('p');
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = '';
      this.alt = alt;
      this.url = url;
      this.title = title;
      container.appendChild(image);
      image.src = url;
      image.alt = alt;
      container.appendChild(paragraphTitle);
      paragraphTitle.innerHTML = title;
    }
    if (url.includes('.mp4')) {
      const video = document.createElement('video');
      const source = document.createElement('source');
      const track = document.createElement('track');
      const paragraphTitle = document.createElement('p');
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = '';
      this.alt = alt;
      this.url = url;
      this.title = title;
      container.appendChild(video);
      video.controls = true;
      video.appendChild(source);
      source.src = url;
      source.alt = alt;
      video.appendChild(track);
      track.src = urlVtt;
      container.appendChild(paragraphTitle);
      paragraphTitle.innerHTML = this.title;
    }
  }

  // Gestion des touches clavier et du focus
  onKeyUp(e) {
    const focusableElementsLightbox = Array.from(document.querySelectorAll('.lightbox > button, .lightbox__container > video'));
    const firstFocusElement = focusableElementsLightbox[0];
    const lastFocusElement = focusableElementsLightbox[focusableElementsLightbox.length - 1];
    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'ArrowLeft') {
      this.prev(e);
    } else if (e.key === 'ArrowRight') {
      this.next(e);
    } else if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (e.target === firstFocusElement) {
          e.preventDefault();
          lastFocusElement.focus();
        }
      } else if (e.target === lastFocusElement) {
        e.preventDefault();
        firstFocusElement.focus();
      }
      if (!focusableElementsLightbox.includes(document.activeElement)) {
        e.preventDefault();
        firstFocusElement.focus();
      }
    }
  }

  // fermeture de la lightbox
  close(e) {
    e.preventDefault();
    this.element.classList.add('fadeOut');
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener('keyup', this.onKeyUp);
    mainWrapper.setAttribute('aria-hidden', 'false');
  }

  // Gestion des boutons suivant / précedent
  next(e) {
    e.preventDefault();
    // On trouve l'index du média et du alt qui correspondent à l'url et au alt
    let indexMedia = this.medias.findIndex((media) => media === this.url);
    let indexTxt = this.txtAlt.findIndex((elAlt) => elAlt === this.alt);
    let indexTitle = this.arrayTitle.findIndex((elTitle) => elTitle === this.title);
    // Si on arrive à la fin de la galerie, on redéfinit l'index à -1 pour qu'il reparte à zéro
    if (indexMedia === this.medias.length - 1
      && indexTxt === this.medias.length - 1
      && indexTitle === this.medias.length - 1) {
      indexMedia = -1;
      indexTxt = -1;
      indexTitle = -1;
    }
    // On passe au média suivant
    this.loadMedias(
      this.medias[indexMedia + 1],
      this.txtAlt[indexTxt + 1],
      this.arrayTitle[indexTitle + 1],
    );
  }

  prev(e) {
    e.preventDefault();
    let i = this.medias.findIndex((media) => media === this.url);
    let indexTxt = this.txtAlt.findIndex((elAlt) => elAlt === this.alt);
    let indexTitle = this.arrayTitle.findIndex((elTitle) => elTitle === this.title);
    if (i === 0 && indexTxt === 0 && indexTitle === 0) {
      i = this.medias.length;
      indexTxt = this.medias.length;
      indexTitle = this.medias.length;
    }
    this.loadMedias(this.medias[i - 1], this.txtAlt[i - 1], this.arrayTitle[i - 1]);
  }

  // Construction du DOM
  buildDOM() {
    const dom = document.createElement('div');
    dom.classList.add('lightbox');
    mainWrapper.setAttribute('aria-hidden', 'true');
    dom.setAttribute('aria-hidden', 'false');
    dom.innerHTML = `
        <button aria-label="Fermer" class="lightbox__close"></button>
        <button aria-label="Suivant" class="lightbox__next"></button>
        <button aria-label="Précédent" class="lightbox__prev"></button>
        <div class="lightbox__container">
        </div>`;
    // eslint-disable-next-line max-len
    /* bind pour que le this à l'interieur du close fasse référence à l'instance de lightbox et non l'élément sur lequel on vient de cliquer */
    dom
      .querySelector('.lightbox__close')
      .addEventListener('click', this.close.bind(this));
    dom
      .querySelector('.lightbox__next')
      .addEventListener('click', this.next.bind(this));
    dom
      .querySelector('.lightbox__prev')
      .addEventListener('click', this.prev.bind(this));

    return dom;
  }
}
