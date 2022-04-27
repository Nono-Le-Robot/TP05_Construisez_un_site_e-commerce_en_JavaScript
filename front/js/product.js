const titleSelector = document.querySelector('title')
const itemImgSelector = document.querySelector(".item__img")
const itemTitleSelector = document.querySelector("#title")
const itemPriceSelector = document.querySelector("#price")
const itemDescriptionSelector = document.querySelector("#description")
const itemColorsSelector = document.querySelector("#colors")
const addToCartSelector = document.querySelector("#addToCart")
const urlId = window.location.search
const idProductPage = urlId.slice(4)
const url = `http://localhost:3000/api/products/${idProductPage}`
fetch(url)
.then(response => response.json())
.then(data => {
    itemImgSelector.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
    itemTitleSelector.innerHTML = `${data.name}`
    itemPriceSelector.innerHTML = `${data.price}`
    itemDescriptionSelector.innerHTML = `${data.description}`
    titleSelector.textContent = `${data.name}`
    for(var i = 0; i<data.colors.length; i++){
        itemColorsSelector.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`
    }


    addToCartSelector.addEventListener("click", () => {

            alert("article(s) ajouté(s) au panier")

    })    
})
