const itemsSelector = document.querySelector('#items')
const url = `http://localhost:3000/api/products`
fetch(url)
.then(response => response.json())
.then(data => {
    for(var i = 0; i < data.length; i++){
        itemsSelector.innerHTML +=
        `
        <a href="./product.html?id=${data[i]._id}">
        <article>
        <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
        <h3 class="productName">${data[i].name}</h3>
        <p class="productDescription">${data[i].description}</p>
        </article>
        </a>
        `
    }
})
