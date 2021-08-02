export const fetcher = async function () {
    let response = await fetch(dev)
    let data = await response.json()
    return data
    .catch(function (error) {
      alert(error="erreur")
    })
}