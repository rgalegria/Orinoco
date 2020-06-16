// event listener para ejecutar cuando el DOM ya haya cargado
document.addEventListener("DOMContentLoaded", () => {
  getProductList();
});

const getProductList = () => {
  fetch("http://localhost:3000/api/cameras")
    .then((response) => response.json()) //convierte la respuesta del API en json
    .then((res) => {
      // pasa la respesta a loadDataInDom (piedra redondeada)
      loadDataInDom(res);
    })
    // si no funciona, recoger el error (piedra rota)
    .catch((error) => {
      console.log("error", error);
    });
};

// del resultado, crear una tarjeta por cada element
const loadDataInDom = (result) => {
  result.forEach((element, index) => {
    let className;
    // verificar si es impar con %(modulo opperator)
    if (index % 2 /* divide en 2 para encontrar el impar si da 0  */ == 0) {
      className = "section-r";
    } else {
      className = "section-l";
    }

    // plantilla de la tarjeta del producto
    let html = `
        <section class="${className}">
          <div class="${className}__padding">
            <div class="${className}__img" style="background-image: url(${element.imageUrl});"></div>
          </div>
            <div class="${className}__border">
              <h2 class="${className}__title">${element.name}</h2>
              <h3 class="${className}__subtitle">${priceFormat(element.price)} &euro;</h3>
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
    // apunta el id del contenedor a inyectar
    let productList = document.getElementById("debut");
    // anexar aqui la tarjeta con los resultados
    productList.innerHTML = productList.innerHTML + html;
  });
};
