import { renderCheckoutHeader } from "../../scripts/checkout/checkoutHeader.js";
import { cart } from "../../data/cart-class.js";

describe("test suite: renderCheckoutHeader", () => {
    beforeEach(() => {
        document.querySelector(".js-test-container").innerHTML = `
            <div class="js-checkout-header"></div>
        `;
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: "1",
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 3,
                deliveryOptionId: "2",
            },
        ];
    });

    afterEach(() => {
        document.querySelector(".js-test-container").innerHTML = "";
    });

    // Test: Verify that renderCheckoutHeader displays the correct total cart quantity
    it("displays the correct cart quantity", () => {
        renderCheckoutHeader();
        expect(
            document.querySelector(".js-return-to-home-link").innerText
        ).toEqual("5");
    });

    // Test: Verify that checkout header renders with correct HTML structure and elements
    it("renders the header structure correctly", () => {
        renderCheckoutHeader();
        expect(document.querySelector(".amazon-logo")).not.toBeNull();
        expect(document.querySelector(".amazon-mobile-logo")).not.toBeNull();
        expect(
            document.querySelector(".checkout-header-middle-section")
        ).not.toBeNull();
        expect(document.querySelector(".js-return-to-home-link")).not.toBeNull();
    });

    // Test: Verify that checkout header displays 0 items when cart is empty
    it("displays 0 when cart is empty", () => {
        cart.cartItems = [];
        renderCheckoutHeader();
        expect(
            document.querySelector(".js-return-to-home-link").innerText
        ).toEqual("0");
    });

    // Test: Verify that checkout header updates when cart quantity changes
    it("updates quantity when cart changes", () => {
        renderCheckoutHeader();
        expect(
            document.querySelector(".js-return-to-home-link").innerText
        ).toEqual("5");

        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1",
            },
        ];
        renderCheckoutHeader();
        expect(
            document.querySelector(".js-return-to-home-link").innerText
        ).toEqual("1");
    });
});
