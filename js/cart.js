/* event listener pour executer le script un fois chargé le DOM */
document.addEventListener("DOMContentLoaded", () => {
    // if () {

    // } else {

    // }
    fillCart();
});

const cartPath = "/cart/index.html";
const actualPath = new URL(window.location);

const reservedCamerasMsg = document.getElementById("articles-msg");
const emptyCartMsg = document.getElementById("empty-cart");
const ctaBlock = document.getElementById("cta-block");
const cartPilot = document.getElementById("cart-pilot");

let subTotalCart = 0;
let shippingCost = 0;
let totalCart = 0;

// class type to save to localStorage
class Product {
    constructor(id, lens, price) {
        this.id = id;
        this.lens = lens;
        this.price = price;
    }
}


/* carrito menu
hacer que aparezca el total del carrito
hacer que aparezca el boton de ir al carrito
*/


/**
 * @description crea y llena el carrito
 */
const fillCart = () => {
    // obteniendo info del localStorage 
    let cartStorage = getCart();
    // console.log(cartStorage);
    if (cartStorage !== null) {
        // si el carrito ya existe 
        if (Object.keys(cartStorage).length > 0) {
            for (productIndex in cartStorage) {
                // recorra cada item del objeto del carrito
                getProductById(cartStorage[productIndex].id, productIndex, cartStorage[productIndex].lens)
                    //sacar los parametros con un fetch en la funcion << getProductById >>
                    .then(selectedCamera => {
                        // Crea y adjunte en el DOM las tarjetas de cada camara del carrito
                        addProductToCart(selectedCamera);
                    })
            };
            changeCartVisual();
            //si el carrito no existe
        } else {
            return
        };
    } else {
        // crea carrito (este es el almacenaje de los productos del carrito)
        let cart = {};
        // actualice el carrito en el localStorage
        updateCart(cart);
    }

}


/**
 * @description cambia el visual del carrito en el menu
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
        return
    }
}

/**
 * 
 * @param {string} id 
 * @param {Number} productIndex
 * @param {string} selectedLens
 * @description hace la consulta y trae el objeto por id del localstorage
 */
const getProductById = async (id, productIndex, selectedLens) => {
    let response = await fetch("http://localhost:3000/api/cameras/" + id)
        .catch((err) => {
            console.log("error", err);
        });
    let data = await response.json();
    data.productIndex = productIndex;
    data.selectedLens = selectedLens;
    // console.log(data);
    return data;
};

/**
 * 
 * @param {Object} cameraPrice 
 * @param {String} operation 
 * @description Calcula el precio total del carrito y lo imprime en el DOM
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
    if (shippingPriceContainer && taxPriceContainer && totalPriceContainer !== null) {
        shippingPriceContainer.textContent = `${priceFormat(shippingCost)} €`;
        taxPriceContainer.textContent = `${priceFormat(totalTax)} €`;
        totalPriceContainer.textContent = `${priceFormat(totalCart)} €`;
    } else {
        return
    }
}

/**
 * 
 * @param {Object} selectedCamera objeto del fetch
 * @description adjunta el bloque de html al DOM
 */
