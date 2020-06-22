// event listener pour exécuter la fonction une fois le DOM est déjà chargé
document.addEventListener("DOMContentLoaded", () => {
  getProduct().then((data) => {
    loadProductInDOM(data).then(() => {
      showSlide(slideIndex);

      // RÉFÉRENCES DES ÉLÉMENTS DU DOM
      const addProductBtn = document.getElementById("add-product-btn");
      const lensDropdown = document.getElementById("lens-option");

      /* EVENT LISTENERS */

      // event listener pour dropdown des objectifs
      lensDropdown.addEventListener("change", ($event) => {
        lensDropdownOption = $event.target.value;
      });

      // event listener pour bouton ajouter au panier
      addProductBtn.addEventListener("click", addProduct);
    });
  });
});

/* VARIABLES GLOBALES */

let productObject;
let slideIndex = 1;

/* FUNCTIONS */

/**
 * @description Récupère l'id du produit dans du query string de l'URL et fait une requête a l'API par ID.
 * @returns l'objet du produit en JSON
 */
const getProduct = async () => {
  const params = new URLSearchParams(window.location.search);
  const idProduct = params.get("id");
  let response = await fetch(apiGetUrl + idProduct).catch((err) => {
    console.log("error", err);
  });
  let data = await response.json();
  productObject = data;
  return data;
};

/**
 *
 * @param {String} element les valeurs a l'interieur de l'objet JSON du produit
 * @description Elle imprime le block HTML sur le DOM pour chaque element dans le JSON de l'API
 */
const loadProductInDOM = async (element) => {
  let lens = "";
  element.lenses.forEach((value) => {
    lens += `<option class="lens__dropd__item" value="${value}">${value}</option>`;
  });
  let html = `
    <!-- Slideshow container -->
      <div class="slideshow">

        <!-- Slideshow img -->
        <div id="slide" 
        class="slideshow__slide fade hide" 
        style="background-image: url(${
          element.imageUrl
        }); background-position: center; background-size: cover; background-repeat: no-repeat; background-color: white;"></div>

        <div id="slide" 
        class="slideshow__slide fade hide" 
        style="background-image: url(${
          element.imageUrl
        }); background-position: center; background-size: cover; background-repeat: no-repeat; background-color: white;"></div>

        <div id="slide" 
        class="slideshow__slide fade hide" 
        style="background-image: url(${
          element.imageUrl
        }); background-position: center; background-size: cover; background-repeat: no-repeat; background-color: white;"></div>
        
        <!-- Next and previous buttons -->
        <a class="prev-btn" onclick="plusSlide(-1)">&#10094;</a>
        <a class="next-btn" onclick="plusSlide(1)">&#10095;</a>

        <!-- The dots/circles -->
        <div class="dots" style="text-align: center;">
          <span class="dot" onclick="currentSlide(1)"></span>
          <span class="dot" onclick="currentSlide(2)"></span>
          <span class="dot" onclick="currentSlide(3)"></span>
        </div>
      </div>

      <!-- Product info -->
      <article class="product">
        <h1 class="product__title">${element.name}</h1>
        <h2 class="product__subtitle">${priceFormat(element.price)} &euro;</h2>

        <!-- Drop button -->
        <div class="lens__dropd product__dropd">
          <select id="lens-option" class="lens__dropd__btn">
            <option class="lens__dropd__item" value="none">Veuillez choisir</option>
            ${lens}
          </select>
        </div>

        <!-- Product description -->
        <p class="product__description">${element.description}</p>
        <button id="add-product-btn" class="submit-btn product__btn">ajouter au panier</button>
        <div class="underlinedgrey-btn product__return-btn">
          <a
            class="underlinedgrey-btn__link"
            href="/product-list/"
            >retourner à la liste</a>
        </div>
      </article>
        `;
  let product = document.getElementById("product-container");
  product.innerHTML = product.innerHTML + html;
  return true;
};

/* Slideshow */

/**
 *
 * @param {Number} n
 * @description Elle permet de changer (visualiser) d'image dans le slideshow
 */
const showSlide = (n) => {
  let i;
  let slides = document.getElementsByClassName("hide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
};

/* boutons avant/après */
const plusSlide = (n) => {
  showSlide((slideIndex += n));
};

const currentSlide = (n) => {
  showSlide((slideIndex = n));
};
