import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";
import { cart } from "../../data/cart-class.js";
import { loadProductsFetch } from "../../data/products.js";

describe("test suite: renderPaymentSummary", () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeAll(async () => {
        await loadProductsFetch();
    });

    beforeEach(() => {
        document.querySelector(".js-test-container").innerHTML = `
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
    });

    afterEach(() => {
        document.querySelector(".js-test-container").innerHTML = "";
    });

    // Test: Verify that payment summary correctly calculates and displays the total item count
    it("displays the correct item count", () => {
        renderPaymentSummary();
        expect(
            document.querySelector(".payment-summary-row").innerText
        ).toContain("Items (3)");
    });

    // Test: Verify that payment summary calculates correct product subtotal based on price and quantity
    it("calculates correct items total", () => {
        renderPaymentSummary();
        const itemsTotal = document
            .querySelectorAll(".payment-summary-row")[0]
            .querySelector(".payment-summary-money").innerText;
        expect(itemsTotal).toEqual("$42.75");
    });

    // Test: Verify that payment summary calculates correct shipping cost based on delivery options
    it("calculates correct shipping cost", () => {
        renderPaymentSummary();
        const shippingCost = document.querySelector(
            ".js-payment-summary-shipping"
        ).innerText;
        expect(shippingCost).toEqual("$4.99");
    });

    // Test: Verify that payment summary calculates tax as 10% of subtotal (items + shipping)
    it("calculates correct tax amount", () => {
        renderPaymentSummary();
        const taxAmount = document
            .querySelectorAll(".payment-summary-row")[3]
            .querySelector(".payment-summary-money").innerText;
        expect(taxAmount).toEqual("$4.77");
    });

    // Test: Verify that payment summary calculates correct order total (items + shipping + tax)
    it("calculates correct order total", () => {
        renderPaymentSummary();
        const orderTotal = document.querySelector(
            ".js-payment-summary-total"
        ).innerText;
        expect(orderTotal).toEqual("$52.51");
    });

    // Test: Verify that payment summary updates correctly when cart has different delivery options
    it("updates correctly with express shipping", () => {
        cart.cartItems = [
            {
                productId: productId1,
                quantity: 1,
                deliveryOptionId: "3",
            },
        ];
        renderPaymentSummary();
        const shippingCost = document.querySelector(
            ".js-payment-summary-shipping"
        ).innerText;
        const orderTotal = document.querySelector(
            ".js-payment-summary-total"
        ).innerText;
        expect(shippingCost).toEqual("$9.99");
        expect(orderTotal).toEqual("$22.98");
    });

    // Test: Verify that payment summary correctly handles an empty cart
    it("handles empty cart", () => {
        cart.cartItems = [];
        renderPaymentSummary();
        expect(
            document.querySelector(".payment-summary-row").innerText
        ).toContain("Items (0)");
        const orderTotal = document.querySelector(
            ".js-payment-summary-total"
        ).innerText;
        expect(orderTotal).toEqual("$0.00");
    });

    // Test: Verify that place order button is rendered and clickable
    it("renders place order button", () => {
        renderPaymentSummary();
        const button = document.querySelector(".js-place-order-button");
        expect(button).not.toBeNull();
        expect(button.innerText).toContain("Place your order");
    });
});
