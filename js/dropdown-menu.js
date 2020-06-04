/* CONSTANTS & VARIABLES */

const startMenuBtn = document.getElementById("menu-btn");
const addVisibleClassMenu = document.getElementById("main-menu");

const startCurrencyBtn = document.getElementById("currency-btn");
const addVisibleClassCurrency = document.getElementById("currency-menu");

const startCartBtn = document.getElementById("cart-btn");
const addVisibleClassCart = document.getElementById("cart-menu");

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
