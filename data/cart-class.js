import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        try {
            this.cartItems = JSON.parse(
                localStorage.getItem(this.#localStorageKey)
            ) || [];
        } catch (error) {
            this.cartItems = [];
        }
    }
    saveToStorage() {
        try {
            localStorage.setItem(
                this.#localStorageKey,
                JSON.stringify(this.cartItems)
            );
        } catch (error) {
            console.error("Failed to save cart:", error);
        }
    }
    addToCart(productId, quantity) {
        let matchingItem = "";
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: `1`,
            });
        }

        this.saveToStorage();
    }
    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }
    calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }
    updateQuantity(productId, newQuantity) {
        let matchingItem = "";
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
        if (matchingItem && newQuantity > 0) {
            matchingItem.quantity = newQuantity;
            this.saveToStorage();
        }
    }
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem = "";
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
        if (!matchingItem) {
            return;
        }
        if (!validDeliveryOption(deliveryOptionId)) {
            return;
        }
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }

    updateCartQuantityDisplay() {
        const cartQuantity = this.calculateCartQuantity();
        const cartQuantityElement = document.querySelector(".js-cart-quantity");
        if (cartQuantityElement) {
            cartQuantityElement.innerHTML = cartQuantity;
        }
    }

    clearCart() {
        this.cartItems = [];
        this.saveToStorage();
    }
}

export const cart = new Cart("amazonCart-oop");

export async function loadCartFetch() {
    const response = await fetch("https://supersimplebackend.dev/cart");
    const text = await response.text();
    return text;
}
