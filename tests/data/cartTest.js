import { cart } from "../../data/cart-class.js";

describe("test suite: addToCart", () => {
    beforeEach(() => {
        spyOn(localStorage, "setItem");
    });

    // Test: Verify that adding an existing product increments its quantity instead of creating a duplicate
    it("adds an existing product to the cart", () => {
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1",
            },
        ];
        cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "amazonCart-oop",
            JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: "1",
                },
            ])
        );
        expect(cart.cartItems[0].productId).toEqual(
            "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
        );
        expect(cart.cartItems[0].quantity).toEqual(2);
    });

    // Test: Verify that a product not in the cart is added as a new entry with default delivery option
    it("adds a new product to the cart", () => {
        cart.cartItems = [];
        cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "amazonCart-oop",
            JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: "1",
                },
            ])
        );
        expect(cart.cartItems[0].productId).toEqual(
            "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
        );
        expect(cart.cartItems[0].quantity).toEqual(1);
    });
});

describe("test suite: removeFromCart", () => {
    beforeEach(() => {
        spyOn(localStorage, "setItem");
    });

    // Test: Verify that a product is successfully removed from the cart and localStorage is updated
    it("removes a product from the cart", () => {
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: "1",
                },
            ]);
        });
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1",
            },
        ];
        cart.removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.cartItems.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "amazonCart-oop",
            JSON.stringify([])
        );
    });

    // Test: Verify that attempting to remove a non-existent product leaves cart unchanged
    it("does nothing if product is not in the cart", () => {
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: "1",
                },
            ]);
        });
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1",
            },
        ];
        cart.removeFromCart("does-not-exist");
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(
            "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
        );
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "amazonCart-oop",
            JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: "1",
                },
            ])
        );
    });
});

describe("test suite: updateDeliveryOption", () => {
    beforeEach(() => {
        spyOn(localStorage, "setItem");
    });

    // Test: Verify that changing a product's delivery option updates cart and saves to localStorage
    it("updates the delivery option", () => {
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: "1",
                },
            ]);
        });
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1",
            },
        ];
        cart.updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "3");
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(
            "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
        );
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual("3");
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "amazonCart-oop",
            JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: "3",
                },
            ])
        );
    });

    // Test: Verify that updating delivery option for non-existent product does not save to localStorage
    it("does nothing if the product is not in the cart", () => {
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: "1",
                },
            ]);
        });
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1",
            },
        ];
        cart.updateDeliveryOption("does-not-exist", "3");
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(
            "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
        );
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual("1");
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    // Test: Verify that selecting an invalid delivery option prevents saving to localStorage
    it("does nothing if the delivery option does not exist", () => {
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: "1",
                },
            ]);
        });
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1",
            },
        ];
        cart.updateDeliveryOption(
            "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            "does-not-exist"
        );
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(
            "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
        );
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual("1");
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});

describe("test suite: calculateCartQuantity", () => {
    // Test: Verify that total quantity is correctly summed when cart has multiple products
    it("calculates the total quantity for multiple products", () => {
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
        expect(cart.calculateCartQuantity()).toEqual(5);
    });

    // Test: Verify that an empty cart returns 0 as the total quantity
    it("returns 0 for an empty cart", () => {
        cart.cartItems = [];
        expect(cart.calculateCartQuantity()).toEqual(0);
    });

    // Test: Verify that quantity is correct when cart contains only one product
    it("calculates correctly for a single product", () => {
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 7,
                deliveryOptionId: "1",
            },
        ];
        expect(cart.calculateCartQuantity()).toEqual(7);
    });
});

describe("test suite: updateQuantity", () => {
    beforeEach(() => {
        spyOn(localStorage, "setItem");
    });

    // Test: Verify that a product's quantity can be updated to a new value
    it("updates the quantity of a product in the cart", () => {
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1",
            },
        ];
        cart.updateQuantity("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 5);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].quantity).toEqual(5);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "amazonCart-oop",
            JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 5,
                    deliveryOptionId: "1",
                },
            ])
        );
    });

    // Test: Verify that quantity can be updated to 0 (edge case for potential removal)
    it("updates the quantity to 0", () => {
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 3,
                deliveryOptionId: "1",
            },
        ];
        cart.updateQuantity("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 0);
        expect(cart.cartItems[0].quantity).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});

describe("test suite: clearCart", () => {
    beforeEach(() => {
        spyOn(localStorage, "setItem");
    });

    // Test: Verify that clearCart removes all items and updates localStorage
    it("empties the cart", () => {
        cart.cartItems = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: "1",
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "2",
            },
        ];
        cart.clearCart();
        expect(cart.cartItems.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "amazonCart-oop",
            JSON.stringify([])
        );
    });

    // Test: Verify that clearing an already empty cart still triggers localStorage save
    it("does nothing if cart is already empty", () => {
        cart.cartItems = [];
        cart.clearCart();
        expect(cart.cartItems.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});
