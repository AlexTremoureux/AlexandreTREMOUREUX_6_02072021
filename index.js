const container = document.getElementById("container");
/*const name = document.getElementById("name");
const id = document.getElementById("id");
const city = document.getElementById("city");
const country = document.getElementById("country");
const tags = document.getElementById("tags");
const tagline = document.getElementById("tagline");
const price = document.getElementById("price");
const portrait = document.getElementById("portrait");*/

let requestURL = 'https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json';
const getPhotograph = async function () {
  let response = await fetch(requestURL)
  let data = await response.json()
  console.log(data.photographers)
  data.photographers.forEach(element => {
    
   container.innerHTML += 
   `<article>
      <section class="headerSection">
        <a href="">
          <img id="portrait" src="./Photos/Medias/Sample Photos/Photographers ID Photos/${element.portrait}" alt="">
          <h2 id="name">${element.name}</h2>
        </a>
      </section>
      <section class="mainSection">
        <p id="localisation">${element.city}, ${element.country}</p>
        <p id="tagline">${element.tagline}</p>
        <p id="price">${element.price}€/jour</p>
      </section>
      <section class="tagSection">
        <ul>
          <li id="tags"><a>#${element.tags}</a></li>
        </ul>
      </section>
    </article>`;
  
});
}
console.time('Execution Time');
getPhotograph()
console.timeEnd('Execution Time');


