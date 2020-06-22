// RÉFÉRENCES DES ÉLÉMENTS DU DOM

/* Boutons des menus */
const startMenuBtn = document.getElementById("menu-btn");
const startCurrencyBtn = document.getElementById("currency-btn");
const startCartBtn = document.getElementById("cart-btn");

/* Menus */
const addVisibleClassMenu = document.getElementById("main-menu");
const addVisibleClassCurrency = document.getElementById("currency-menu");
const addVisibleClassCart = document.getElementById("cart-menu");

/* Tableau d'ID's des menus */
const menuArray = ["main-menu", "currency-menu", "cart-menu"];

/* FUNCTIONS */

const toggleVisibleMenu = () => {
  if (addVisibleClassMenu.classList.contains("dropdown-visible")) {
    addVisibleClassMenu.classList.remove("dropdown-visible");
  } else {
    addVisibleClassMenu.classList.add("dropdown-visible");
    addVisibleClassCurrency.classList.remove("dropdown-visible");
    addVisibleClassCart.classList.remove("dropdown-visible");
  }
};

const toggleVisibleCurrency = () => {
  if (addVisibleClassCurrency.classList.contains("dropdown-visible")) {
    addVisibleClassCurrency.classList.remove("dropdown-visible");
  } else {
    addVisibleClassCurrency.classList.add("dropdown-visible");
    addVisibleClassMenu.classList.remove("dropdown-visible");
    addVisibleClassCart.classList.remove("dropdown-visible");
  }
};

const toggleVisibleCart = () => {
  if (addVisibleClassCart.classList.contains("dropdown-visible")) {
    addVisibleClassCart.classList.remove("dropdown-visible");
  } else {
    addVisibleClassCart.classList.add("dropdown-visible");
    addVisibleClassMenu.classList.remove("dropdown-visible");
    addVisibleClassCurrency.classList.remove("dropdown-visible");
  }
};

/* EVENT LISTENERS */

startMenuBtn.addEventListener("click", toggleVisibleMenu);
startCurrencyBtn.addEventListener("click", toggleVisibleCurrency);
startCartBtn.addEventListener("click", toggleVisibleCart);
