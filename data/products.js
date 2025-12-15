import formatCurrency from "../scripts/utils/money.js";

export class Product {
    id;
    image;
    name;
    rating;
    priceCents;
    keywords;

    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents;
        this.keywords = productDetails.keywords;
    }

    getStarsUrl() {
        return `images/ratings/rating-${this.rating.stars * 10}.png`;
    }

    getPrice() {
        return `$${formatCurrency(this.priceCents)}`;
    }

    extraInfoHTML() {
        return "";
    }
}

export class Clothing extends Product {
    sizeChartLink;
    constructor(productDetails) {
        super(productDetails);
        this.sizeChartLink = productDetails.sizeChartLink;
    }

    extraInfoHTML() {
        return `<a href="${this.sizeChartLink}" target="_blank">Size chart</a>`;
    }
}

export class Appliance extends Product {
    instructionsLink;
    warrantyLink;

    constructor(productDetails) {
        super(productDetails);
        this.instructionsLink = productDetails.instructionsLink;
        this.warrantyLink = productDetails.warrantyLink;
    }

    extraInfoHTML() {
        return `
      <a href="${this.instructionsLink}" target="_blank">
        Instructions
      </a>
      <a href="${this.warrantyLink}" target="_blank">
        Warranty
      </a>
    `;
    }
}

export let products = [];

export function loadProductsFetch() {
    if (!navigator.onLine) {
        return Promise.reject(new Error("No internet connection"));
    }
    const promise = fetch("https://supersimplebackend.dev/products")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load products");
            }
            return response.json();
        })
        .then((productsData) => {
            products = productsData.map((productDetails) => {
                if (productDetails.type === "clothing") {
                    return new Clothing(productDetails);
                } else if (productDetails.type === "appliance") {
                    return new Appliance(productDetails);
                }
                return new Product(productDetails);
            });
        })
        .catch((error) => {
            console.error("Failed to load products:", error);
            alert("Failed to load products. Please refresh the page.");
        });
    return promise;
}

export function loadProducts(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
        products = JSON.parse(xhr.response).map((productDetails) => {
            if (productDetails.type === "clothing") {
                return new Clothing(productDetails);
            } else if (productDetails.type === "appliance") {
                return new Appliance(productDetails);
            }
            return new Product(productDetails);
        });
        fun();
    });
    xhr.addEventListener("error", (error) => {
        console.error(error);
    });
    xhr.open("GET", "https://supersimplebackend.dev/products");
    xhr.send();
}

export function getProduct(productId) {
    let matchingProduct;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    return matchingProduct;
}
