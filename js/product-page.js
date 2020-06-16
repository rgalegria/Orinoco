/* event listener pour executer le script un fois chargé le DOM */
document.addEventListener("DOMContentLoaded", () => {
  getProduct().then(data => {
    loadProductInDOM(data).then(() => {
      showSlide(slideIndex) // passer la réponse à loadProductInDom

      /* DOM ELEMENT REFERENCES */
      const addProductBtn = document.getElementById("add-product-btn");
      const lensDropdown = document.getElementById("lens-option");

      /* EVENT LISTENERS */

      // event listener pour dropdown des objectifs
      lensDropdown.addEventListener("change", ($event) => {
        lensDropdownOption = $event.target.value;
      });

      // event listener pour bouton ajouter au panier
      addProductBtn.addEventListener("click", addProduct);
    })
  })
});

let productObject; //variable global donde se almacena el producto

/* FUNCTIONS */

const getProduct = async () => {
  const params = new URLSearchParams(window.location.search);
  const idProduct = params.get("id");
  let response = await fetch("http://localhost:3000/api/cameras/" + idProduct)
    .catch((err) => {
      console.log("error", err);
    });
  let data = await response.json();
  productObject = data;
  return data;
};

/* PRINT to DOM */

const loadProductInDOM = async (element) => {
  // console.log("data", element);
  // Layout card du produit en HTML
  let objectif = "";
  element.lenses.forEach((value, index) => {
    // console.log(value);
    objectif += `<option class="lens__dropd__item" value="${value}">${value}</option>`
  });
  let html = `
    <!-- Slideshow container -->
      <div class="slideshow">

        <!-- Slideshow img -->
        <div id="slide" 
        class="slideshow__slide fade hide" 
        style="background-image: url(${element.imageUrl}); background-position: center; background-size: cover; background-repeat: no-repeat; background-color: white;"></div>

        <div id="slide" 
        class="slideshow__slide fade hide" 
        style="background-image: url(${element.imageUrl}); background-position: center; background-size: cover; background-repeat: no-repeat; background-color: white;"></div>

        <div id="slide" 
        class="slideshow__slide fade hide" 
        style="background-image: url(${element.imageUrl}); background-position: center; background-size: cover; background-repeat: no-repeat; background-color: white;"></div>
        
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
            ${objectif}
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
  let product = document.getElementById("product-container");   // cibler l'id du conteneteur
  product.innerHTML = product.innerHTML + html;   // anexer ici le layout avec l'information récuperée
  return true;
};

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

