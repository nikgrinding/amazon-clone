import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { cart, loadCartFetch } from "../data/cart-class.js";
import { renderEmptyState } from "./utils/emptyState.js";
import "./utils/errorHandler.js";

async function loadPage() {
    try {
        await Promise.all([loadProductsFetch(), loadCartFetch()]);
    } catch (error) {
        console.error(error);
    }

    if (cart.cartItems.length === 0) {
        renderEmptyState(".js-order-summary", "Your cart is empty");
        document.querySelector(".js-payment-summary").innerHTML = "";
        document.querySelector(".js-checkout-header").innerHTML = "";
        return;
    }

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();
