const cartItemSelector = document.querySelector("#cart__items")
const cartPriceSelector = document.querySelector("#cart__price")


function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket))
}

function getBasket(){
    let basket = localStorage.getItem("basket")
    if(basket == null){
        return [];
    }
    else{
        return JSON.parse(basket)
    }
}

function addBasket(product){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity++;
    }
    else{
        product.quantity = 1;
        basket.push(product)
    }
    saveBasket(basket)
}

function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id)
    if(foundProduct != undefined){
        foundProduct.quantity += quantity.value;
    }
    saveBasket(basket)
}

var indexArray = 0;
var colorsPush = [];
var quantityPush = [];
var quantityPushTotal = 0;
var pricePush = 0;
var total = 0;
let order = getBasket()

for(var i = 0; i < order.length; i++){
    const url = `http://localhost:3000/api/products/${order[i].id}`
    colorsPush.push(order[i].color)
    
    quantityPush.push(order[i].quantity)
    quantityPushTotal += order[i].quantity
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(order);  
        cartItemSelector.innerHTML +=
            `
            <article class="cart__item" data-id="${data.id}" data-color="${data.colors}">
            <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="${data.altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${order[indexArray].color}</p>
            <p>${data.price * order[indexArray].quantity} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${order[indexArray].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
            </div>
            </div>
            </article>
            `
            total += data.price * order[indexArray].quantity
            indexArray++
            totalPrice.innerHTML =
            `
            ${total}
            `
            totalQuantity.innerHTML =  
            `
            ${quantityPushTotal}
            `
            const itemQuantitySelector = document.querySelector('.itemQuantity')
            const deleteItemSelector = document.querySelectorAll(".deleteItem")
            for(let k = 0; k < deleteItemSelector.length; k++){
                deleteItemSelector[k].addEventListener ('click', (event) => {
                    event.preventDefault 
                    order.splice(k,1)     
                    saveBasket(order)
                    location.reload()
                })
            }
        })
    }









