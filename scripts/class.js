// eslint-disable-next-line import/prefer-default-export
export class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'),
    );
    const gallery = links.map((link) => link.getAttribute('href'));
    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-unused-vars
      const lightbox = new Lightbox(
        e.currentTarget.getAttribute('href'),
        gallery,
      );
    }));
  }

  constructor(url, medias) {
    this.element = this.buildDOM(url);
    this.medias = medias;
    this.loadMedias(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener('keyup', this.onKeyUp);
  }

  loadMedias(url) {
    if (url.includes('.jpg')) {
      const image = new Image();
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = '';
      this.url = url;
      container.appendChild(image);
      image.src = url;
    }
    if (url.includes('.mp4')) {
      const video = document.createElement('video');
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = '';
      this.url = url;
      container.appendChild(video);
      video.controls = true;
      video.src = url;
    }
  }

  onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'ArrowLeft') {
      this.prev(e);
    } else if (e.key === 'ArrowRight') {
      this.next(e);
    }
  }

  close(e) {
    e.preventDefault();
    this.element.classList.add('fadeOut');
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  next(e) {
    e.preventDefault();
    let i = this.medias.findIndex((media) => media === this.url);
    if (i === this.medias.length - 1) {
      i = -1;
    }
    this.loadMedias(this.medias[i + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.medias.findIndex((media) => media === this.url);
    if (i === 0) {
      i = this.medias.length;
    }
    this.loadMedias(this.medias[i - 1]);
  }

  buildDOM() {
    const dom = document.createElement('div');
    dom.classList.add('lightbox');
    dom.innerHTML = `
        <button aria-label="Fermer" class="lightbox__close"></button>
        <button aria-label="Suivant" class="lightbox__next"></button>
        <button aria-label="Précédent" class="lightbox__prev"></button>
        <div class="lightbox__container">
        </div>`;
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
