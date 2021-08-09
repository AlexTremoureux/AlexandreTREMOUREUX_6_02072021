import { arrayMedia } from "../variables.js";

export let firstName = "";

export const functionSearchMediaById = (source,id) => {
    source.forEach(element => {
        if (element.photographerId == id){
            arrayMedia.push(element)
            return arrayMedia;
        }
    })
}
export const functionSearchFirstName = (source, filterId) => {
    source.forEach(photographers => {
        if (photographers.id === filterId){
        firstName = photographers.name.split(" ");
        firstName = firstName [0];
        firstName = firstName.replace("-" , " ");
        return firstName;
        }
    })
}