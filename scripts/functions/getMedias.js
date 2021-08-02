import { firstName , likes , countLikes } from "../variables.js";
import { prod, dev, env, title , price } from "../constantes.js";

export const getMedias = async function (id) {
    let response = await fetch(dev)
    let data = await response.json()
    .catch(function (error) {
      alert(error)
    })
    console.log(data)
    const containerMedias = document.getElementById("containerMedias")
    data.media.forEach(mediaEl => {
        if (mediaEl.photographerId == id && mediaEl.image) {
            likes.push(mediaEl.likes);
            containerMedias.innerHTML += `
            <li class="medias">
                <img src="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.image.replace("-", "")}" alt="">
                <div class="infoMedias">
                    <p>${mediaEl.title}</p> 
                    <p>${mediaEl.likes}<i class="heart" class="fas fa-heart"></i></p>
                </div>
            </li>`
        }
        if (mediaEl.photographerId == id && mediaEl.video) {
            likes.push(mediaEl.likes);
            containerMedias.innerHTML += `
            <li class="medias">
                <video controls>
                    <source src="./Photos/Medias/Sample Photos/${firstName}/${mediaEl.video}" alt="" type="video/mp4">
                </video>

                <div class="infoMedias">
                    <p>${mediaEl.title}</p>                   
                    <p>${mediaEl.likes} <i class="heart" class="fas fa-heart"></i></p>
                </div>
            </li>`
        }
    })
    countLikes = likes.reduce((a, b)=> a + b,0);
    price.innerHTML+=`
    <p>${countLikes} <i class="fas fa-heart"></i></p>
    `
    
};