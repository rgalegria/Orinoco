// event listener pour exécuter la fonction une fois le DOM est déjà chargé
document.addEventListener("DOMContentLoaded", () => {
  fillCart();
});

// RÉFÉRENCES DES ÉLÉMENTS DU DOM

const reservedCamerasMsg = document.getElementById("articles-msg");
const emptyCartMsg = document.getElementById("empty-cart");
const ctaBlock = document.getElementById("cta-block");
const cartPilot = document.getElementById("cart-pilot");

/* GET API Url */
const apiGetUrl = "http://localhost:3000/api/cameras/";

/* Variables */
const cartPath = "/cart/";
const actualPath = new URL(window.location);
let subTotalCart = 0;
let shippingCost = 0;
let totalCart = 0;
const tva = 0.22;

/* Classe localStorage par produit */
class Product {
  constructor(id, lens, price) {
    this.id = id;
    this.lens = lens;
    this.price = price;
  }
}

/* FONCTIONS */

/**
 * @description Elle remplira le panier dans le cas où il existe ou il va créer le panier et après le remplir
 */
const fillCart = () => {
  let cartStorage = getCart();
  if (cartStorage !== null) {
    if (Object.keys(cartStorage).length > 0) {
      for (productIndex in cartStorage) {
        // recorra cada item del objeto del carrito
        getProductById(
          cartStorage[productIndex].id,
          productIndex,
          cartStorage[productIndex].lens
        )
          //sacar los parametros con un fetch en la funcion << getProductById >>
          .then((selectedCamera) => {
            // Crea y adjunte en el DOM las tarjetas de cada camara del carrito
            addProductToCart(selectedCamera);
          });
      }
      changeCartVisual();
      //si el carrito no existe
    } else {
      return;
    }
  } else {
    // crea carrito (este es el almacenaje de los productos del carrito)
    let cart = {};
    // actualice el carrito en el localStorage
    updateCart(cart);
  }
};

/**
 * @description Elle ajoute le produit choisi dans le localStorage
 */
const addProduct = () => {
  const dropdown = document.getElementById("lens-option");
  if (dropdown.value != "none") {
    const button = document.getElementById("add-product-btn");
    const windowUrl = new URL(window.location.href);
    let cameraId = windowUrl.searchParams.get("id");

    /* Changement du comportement du bouton "ajouter" */
    button.style.background = "#00b61d";
    button.textContent = "AJOUTÉ !";
    button.disabled = true;
    setTimeout(() => {
      button.style.removeProperty("background");
      button.textContent = "AJOUTER AU PANIER";
      button.disabled = false;
    }, 1500);

    /* Créer une instance de l'objet de l'appareil de photos selectioné */
    const selectedCamera = new Product(
      cameraId,
      dropdown.value,
      productObject.price
    );

    let cartStorage = getCart();
    if (cartStorage !== null) {
      // créer une variable ave la date
      let d = new Date();
      // génerer l'index de chaque objet du produit localStorage
      let productIndex = `prod${d.getTime()}`;
      //ajoute l'objet du produit avec l'index créé
      cartStorage[productIndex] = selectedCamera;
      updateCart(cartStorage);
      // obtenir les parametres avec la fonction << getProductById >>
      getProductById(cameraId, productIndex, dropdown.value).then(
        (selectedCamera) => {
          addProductToCart(selectedCamera);
        }
      );
    }
  } else {
    alert("Veillez rentrer un option d'objectif");
  }
};

/**
 *
 * @param {Object} selectedCamera
 * @description Elle injecte le HTML du Layout card sur le DOM
 */
const addProductToCart = (selectedCamera) => {
  let lensOptions = "";
  let lensBlock = "";
  selectedCamera.lenses.forEach((value) => {
    let selected;
    if (value == selectedCamera.selectedLens) {
      selected = `selected="selected"`;
    } else {
      selected = "";
    }
    lensOptions += `<option class="lens__dropd__item" value="${value}" ${selected}>${value}</option>`;
  });
  if (actualPath.pathname !== cartPath) {
    lensBlock = `<div class="cart__menu__product__dropd">
                        <p class="cart__menu__product__dropd__lens">${selectedCamera.selectedLens}</p>
                    </div>
                </div>
            </div>
        </div>`;
  } else {
    lensBlock = `<div class="lens__dropd cart__menu__product__dropd">
                            <select
                            id="lens-cart-option"
                            class="lens__dropd__btn cart__menu__product__dropd__btn">
                                <option class="lens__dropd__item" value="none">Veuillez choisir</option>
                                ${lensOptions}
                            </select>
                        </div>
                    </div>
                </div>
            </div>`;
  }
  let html = `<div id="prod${
    selectedCamera.productIndex
  }" style="border-bottom: 2px solid #000000;">
                    <button
                        id="delete-btn" onclick="removeProduct('${
                          selectedCamera.productIndex
                        }')"
                        class="cart__menu__product__del-btn delete-btn">
                            <img src="/img/btn-close-icon.svg" alt="close icon" />
                    </button>
                    <div class="cart__menu__product__wrapper-main">
                        <div class="cart__menu__product__img" 
                            style="background-image: url(${
                              selectedCamera.imageUrl
                            }); 
                            background-position: center; 
                            background-size: cover; 
                            background-repeat: no-repeat; 
                            background-color: white;">
                        </div>
                        <div class="cart__menu__product__wrapper-info">
                            <h2 class="cart__menu__product__title">${
                              selectedCamera.name
                            }</h2>
                            <h3 class="cart__menu__product__price">${priceFormat(
                              selectedCamera.price
                            )} &euro;</h3>
                            ${lensBlock}`;

  let product = document.getElementById("cart-container");
  product.innerHTML = product.innerHTML + html;
  calculateTotalPrice(selectedCamera.price, "add");
  return true;
};

