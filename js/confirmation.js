// event listener para ejecutar cuando el DOM ya haya cargado
document.addEventListener("DOMContentLoaded", () => {
    printOrderInfo();
});

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