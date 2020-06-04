/* event listener pour executer le script un fois chargé le DOM */
document.addEventListener("DOMContentLoaded", () => {
  getProduct();
});

/* FUNCTIONS */

const getProduct = () => {
  const params = new URLSearchParams(window.location.search);
  const idProduct = params.get("id");
  fetch("http://localhost:3000/api/cameras/" + idProduct)
    .then((res) => res.json()) //convertir la réponse en JSON
    .then((data) => {
      loadProductInDOM(data); // passer la réponse à loadProductInDom
      // console.log(data);
      showSlide(slideIndex);
    })
    // Récuperer l'erreur s'il y a un
    .catch((err) => {
      console.log("error", err);
    });
};

/* formateur du prix */

const priceFormat = (price) => {
  return parseFloat(price / 100).toFixed(2);
};

/* PRINT to DOM */

const loadProductInDOM = (element) => {
  // Layout card du produit en HTML
  let objectif = "";
  element.lenses.forEach((value, index) => {
    // console.log(value);
    objectif += `<option class="lens__dropd__item" value="${value}">${value}</option>`;
  });
  let html = `
    <!-- Slideshow container -->
      <div class="slideshow">

        <!-- Slideshow img -->
        <div id="slide" class="slideshow__slide fade hide" style="background-image: url(${element.imageUrl}); background-position: center; background-size: cover; background-repeat: no-repeat; background-color: white;"></div>

        <div id="slide" class="slideshow__slide fade hide" style="background-image: url(${element.imageUrl}); background-position: center; background-size: cover; background-repeat: no-repeat; background-color: white;"></div>

        <div id="slide" class="slideshow__slide fade hide" style="background-image: url(${element.imageUrl}); background-position: center; background-size: cover; background-repeat: no-repeat; background-color: white;"></div>
        
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
          <select name="lenses" id="lens-option" class="lens__dropd__btn">
            <option class="lens__dropd__item" value="">Veuillez choisir</option>;
            ${objectif}
          </select>
        </div>

        <!-- Product description -->
        <p class="product__description">${element.description}</p>
        <button id="add-product" class="submit-btn product__btn">
          ajouter au panier
        </button>
        <div class="underlinedgrey-btn product__return-btn">
          <a
            class="underlinedgrey-btn__link"
            href="/product-list/index.html"
            >retourner à la liste</a
          >
        </div>
      </article>
        `;
  let product = document.getElementById("product-container");   // cibler l'id du conteneteur à injecter
  product.innerHTML = product.innerHTML + html;   // anexer ici le layout avec l'information récuperée
};


/* DOM ELEMENT REFERENCES */

const addProduct = document.getElementById("add-product");

/* SLIDESHOW */

let slideIndex = 1;

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


// boutons avant/après
const plusSlide = (n) => {
  showSlide((slideIndex += n));
};

const currentSlide = (n) => {
  showSlide((slideIndex = n));
};

const cogerID = () => {
  const params = new URLSearchParams(window.location.search);
  const data = params.get("id");
};

class Product {
  constructor(id, lens) {
    this.id = id;
    this.lens = lens;
  }
}


const test = () => {
  console.log("click");
}

/* EVENT LISTENERS */

/* Dropdown list*/
const lensDropdown = document.getElementById("lens-option");
let lensDropdownOption;

// event listener pour dropdown des objectifs
lensDropdown.addEventListener("change", ($event) => {
  lensDropdownOption = $event.target.value;
});

// event listener pour bouton ajouter au panier
addProduct.addEventListener("click", test);