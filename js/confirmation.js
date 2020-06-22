// event listener pour exécuter la fonction une fois le DOM est déjà chargé
document.addEventListener("DOMContentLoaded", () => {
    printOrderInfo();
});


/**
 * @description Imprime dans le DOM le numéro de commande ainsi que le prix total formaté
 */
const printOrderInfo = () => {
    const totalPriceInput = document.getElementById("total-price");
    const orderIdInput = document.getElementById("order-id");
    const windowUrl = new URL(window.location.href);
    let orderId = windowUrl.searchParams.get("id");
    let totalPrice = windowUrl.searchParams.get("total");
    totalPriceInput.textContent = `${parseFloat(totalPrice / 100).toFixed(2)} €`;
    orderIdInput.textContent = orderId;
    localStorage.clear();
}