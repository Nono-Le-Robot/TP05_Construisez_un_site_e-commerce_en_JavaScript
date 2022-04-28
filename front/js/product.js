const itemImgSelector = document.querySelector(".item__img")
const idUrl = window.location.search.slice(4)
const url = `http://localhost:3000/api/products/${idUrl}`
fetch(url)
.then(response => response.json())
.then(data => {
    itemImgSelector.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
    title.innerHTML = `${data.name}`
    price.innerHTML = `${data.price}`
    description.innerHTML = `${data.description}`
    document.title.textContent = `${data.name}`
    for(var i = 0; i<data.colors.length; i++){
        colors.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`
    }
    console.log(typeof colors.value);
    addToCart.addEventListener("click", () => {
        if((colors.value === '')&&(quantity.value <= quantity.min || quantity.value > quantity.max)){
            alert("veuillez renseigner une couleur et une quantitée")
        }
        else{
            if(colors.value === ''){
                alert("veuillez renseigner une couleur")
            }
            else if(quantity.value > quantity.max || quantity.value <= quantity.min ){
                alert("veuillez renseigner une quantitée entre 1 et 100")
            }
            else{
                alert("Article(s) ajouté(s) au panier")
            }
        }
    })   
})