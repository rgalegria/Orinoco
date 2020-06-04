// DOM ELEMENT REFERENCES

/* form fileds */
const form = document.getElementById("payment-details");
const emailInput = document.getElementById("email");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const addressInput = document.getElementById("address");
const addressComplementInput = document.getElementById("address-complement");
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const cardNumberInput = document.getElementById("card-number");
const cardOwnerInput = document.getElementById("card-owner");
const cardMonthInput = document.getElementById("card-month");
const cardYearInput = document.getElementById("card-year");
const cardCodeInput = document.getElementById("card-cvv");
const salesCodeCodeInput = document.getElementById("sales-code");

/* checkboxes */
const newsletterResult = document.getElementById("newsletter");
const userDetailsResult = document.getElementById("user-details");

/* Rest fields*/
const customerDetails = document.getElementById("customer-details");
const promoForm = document.getElementById("promo-form");

/* Dropdown list*/
const lensDropdown = document.getElementById("lens-option");
let lensDropdownOption;

/* buttons */
const submitButton = document.getElementById("submit-btn");

/* API Url */
const api = "http://localhost:3000/api/cameras/order";

/* FUNCTIONS */

const addPost = async function (data) {
  let request = await fetch(api, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let responseData = await request.json();
  console.log(responseData);
}


/* EVENT LISTENERS */

/* Take form field info*/
form.addEventListener("submit", async ($event) => {
  $event.preventDefault();
  await addPost({
    contact: {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      adresse: addressInput.value,
      city: cityInput.value,
      email: emailInput.value,
    },
    products: [

    ]
  });
  // console.log(addPost);
  // form.reset();
  // promoForm.reset();
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

/* Dropdown list */

lensDropdown.addEventListener("change", ($event) => {
  lensDropdownOption = $event.target.value;
});