/**
 *
 * @param {string} id
 * @param {Number} productIndex
 * @param {string} selectedLens
 * @description Elle fait une requête par l’ID de l’appareil de photos et ramène l’objet sauvegardé dans le localStorage
 */
const getProductById = async (id, productIndex, selectedLens) => {
  let response = await fetch(apiGetUrl + id).catch((err) => {
    console.log("error", err);
  });
  let data = await response.json();
  data.productIndex = productIndex;
  data.selectedLens = selectedLens;
  return data;
};

/**
 * @description Elle appelle le panier du localStorage
 * @returns l'objet du panier ou null
 */
const getCart = () => {
  let cartStorage = localStorage.getItem("cart");
  if (cartStorage !== null) {
    return JSON.parse(cartStorage);
  } else {
    return null;
  }
};

/**
 *
 * @param {object} cartStorage
 * @description Elle mets à jour le panier dans le localStorage
 */
const updateCart = (cartStorage) => {
  cartStorage = JSON.stringify(cartStorage);
  localStorage.setItem("cart", cartStorage);
  changeCartVisual();
};

/**
 * @description Elle change le visuel du panier de vide à rempli
 */
const changeCartVisual = () => {
  if (reservedCamerasMsg && emptyCartMsg && ctaBlock !== null) {
    let cartStorage = getCart();
    if (Object.keys(cartStorage).length > 0) {
      reservedCamerasMsg.style.display = "flex";
      emptyCartMsg.style.display = "none";
      ctaBlock.style.display = "block";
      cartPilot.style.display = "block";
    } else {
      reservedCamerasMsg.style.display = "none";
      emptyCartMsg.style.display = "block";
      ctaBlock.style.display = "none";
      cartPilot.style.display = "none";
    }
  } else {
    return;
  }
};

/**
 *
 * @param {Object} cameraPrice
 * @param {String} operation
 * @description Elle calcule le prix total du panier et l'imprime sur le DOM
 */
const calculateTotalPrice = (cameraPrice, operation) => {
  const subTotalPriceContainer = document.getElementById("subtotal-price");
  const shippingPriceContainer = document.getElementById("shipping-price");
  const taxPriceContainer = document.getElementById("tax-price");
  const totalPriceContainer = document.getElementById("grand-total");
  if (operation === "add") {
    subTotalCart += cameraPrice;
  } else {
    subTotalCart -= cameraPrice;
  }
  if (subTotalCart >= 1) {
    shippingCost = 1500;
  } else {
    shippingCost = 0;
  }
  let totalTax = calculateTax(subTotalCart);
  totalCart = subTotalCart + shippingCost;
  subTotalPriceContainer.textContent = `${priceFormat(subTotalCart)} €`;
  if (
    shippingPriceContainer &&
    taxPriceContainer &&
    totalPriceContainer !== null
  ) {
    shippingPriceContainer.textContent = `${priceFormat(shippingCost)} €`;
    taxPriceContainer.textContent = `${priceFormat(totalTax)} €`;
    totalPriceContainer.textContent = `${priceFormat(totalCart)} €`;
  } else {
    return;
  }
};

/**
 *
 * @param {Int} productIndex
 * @description elle efface l'objet du HTML du DOM et mets à jour le localStorage
 */
const removeProduct = (productIndex) => {
  let currentCart = getCart();
  if (currentCart !== null) {
    const product = document.getElementById(`prod${productIndex}`);
    product.remove();
    calculateTotalPrice(currentCart[productIndex].price, "substract");
    delete currentCart[productIndex];
    updateCart(currentCart);
    changeCartVisual();
  }
};

/**
 *
 * @param {Number} price
 * @description Elle donne le format aux prix avec les deux décimales
 * @returns le prix formaté
 */
const priceFormat = (price) => {
  return parseFloat(price / 100).toFixed(2);
};

/**
 *
 * @param {Number} price
 * @description elle obtiens le total de la TVA du sous-total du panier
 * @returns TVA total
 */
const calculateTax = (price) => {
  return price * tva;
};

/* EVENT LISTENERS */

/**
 * @description Elle crée l'event listener pour le menu déroulant des objectifs
 */
const setlensDropdownDomElement = () => {
  setTimeout(() => {
    if (actualPath.pathname === cartPath) {
      /* Dropdown list*/
      const lensDropdown = document.getElementById("lens-cart-option");
      console.log(lensDropdown);
    } else {
      return;
    }
  }, 500);
};
