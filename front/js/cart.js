const btnOrder = document.querySelector('#order')
const cartItemSelector = document.querySelector("#cart__items")
const cartPriceSelector = document.querySelector("#cart__price")
const cartOrderSelector = document.querySelector('.cart__order')
const cartHidden = document.querySelector("#cartAndFormContainer > section > div.cart__price")
const emptycart = document.querySelector("#cartAndFormContainer > h1")
function saveBasket(basket){ localStorage.setItem("basket", JSON.stringify(basket))}
function getBasket(){let basket = localStorage.getItem("basket")
    if(basket == null){ return [];}
    else{return JSON.parse(basket)}}
function addBasket(product){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if(foundProduct != undefined){foundProduct.quantity++; }
    else{product.quantity = 1;basket.push(product)}
    saveBasket(basket)}
function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id)
    if(foundProduct != undefined){foundProduct.quantity += quantity.value;}
    saveBasket(basket)}
let totalOrder = 0;
let totalArticle = 0;
let order = getBasket()
console.table(order);
if(order.length < 1){
    cartOrderSelector.innerHTML = ''
    cartHidden.innerHTML = ''
    emptycart.textContent = 
    `Panier vide`}
else{
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
                totalPrice.innerHTML = `${totalOrder}`
                totalQuantity.innerHTML =  `${totalArticle}`
            }
            const itemQuantitySelector = document.querySelectorAll('.itemQuantity')
            const deleteItemSelector = document.querySelectorAll(".deleteItem")
            for(let k = 0; k < deleteItemSelector.length; k++){
                itemQuantitySelector[k].addEventListener ('change', (event) =>{
                    order[k].quantity = itemQuantitySelector[k].value
                    saveBasket(order)
                    location.reload()})
                deleteItemSelector[k].addEventListener ('click', (event) => {
                    event.preventDefault 
                    order.splice(k,1)     
                    saveBasket(order)
                    location.reload()})
            }
            }
    })
btnOrder.addEventListener('click', (e) => {
        e.preventDefault() 
        let contactRegExp = new RegExp ('^[a-zA-Z]{2,30}$')
        let addressRegExp = new RegExp ('^[a-zA-Z0-9-éè ]{3,80}$')
        let cityRegExp = new RegExp ('^[a-zA-Z]{2,30}$')
        let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$')
        let testcontactRexExp = contactRegExp.test(firstName.value)
        let testcontactRexExp2 = contactRegExp.test(lastName.value)
        let testcontactRexExp3 = addressRegExp.test(address.value)
        let testcontactRexExp4 = cityRegExp.test(city.value)
        let testcontactRexExp5 = emailRegExp.test(email.value)
        let colorTrue = "rgba(121, 242, 129, 0.60)"
        let colorFalse = "rgba(242, 121, 121, 0.60)"
        let checked = [false,false,false,false,false,false]
        if (testcontactRexExp === false) {firstName.style.backgroundColor = colorFalse;firstNameErrorMsg.textContent = "Votre  prénom n'est pas valide";checked[0] = false}
        else{firstName.style.backgroundColor = colorTrue;firstNameErrorMsg.textContent = "";checked[0] = true}
        if (testcontactRexExp2 === false) {lastName.style.backgroundColor = colorFalse;lastNameErrorMsg.textContent = "Votre nom n'est pas valide";checked[1] = false}
        else{lastName.style.backgroundColor = colorTrue;lastNameErrorMsg.textContent = "";checked[1] = true}
        if (testcontactRexExp3 === false) {address.style.backgroundColor = colorFalse;addressErrorMsg.textContent = "Votre adresse n'est pas valide";checked[2] = false}
        else{address.style.backgroundColor = colorTrue;addressErrorMsg.textContent = "";checked[2] = true}
        if (testcontactRexExp4 === false) {city.style.backgroundColor = colorFalse;cityErrorMsg.textContent = "Votre ville n'est pas valide";checked[3] = false}
        else{city.style.backgroundColor = colorTrue;cityErrorMsg.textContent = "";checked[3] = true}
        if (testcontactRexExp5 === false){email.style.backgroundColor = colorFalse;emailErrorMsg.textContent = "Votre e-mail n'est pas valide";checked[4] = false}
        else{email.style.backgroundColor = colorTrue;emailErrorMsg.textContent = "";checked[4] = true}
        let idSelectedProduct = [];
        for(let n = 0; n<order.length; n++){idSelectedProduct.push(order[n].id)}
        const orderPost = {
            contact:
                {firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value},
            products: idSelectedProduct
        }
        if(checked[0] && checked[1] && checked[2] && checked[3] && checked[4] === true){
            const promise01 = fetch("http://localhost:3000/api/products/order",{
                method: "POST",
                body: JSON.stringify(orderPost), 
                headers: {"Content-Type": "application/json"}
            }).then(response => response.json())
            .then(data => {
                window.location.href= `./confirmation.html?order_Id=${data.orderId}`
                saveBasket ([])
        })
    }
})
}