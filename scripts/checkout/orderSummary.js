import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
    calculateDeliveryDate,
    deliveryOptions,
    getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
    let cartSummaryHTML = "";

    cart.cartItems.forEach((cartItem) => {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML += `<div class="cart-item-container js-cart-item-container js-cart-item-container-${
            matchingProduct.id
        }">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>
    
            <div class="cart-item-details-grid">
                <img
                    class="product-image"
                    src=${matchingProduct.image}
                />
    
                <div class="cart-item-details">
                    <div class="product-name js-product-name-${
                        matchingProduct.id
                    }">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price js-product-price-${
                        matchingProduct.id
                    }">${matchingProduct.getPrice()}</div>
                    <div class="product-quantity js-product-quantity-${
                        matchingProduct.id
                    }">
                        <span>
                            Quantity:
                            <span class="quantity-label js-quantity-label-${
                                matchingProduct.id
                            }">${cartItem.quantity}</span>
                        </span>
                        <span
                            class="update-quantity-link js-update-quantity-link link-primary" data-product-id = "${
                                matchingProduct.id
                            }"
                        >
                            Update
                            </span>
                        <input class="quantity-input js-quantity-input-${
                            matchingProduct.id
                        }">
                        <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id = "${
                            matchingProduct.id
                        }">Save</span>
                        <span
                            class="delete-quantity-link link-primary js-delete-quantity-link js-delete-quantity-link-${
                                matchingProduct.id
                            }" data-product-id = "${matchingProduct.id}"
                        >
                            Delete
                        </span>
                    </div>
                </div>
    
                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>`;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = "";
        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);
            const { priceCents } = deliveryOption;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += `
            <div class="delivery-option js-delivery-option js-delivery-option-${
                matchingProduct.id
            }-${deliveryOption.id}" data-product-id="${
                matchingProduct.id
            }" data-delivery-option-id="${deliveryOption.id}">
                <input
                    type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input js-delivery-option-input-${
                        matchingProduct.id
                    }-${deliveryOption.id}"
                    name="delivery-option-${matchingProduct.id}"
                />
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${
                            priceCents
                                ? "$" + formatCurrency(priceCents) + " -"
                                : "FREE"
                        } Shipping
                    </div>
                </div>
            </div>
            `;
        });
        return html;
    }

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            cart.removeFromCart(productId);
            renderCheckoutHeader();
            renderPaymentSummary();
            renderOrderSummary();
        });
    });

    document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            document
                .querySelector(`.js-cart-item-container-${productId}`)
                .classList.add("is-editing-quantity");
        });
    });

    function handleUpdateQuantity(productId) {
        const quantity = Number(
            document.querySelector(`.js-quantity-input-${productId}`).value
        );
        if (quantity <= 0 || quantity >= 1000) {
            alert("Quantity must be at least 1 and less than 1000");
            return;
        }
        cart.updateQuantity(productId, quantity);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    }

    document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
        const productId = link.dataset.productId;
        const quantityInput = document.querySelector(
            `.js-quantity-input-${productId}`
        );
        link.addEventListener("click", () => {
            handleUpdateQuantity(productId);
            renderPaymentSummary();
        });
        quantityInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                handleUpdateQuantity(productId);
                renderPaymentSummary();
            }
        });
    });

    document.querySelectorAll(".js-delivery-option").forEach((element) => {
        element.addEventListener("click", () => {
            const { productId, deliveryOptionId } = element.dataset;
            cart.updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
