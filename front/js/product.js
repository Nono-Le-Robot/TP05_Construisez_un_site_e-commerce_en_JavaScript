const itemImgSelector = document.querySelector(".item__img");
const titleSelector = document.querySelector("title");
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}
function addBasket(product) {
  let basket = getBasket();
  let foundProductId = basket.find((p) => p.id == product.id);
  let foundProductColor = basket.find((q) => q.color == colors.value);
  if (foundProductId == undefined) {
    product.quantity = parseInt(quantity.value);
    basket.push(product);
  } else {
    if (foundProductColor == undefined) {
      product.quantity = parseInt(quantity.value);
      basket.push(product);
    } else {
      let newQuantity =
        parseInt(foundProductColor.quantity) + parseInt(quantity.value);
      foundProductColor.quantity = newQuantity;
    }
  }
  saveBasket(basket);
}
const idUrl = window.location.search.slice(4);
fetch(`https://sannier-renaud.fr/portfolio/kanapapi/products/${idUrl}`)
  .then((response) => response.json())
  .then((data) => {
    console.table(data);
    itemImgSelector.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    titleSelector.innerHTML = `${data.name}`;
    price.innerHTML = `${data.price}`;
    description.innerHTML = `${data.description}`;
    document.title.textContent = `${data.name}`;
    for (let i = 0; i < data.colors.length; i++) {
      colors.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
    }
    addToCart.addEventListener("click", () => {
      if (
        colors.value === "" &&
        (quantity.value <= parseInt(quantity.min - 1) ||
          quantity.value > parseInt(quantity.max))
      ) {
        alert(
          "veuillez renseigner une couleur et une quantitée entre 1 et 100"
        );
      } else {
        if (colors.value === "") {
          alert("veuillez renseigner une couleur");
        } else if (
          quantity.value > parseInt(quantity.max) ||
          quantity.value <= parseInt(quantity.min - 1)
        ) {
          alert("veuillez renseigner une quantitée entre 1 et 100");
        } else {
          const order = {
            id: idUrl,
            quantity: quantity.value,
            color: colors.value,
          };
          addBasket(order);
          alert("article(s) ajouté(s) au panier");
        }
      }
    });
  });
