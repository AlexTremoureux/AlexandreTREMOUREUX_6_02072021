const textAltern = {
    alt : "illustration de ${element.title}",
}
const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
}
fetch(ENV, options)
    .then(res => res.json())
    .then(res => console.log(res));