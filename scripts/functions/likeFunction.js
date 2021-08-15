import { likes, likeInfo } from '../constantes.js';

let countTotalLikes = Number;

// Fonction servant à comptabiliser le nombre total de likes
export const functionCountTotalLikes = () => {
  const count = document.querySelectorAll('.likesCount');
  count.forEach((element) => {
    likes.push(Number(element.innerHTML));
  });
  countTotalLikes = likes.reduce((a, b) => a + b, 0);
  likeInfo.innerHTML += `<p>${countTotalLikes} <i class="fas fa-heart"></i></p>`;
};

// Fonction servant à incrémenter le nombre de likes au clic
export const like = () => {
  const cibleIcone = document.querySelectorAll('.iconLike');
  cibleIcone.forEach((element) => {
    const increment = () => {
      const cibleCount = element.previousElementSibling;
      let count = Number(cibleCount.innerHTML);
      count += 1;
      cibleCount.innerHTML = `${count}`;
      countTotalLikes += 1;
      likeInfo.innerHTML = '';
      likeInfo.innerHTML += `<p>${countTotalLikes} <i class="fas fa-heart"></i></p>`;
      element.removeEventListener('click', increment);
    };
    element.addEventListener('click', increment);
  });
};
