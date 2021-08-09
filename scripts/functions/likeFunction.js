import { likes } from "../variables.js"

let countTotalLikes = Number

export const functionCountTotalLikes = () => {
    const count = document.querySelectorAll(".likesCount");
    count.forEach(element => {
    likes.push(Number (element.innerHTML));
    });
    countTotalLikes = likes.reduce((a, b)=> a + b,0);
    likeInfo.innerHTML+=`<p>${countTotalLikes} <i class="fas fa-heart"></i></p>`;
}
export const like = () => {
    const cibleIcone = document.querySelectorAll(".iconLike");
    cibleIcone.forEach(element => {
        const increment = () => {
            const cibleCount = element.previousElementSibling;
            let count = Number (cibleCount.innerHTML);
            count ++;
            cibleCount.innerHTML=`${count}`;
            countTotalLikes ++;
            likeInfo.innerHTML="";
            likeInfo.innerHTML+=`<p>${countTotalLikes} <i class="fas fa-heart"></i></p>`;
            element.removeEventListener('click',increment)
        }
        element.addEventListener('click', increment)
    });
}