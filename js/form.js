// RÉFÉRENCES DES ÉLÉMENTS DU DOM

/* Champs du formulaire */
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

/* Champs carte-bleue */
const cardNumberInput = document.getElementById("card-number");
const cardOwnerInput = document.getElementById("card-owner");
const cardMonthInput = document.getElementById("card-month");
const cardYearInput = document.getElementById("card-year");
const cardCodeInput = document.getElementById("card-cvv");

/* Champ du Code promo */
const salesCodeCodeInput = document.getElementById("sales-code");

/* checkboxes */
const newsletterResult = document.getElementById("newsletter");
const userDetailsResult = document.getElementById("user-details");

/* boutons */
const submitButton = document.getElementById("submit-btn");

/* POST API Url */
const apiPostUrl = "http://localhost:3000/api/cameras/order/";

/* FONCTIONS */

const postOrder = async (data) => {
  let request = await fetch(apiPostUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let responseData = await request.json();
  window.location.assign(
    `../order/index.html?id=${responseData.orderId}&total=${totalCart}`
  );
};

/**
 * @description Pour chaque champ du formulaire il exécute une validation
 */
const validateForm = () => {
  /* RegEx : Regular Expressions */
  const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regExText = /^[a-zA-Z- àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{2,30}$/;
  const regExAddress = /^\d{1,7}( |-)?([a-zA-Z]|\d)*(\s[a-zA-Z-\'?]+\.?){1,3}/;
  const regExCity = /^[a-zA-Z- àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{1,85}$/;

  /* Verification par champ */
  const isEmailOk = validateField(emailInput, regExEmail);
  const isLastNameOk = validateField(lastNameInput, regExText);
  const isFirstNameOk = validateField(firstNameInput, regExText);
  const isAddressOk = validateField(addressInput, regExAddress);
  const isCityOk = validateField(cityInput, regExCity);

  console.log(
    "email:",
    isEmailOk,
    "Name:",
    isFirstNameOk,
    "Lastname:",
    isLastNameOk,
    "Address:",
    isAddressOk,
    "City:",
    isCityOk
  );

  if (
    isEmailOk &&
    isLastNameOk &&
    isFirstNameOk &&
    isAddressOk &&
    isCityOk === true
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 *
 * @param {Object} inputField
 * @param {String} pattern
 * @description Validation de comparaison entre le texte rentré par l'utilisateur et un RegEx et ajoute la classe pour en cas d'erreur ou verifié
 */
const validateField = (inputField, pattern) => {
  let regex = new RegExp(pattern, "g");
  let rex = regex.test(inputField.value);
  if (!rex) {
    if (inputField.classList.contains("good")) {
      inputField.classList.remove("good");
      inputField.classList.add("error");
    } else {
      inputField.classList.add("error");
    }
  } else {
    if (inputField.classList.contains("error")) {
      inputField.classList.remove("error");
      inputField.classList.add("good");
    } else {
      inputField.classList.add("good");
    }
  }
  return rex;
};

/* EVENT LISTENERS */

/* Prendre les informations du formulaire */
form.addEventListener("submit", async ($event) => {
  $event.preventDefault();
  let validation = validateForm();
  if (validation === true) {
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
        email: emailInput.value,
      },
      products: cameraIndex,
    });
    form.reset();
    promoForm.reset();
  } else {
    alert("Veillez vérifier les informations dans les champs en rouge");
  }
});

/* Checkbox Newsletter */
document.getElementById("newsletter").addEventListener("change", ($event) => {
  if ($event.target.checked === true) {
    console.log("utilisateur inscrit");
  } else {
    console.log("utilisateur non inscrit");
  }
});

/* Checkbox coordonnées de l'utilisateur */
document.getElementById("user-details").addEventListener("change", ($event) => {
  if ($event.target.checked === true) {
    console.log("Sauvagarder mes coordonnées");
  } else {
    console.log("Ne pas sauvagarder mes coordonnées");
  }
});
