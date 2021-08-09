import { arrayMedia } from "../variables.js";
import { firstName } from "./searchFunctions.js";
import { Lightbox } from "../class.js";
import { functionCountTotalLikes, like } from "./likeFunction.js";

let arrayFilterByLikes = [];
let arrayFilterByTitle = [];
let arrayFilterByDate = [];

export const fillArrayFilter = () => {
    arrayMedia.forEach(element => {
        arrayFilterByTitle.push(element.title);
        arrayFilterByDate.push(element.date);
    });
    arrayFilterByLikes = arrayMedia.sort((a, b) => b.likes - a.likes );
    arrayFilterByDate = arrayFilterByDate.sort().reverse();
    arrayFilterByDate = [...new Set(arrayFilterByDate)]
    arrayFilterByTitle = arrayFilterByTitle.sort();
}

export const mediasFilterByTitle = () => {
    containerMedias.innerHTML="";
    arrayFilterByTitle.forEach(titre => {
        arrayMedia.forEach(element => {
            if (element.title == titre && element.image) {
                containerMedias.innerHTML += `
                <li class="medias">
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
                </li>`;
            }
            if (element.title == titre && element.video) {
                containerMedias.innerHTML += `
                <li class="medias" id="medias">
                    <a href="./Photos/Medias/Sample Photos/${firstName}/${element.video}">
                    <video controls>
                        <source src="./Photos/Medias/Sample Photos/${firstName}/${element.video}" alt="" type="video/mp4">
                    </video>
                    </a>
                    <div class="infoMedias">
                        <p>${element.title}</p> 
                        <div class="likeSection">
                            <p class="likesCount likesCount${element.id}">${element.likes}</p>
                            <button class="iconLike iconLike${element.id}">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </li>`
            }
        });
    });
    Lightbox.init()
    like()
}

export const mediasFilterByDate = () => {
    containerMedias.innerHTML="";
    arrayFilterByDate.forEach(date => {
        arrayMedia.forEach(element => {
            if (element.date == date && element.image) {
                containerMedias.innerHTML += `
                <li class="medias">
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
                </li>`;
            }
            if (element.date == date && element.video) {
                containerMedias.innerHTML += `
                <li class="medias" id="medias">
                    <a href="./Photos/Medias/Sample Photos/${firstName}/${element.video}">
                    <video controls>
                        <source src="./Photos/Medias/Sample Photos/${firstName}/${element.video}" alt="" type="video/mp4">
                    </video>
                    </a>
                    <div class="infoMedias">
                        <p>${element.title}</p> 
                        <div class="likeSection">
                            <p class="likesCount likesCount${element.id}">${element.likes}</p>
                            <button class="iconLike iconLike${element.id}">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </li>`
            }
        });
    });
    Lightbox.init()
    like()
}

export const mediasFilterByLikes = () => {
    containerMedias.innerHTML="";
    arrayFilterByLikes.forEach(element => {
        if (element.image) {
            containerMedias.innerHTML += `
            <li class="medias">
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
            </li>`;
        }
        if (element.video) {
            containerMedias.innerHTML += `
            <li class="medias" id="medias">
                <a href="./Photos/Medias/Sample Photos/${firstName}/${element.video}">
                <video controls>
                    <source src="./Photos/Medias/Sample Photos/${firstName}/${element.video}" alt="" type="video/mp4">
                </video>
                </a>
                <div class="infoMedias">
                    <p>${element.title}</p> 
                    <div class="likeSection">
                        <p class="likesCount likesCount${element.id}">${element.likes}</p>
                        <button class="iconLike iconLike${element.id}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </li>`
        }
    });
    Lightbox.init()
    like()
}