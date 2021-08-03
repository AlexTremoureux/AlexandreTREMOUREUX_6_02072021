
export let pId = window.location.search.split("-");
export let nbId= Number (pId[1]);


export let likes = [];
export let countLikes = 0;
export let btnLike=0;
export let arrayMedia = [];
export let arrayFilterByLikes = [];
export let arrayFilterByTitle = [];
export let arrayElementTitle = [];
export let arrayFilterByDate = [];
export let modalText = document.getElementById('modalText')