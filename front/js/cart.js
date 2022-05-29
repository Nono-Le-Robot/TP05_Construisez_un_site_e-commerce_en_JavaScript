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
let totalOrder = 0;
let totalArticle = 0;
let order = getBasket()
console.table(order);
    fetch(`http://localhost:3000/api/products`)
    .then(response => response.json())
    .then(data  => { 
        for(let h = 0; h < order.length; h++ ){
            let foundArticle = data.find(p => p._id == order[h].id);
            if(foundArticle != undefined) {
                cartItemSelector.innerHTML +=
                `
                <article class="cart__item" data-id="${foundArticle._id}" data-color="${order[h].color}">
                <div class="cart__item__img">
                <img src="${foundArticle.imageUrl}" alt="${foundArticle.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${foundArticle.name}</h2>
                <p>${order[h].color}</p>
                <p>${foundArticle.price * order[h].quantity}</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${order[h].quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
                </div>
                </div>
                </article>
                `
                totalOrder += foundArticle.price * order[h].quantity
                totalArticle += parseInt(order[h].quantity)
                totalPrice.innerHTML =
                `
                ${totalOrder}
                `
                totalQuantity.innerHTML =  
                `
                ${totalArticle}
                `
            }
            const itemQuantitySelector = document.querySelectorAll('.itemQuantity')
            const deleteItemSelector = document.querySelectorAll(".deleteItem")
            for(let k = 0; k < deleteItemSelector.length; k++){
                itemQuantitySelector[k].addEventListener ('change', (event) =>{
                    order[k].quantity = itemQuantitySelector[k].value
                    saveBasket(order)
                    location.reload()
                })
                deleteItemSelector[k].addEventListener ('click', (event) => {
                    event.preventDefault 
                    order.splice(k,1)     
                    saveBasket(order)
                    location.reload()
                })
            }
            }
    })

const btnOrder = document.querySelector('#order')
btnOrder.addEventListener('click', () =>
{
    const userData = {
        prenom : firstName.value, 
        nom : lastName.value,
        adresse : address.value, 
        ville : city.value,
        email : email.value
    }
    console.log(userData);
})