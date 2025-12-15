import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import "./utils/errorHandler.js";

async function loadPage() {
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get("orderId");
    const productId = url.searchParams.get("productId");

    const order = getOrder(orderId);
    const product = getProduct(productId);

    if (!order || !product) {
        document.querySelector(".js-order-tracking").innerHTML = `
            <div style="text-align: center; padding: 100px 20px;">
                <h2>Order not found</h2>
                <a href="orders.html">
                    <button class="button-primary" style="margin-top: 20px; padding: 10px 30px;">
                        View Orders
                    </button>
                </a>
            </div>
        `;
        return;
    }

    let productDetails;
    order.products.forEach((details) => {
        if (details.productId === product.id) {
            productDetails = details;
        }
    });

    if (!productDetails) {
        document.querySelector(".js-order-tracking").innerHTML = `
            <div style="text-align: center; padding: 100px 20px;">
                <h2>Product not found in order</h2>
                <a href="orders.html">
                    <button class="button-primary" style="margin-top: 20px; padding: 10px 30px;">
                        View Orders
                    </button>
                </a>
            </div>
        `;
        return;
    }

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
    const percentProgress =
        ((today - orderTime) / (deliveryTime - orderTime)) * 100;
    const deliveredMessage =
        today < deliveryTime ? "Arriving on" : "Delivered on";

    const trackingHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            ${deliveredMessage} ${dayjs(
        productDetails.estimatedDeliveryTime
    ).format("dddd, MMMM D")}
        </div>

        <div class="product-info">
            ${product.name}
        </div>

        <div class="product-info">
            Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}" onerror="this.style.display='none'">

        <div class="progress-labels-container">
            <div class="progress-label ${
                percentProgress < 50 ? "current-status" : ""
            }">
                Preparing
            </div>
            <div class="progress-label ${
                percentProgress >= 50 && percentProgress < 100
                    ? "current-status"
                    : ""
            }">
                Shipped
            </div>
            <div class="progress-label ${
                percentProgress >= 100 ? "current-status" : ""
            }">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
    `;

    document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
}

cart.updateCartQuantityDisplay();
loadPage();
