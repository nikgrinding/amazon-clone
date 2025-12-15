import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart-class.js";

async function loadPage() {
	try {
		await Promise.all([loadProductsFetch(), loadCartFetch()]);
	} catch (error) {
		console.log("unexpected error. please try again later");
	}
	renderCheckoutHeader();
	renderOrderSummary();
	renderPaymentSummary();
}
loadPage();

// Promise.all([
// 	loadProductsFetch(),
// new Promise((resolve) => {
// 	loadCart(() => {
// 		resolve();
// 	});
// }),
// ]).then((values) => {
// 	console.log(values);
// renderCheckoutHeader();
// renderOrderSummary();
// renderPaymentSummary();
// });

// new Promise((resolve) => {
// 	loadProducts(() => {
// 		resolve('value1');
// 	});
// })
// 	.then((value) => {
// 		console.log(value);
// 		return new Promise((resolve) => {
// 			loadCart(() => {
// 				resolve();
// 			});
// 		});
// 	})
// 	.then(() => {
// 		renderCheckoutHeader();
// 		renderOrderSummary();
// 		renderPaymentSummary();
// 	});

// loadProducts(() => {
// 	loadCart(() => {
// 		renderCheckoutHeader();
// 		renderOrderSummary();
// 		renderPaymentSummary();
// 	});
// });
