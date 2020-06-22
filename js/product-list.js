// event listener pour exécuter la fonction une fois le DOM est déjà chargé
document.addEventListener("DOMContentLoaded", () => {
  getProductList();
});

/* FONCTIONS */

/**
 * @description Elle fait la requête à l'API pour obtenir le donnés
 */
const getProductList = () => {
  fetch(apiGetUrl)
    .then((response) => response.json())
    .then((data) => {
      loadDataInDom(data);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

/**
 *
 * @param {Object} data
 * @description Elle prends les donnés de l'API et imprime les bloques du HTML sur le DOM
 */
const loadDataInDom = (data) => {
  data.forEach((element, index) => {
    let className;
    // verification si c'est impair avec %(modulo opperator)
    //division en 2 pour trouver l'impair si le résultat est 0
    if (index % 2 == 0) {
      className = "section-r";
    } else {
      className = "section-l";
    }
    let html = `
        <section class="${className}">
          <div class="${className}__padding">
            <div class="${className}__img" style="background-image: url(${
      element.imageUrl
    });"></div>
          </div>
            <div class="${className}__border">
              <h2 class="${className}__title">${element.name}</h2>
              <h3 class="${className}__subtitle">${priceFormat(
      element.price
    )} &euro;</h3>
              <p class="${className}__description">${element.description}</p>
              <div class="underlined-btn ${className}__btn">
                <a
                  class="underlined-btn__link"
                  href="/product/index.html?id=${element._id}"
                  >voir plus</a
                >
              </div>
            </div>
        </section>`;
    let productList = document.getElementById("debut");
    productList.innerHTML = productList.innerHTML + html;
  });
};
