// Constantes

// Environnement de travail
const prodUrl = 'https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json';
const devUrl = './scripts/fisheye.json';
// eslint-disable-next-line no-unused-vars
const PROD = 'production';
const DEV = 'development';
const ENV = DEV;
export const url = ENV === DEV ? devUrl : prodUrl;

// DOM
export const container = document.getElementById('container');
export const mainWrapper = document.getElementById('mainWrapper');
export const title = document.getElementById('title');

export const popular = document.querySelectorAll('popular');
export const date = document.querySelectorAll('date');
export const titre = document.querySelectorAll('titre');

export const priceInfo = document.getElementById('priceInfo');
export const likeInfo = document.getElementById('likeInfo');

export const pId = window.location.search.split('-');
export const nbId = Number(pId[1]);
export const likes = [];
export const btnLike = 0;
export const arrayMedia = [];

export const modalText = document.getElementById('modalText');

// Formulaire
export const contact = document.getElementById('btnContact');
export const modal = document.getElementById('myModal');
export const modalClose = document.querySelector('.close');
export const formValid = document.getElementById('btnValidate');
export const modalFirstName = document.getElementById('firstName');
export const lastName = document.getElementById('lastName');
export const mail = document.getElementById('mail');
export const message = document.getElementById('message');
export const arrayInputForm = [modalFirstName, lastName, mail, message, formValid, modalClose];
export const nameValid = /^[a-z ,.'-]{2,30}$/i;
// eslint-disable-next-line no-control-regex
export const emailValid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const messageValid = /^[a-z ,éèà?;:/!-+=°ïöäëêôî&"ç.'-]{2,200}$/i;
export const elInput = [
  {
    scope: modalFirstName,
    regex: nameValid,
    errorMessage: 'Veuillez rentrer votre prénom, entre 2 et 30 caractères.',
  },
  {
    scope: lastName,
    regex: nameValid,
    errorMessage:
      'Veuillez rentrer votre nom de famille, entre 2 et 30 caractères.',
  },
  {
    scope: mail,
    regex: emailValid,
    errorMessage: 'Veuillez entrer une adresse email valide.',
  },
  {
    scope: message,
    regex: messageValid,
    errorMessage: 'Veuillez saisir un message de 200 caractères maximum.',
  },
];

// Lightbox
export const lightboxContainer = document.getElementsByClassName(
  '.lightbox__container',
);
