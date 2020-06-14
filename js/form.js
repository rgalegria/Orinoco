// DOM ELEMENT REFERENCES

/* form fields */
const promoForm = document.getElementById("promo-form");
const form = document.getElementById("payment-details");
const customerDetails = document.getElementById("customer-details");
const emailInput = document.getElementById("email");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const addressInput = document.getElementById("address");
const addressComplementInput = document.getElementById("address-complement");
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");

/* card fields */
const cardNumberInput = document.getElementById("card-number");
const cardOwnerInput = document.getElementById("card-owner");
const cardMonthInput = document.getElementById("card-month");
const cardYearInput = document.getElementById("card-year");
const cardCodeInput = document.getElementById("card-cvv");

/* sales field */
const salesCodeCodeInput = document.getElementById("sales-code");

/* checkboxes */
const newsletterResult = document.getElementById("newsletter");
const userDetailsResult = document.getElementById("user-details");

/* Dropdown list*/
const lensDropdown = document.getElementById("lens-cart-option");
let lensDropdownOption;

/* buttons */
const submitButton = document.getElementById("submit-btn");


/* API Url */
const api = "http://localhost:3000/api/cameras/order";

/* FUNCTIONS */

const postOrder = async function (data) {
  let request = await fetch(api, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let responseData = await request.json();
  // console.log(responseData);
  window.location.assign(`../order/index.html?id=${responseData.orderId}&total=${totalCart}`);
}

/* EVENT LISTENERS */

/* Take form field info*/
form.addEventListener("submit", async ($event) => {
  $event.preventDefault();
  // let ret = validate();
  if (lensDropdownOption.value != "none") {
    let cameraIndex = [];
    let cart = getCart();
    for (productIndex in cart) {
      cameraIndex.push(cart[productIndex].id);
    }
    await postOrder({
      contact: {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value
      },
      products: cameraIndex
    });
    // form.reset();
    // promoForm.reset();
  } else {
    alert("Veillez rentrer un option d'objectif");
  }
});

/* Newsletter checkbox */
document.getElementById("newsletter").addEventListener("change", ($event) => {
  if ($event.target.checked === true) {
    console.log("utilisateur inscrit");
  } else {
    console.log("utilisateur non inscrit");
  }
});

/* User Details checkbox */
document.getElementById("user-details").addEventListener("change", ($event) => {
  if ($event.target.checked === true) {
    console.log("Sauvagarder mes coordonnées");
  } else {
    console.log("Ne pas sauvagarder mes coordonnées");
  }
});

// /* Dropdown list */

// lensDropdown.addEventListener("change", ($event) => {
//   lensDropdownOption = $event.target.value;
// });
