import { mainWrapper } from './constantes.js';

// eslint-disable-next-line import/prefer-default-export
export class Lightbox {
  // Méthode init afin d'initialiser la lightbox.
  static init() {
    // Création d'une instance d'array à partir du query selector venant récupérer les liens
    const links = Array.from(
      document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'),
    );
    // Création d'un tableau de valeurs href des médias
    const gallery = links.map((link) => link.getAttribute('href'));
    const txtAlt = links.map((link) => link.getAttribute('alt'));
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
        urlVtt,
      );
    }));
  }

  // Paramètres: url de l'image, chemin des images de la lightbox
  constructor(url, alt, txtAlt, medias, urlVtt) {
    // construction du DOM à partir de l'url
    this.element = this.buildDOM();
    this.txtAlt = txtAlt;
    this.medias = medias;
    this.urlVtt = urlVtt;
    this.loadMedias(url, alt, urlVtt);
    this.onKeyUp = this.onKeyUp.bind(this);
    // Ajout de l'element lightbox
    document.body.appendChild(this.element);
    document.addEventListener('keyup', this.onKeyUp);
  }

  loadMedias(url, alt, urlVtt) {
    if (url.includes('.jpg')) {
      const image = new Image();
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = '';
      this.alt = alt;
      this.url = url;
      container.appendChild(image);
      image.src = url;
      image.alt = alt;
    }
    if (url.includes('.mp4')) {
      const video = document.createElement('video');
      const source = document.createElement('source');
      const track = document.createElement('track');
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = '';
      this.alt = alt;
      this.url = url;
      container.appendChild(video);
      video.controls = true;
      video.appendChild(source);
      source.src = url;
      source.alt = alt;
      video.appendChild(track);
      track.src = urlVtt;
    }
  }

  // Gestion des touches
  onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'ArrowLeft') {
      this.prev(e);
    } else if (e.key === 'ArrowRight') {
      this.next(e);
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
    let i = this.medias.findIndex((media) => media === this.url);
    let txt = this.txtAlt.findIndex((elAlt) => elAlt === this.alt);
    // Si on arrive à la fin de la galerie, on redéfinit l'index à -1 pour qu'il reparte à zéro
    if (i === this.medias.length - 1 && txt === this.medias.length - 1) {
      i = -1;
      txt = -1;
    }
    // On passe au média suivant
    this.loadMedias(this.medias[i + 1], this.txtAlt[txt + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.medias.findIndex((media) => media === this.url);
    let txt = this.txtAlt.findIndex((elAlt) => elAlt === this.alt);
    if (i === 0 && txt === 0) {
      i = this.medias.length;
      txt = this.medias.length;
    }
    this.loadMedias(this.medias[i - 1], this.txtAlt[i - 1]);
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