const addProductToCart = (selectedCamera) => {
    // console.log("selectedCamera", selectedCamera);
    // Layout card du produit en HTML
    let lensBlock = "";
    let lensOptions = "";
    selectedCamera.lenses.forEach((value) => {
        // console.log(value);
        let selected;
        if (value == selectedCamera.selectedLens) {
            selected = `selected="selected"`;
        } else {
            selected = "";
        }
        lensOptions += `<option class="lens__dropd__item" value="${value}" ${selected}>${value}</option>`
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
    };
    let html = `<div id="prod${selectedCamera.productIndex}" style="border-bottom: 2px solid #000000;">
                    <button
                        id="delete-btn" onclick="removeProduct('${selectedCamera.productIndex}')"
                        class="cart__menu__product__del-btn delete-btn">
                            <img src="/img/btn-close-icon.svg" alt="close icon" />
                    </button>
                    <div class="cart__menu__product__wrapper-main">
                        <div class="cart__menu__product__img" 
                            style="background-image: url(${selectedCamera.imageUrl}); 
                            background-position: center; 
                            background-size: cover; 
                            background-repeat: no-repeat; 
                            background-color: white;">
                        </div>
                        <div class="cart__menu__product__wrapper-info">
                            <h2 class="cart__menu__product__title">${selectedCamera.name}</h2>
                            <h3 class="cart__menu__product__price">${priceFormat(selectedCamera.price)} &euro;</h3>
                            ${lensBlock}`;

    let product = document.getElementById("cart-container");   // cibler l'id du conteneteur
    product.innerHTML = product.innerHTML + html;   // anexer ici le layout avec l'information récuperée
    calculateTotalPrice(selectedCamera.price, "add");
    return true;
};


/**
 * @description agrega el producto al localStorage
 */
const addProduct = () => {
    // apuntar el dropdown
    const dropdown = document.getElementById("lens-option");
    if (dropdown.value != "none") {
        // Apuntar el boton
        const button = document.getElementById("add-product-btn");
        // Apuntar a la direccion URL de la pagina actual
        const windowUrl = new URL(window.location.href);
        // extraer y asignar el id del URL a la constante
        let cameraId = windowUrl.searchParams.get("id");
        // console.log("valor dropdown:", dropdown.value);
        // console.log("Product ID:" + cameraId);
        // Cambiar el color del boton a verde
        button.style.background = "#00b61d";
        // cambiar el texto del boton
        button.textContent = "AJOUTÉ AU PANIER !";
        // desactiva el boton de agregar al carrito
        button.disabled = true;
        // crea una instancia de objeto de la camara seleccionada
        const selectedCamera = new Product(cameraId, dropdown.value, productObject.price);
        // console.log(productObject);
        // obtiene el objeto del carrito del localStorage
        let cartStorage = getCart();
        // comprobacion de si existe 
        if (cartStorage !== null) {
            // crea una fecha y la almacena en una variable
            let d = new Date();
            // genera el index de producto para el objeto en el localStorage       
            let productIndex = `prod${d.getTime()}`;
            //agrega el objeto de la camara al objeto del carrito
            cartStorage[productIndex] = selectedCamera;
            // actualiza el carrito con el objeto nuevo
            updateCart(cartStorage);
            getProductById(cameraId, productIndex, dropdown.value)
                //sacar los parametros con un fetch en la funcion << getProductById >>
                .then(selectedCamera => {
                    // Crea y adjunta en el DOM las tarjetas de cada camara al carrito
                    addProductToCart(selectedCamera);
                })
        }
    } else {
        alert("Veillez rentrer un option d'objectif");
    }
};


/**
 * 
 * @param {int} productIndex (es un entero(numero) y es el index del array del localStorage)
 * @description borra el item de HTML del DOM y actualiza el localStorage
 */
const removeProduct = (productIndex) => {
    let currentCart = getCart(); // Coger el carrito actual con la funcion
    // console.log("current cart", currentCart);
    if (currentCart !== null) { // verificar si el carrito existe
        const product = document.getElementById(`prod${productIndex}`); //coge el id creado en el HTML [prod(indice del array de localStorage)]
        product.remove(); // borrar el bloque de HTML seleccionado anteriormente
        calculateTotalPrice(currentCart[productIndex].price, "substract");
        delete currentCart[productIndex]; // eliminar el item especifico del objeto
        // console.log(currentCart, productIndex);
        updateCart(currentCart); // actualizar el carrito de compras y guardarlo en localStorge
        changeCartVisual();
    } else {

    }
}


/**
 * @description trae el carrito de compras del localStorage
 * @returns retorna el objeto del carrito
 */
const getCart = () => {
    let cartStorage = localStorage.getItem("cart"); //coger el carrito del localStorage
    if (cartStorage !== null) { // comprobar si existe o no
        return JSON.parse(cartStorage); //array listo en javascript para recorrerlo
    } else {
        return null;
    }
}


/**
 * 
 * @param {object} cartStorage es carrito
 * @description actuliza el carrito de compras en el localStorage
 */
const updateCart = (cartStorage) => {
    cartStorage = JSON.stringify(cartStorage); // convertir a string para alojar en localStorage
    localStorage.setItem("cart", cartStorage) // Alojar en el LocalStorage
    changeCartVisual();
}


/**
 * 
 * @param {Number} price 
 * @description Divide en 100 para obtener los decimales del precio
 */
const priceFormat = (price) => {
    return parseFloat(price / 100).toFixed(2);
};


/**
 * 
 * @param {Number} price 
 * @description toma el subtotal y saca el valor de los impuestos
 */
const calculateTax = (price) => {
    return (price * 0.22)
}

