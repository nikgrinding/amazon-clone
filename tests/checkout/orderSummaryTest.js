import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js";
import { loadProductsFetch } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeAll(async () => {
        await loadProductsFetch();
    });

    beforeEach(() => {
        document.querySelector(".js-test-container").innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-checkout-header"></div>
            <div class="js-payment-summary"></div>
        `;
        cart.cartItems = [
            {
                productId: productId1,
                quantity: 2,
                deliveryOptionId: "1",
            },
            {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: "2",
            },
        ];

        renderOrderSummary();
    });

    // Integration Test: Verify that renderOrderSummary correctly displays cart items with product details, quantities, and prices in the DOM
    it("displays the cart", () => {
        expect(
            document.querySelectorAll(".js-cart-item-container").length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`)
                .innerText
        ).toContain("Quantity: 2");
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`)
                .innerText
        ).toContain("Quantity: 1");
        expect(
            document.querySelector(`.js-product-name-${productId1}`).innerText
        ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
        expect(
            document.querySelector(`.js-product-price-${productId1}`).innerText
        ).toEqual(`$10.90`);
        expect(
            document.querySelector(`.js-product-price-${productId2}`).innerText
        ).toEqual(`$20.95`);
    });

    // Integration Test: Verify that clicking the delete link removes the product from both the DOM and the cart
    it("removes a product", () => {
        document
            .querySelector(`.js-delete-quantity-link-${productId1}`)
            .click();

        expect(
            document.querySelectorAll(".js-cart-item-container").length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId2);
    });

    afterEach(() => {
        document.querySelector(".js-test-container").innerHTML = "";
    });

    // Integration Test: Verify that changing delivery option updates the cart, UI state, and recalculates payment summary
    it("updates the delivery option", () => {
        document.querySelector(`.js-delivery-option-${productId1}-3`).click();

        expect(
            document.querySelector(`.js-delivery-option-input-${productId1}-3`)
                .checked
        ).toEqual(true);

        expect(cart.cartItems.length).toEqual(2);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual("3");

        expect(
            document.querySelector(".js-payment-summary-shipping").innerText
        ).toEqual("$14.98");
        expect(
            document.querySelector(".js-payment-summary-total").innerText
        ).toEqual("$63.50");
    });
});
