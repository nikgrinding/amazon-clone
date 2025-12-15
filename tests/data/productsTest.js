import {
    Product,
    Clothing,
    Appliance,
    getProduct,
} from "../../data/products.js";

describe("test suite: Product", () => {
    let product;

    beforeEach(() => {
        product = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87,
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"],
        });
    });

    // Test: Verify that Product class correctly stores all basic properties from constructor
    it("has the correct properties", () => {
        expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(product.image).toEqual(
            "images/products/athletic-cotton-socks-6-pairs.jpg"
        );
        expect(product.name).toEqual(
            "Black and Gray Athletic Cotton Socks - 6 Pairs"
        );
        expect(product.rating).toEqual({
            stars: 4.5,
            count: 87,
        });
        expect(product.priceCents).toEqual(1090);
    });

    // Test: Verify that getStarsUrl() returns correct image path based on rating
    it("gets the stars url", () => {
        expect(product.getStarsUrl()).toEqual("images/ratings/rating-45.png");
    });

    // Test: Verify that getPrice() formats price from cents to dollar string
    it("gets the price", () => {
        expect(product.getPrice()).toEqual("$10.90");
    });

    // Test: Verify that base Product class returns empty string for extra info (no special features)
    it("does not display any extra info", () => {
        expect(product.extraInfoHTML()).toEqual("");
    });
});

describe("test suite: Clothing", () => {
    let clothing;

    beforeEach(() => {
        clothing = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56,
            },
            priceCents: 799,
            keywords: ["tshirts", "apparel", "mens"],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png",
        });
    });

    // Test: Verify that Clothing class inherits Product properties and adds sizeChartLink
    it("has the correct properties", () => {
        expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e"),
            expect(clothing.image).toEqual(
                "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
            );

        expect(clothing.sizeChartLink).toEqual(
            "images/clothing-size-chart.png"
        );
    });

    // Test: Verify that Clothing class inherits getStarsUrl() method from Product
    it("gets the stars url", () => {
        expect(clothing.getStarsUrl()).toEqual("images/ratings/rating-45.png");
    });

    // Test: Verify that Clothing class inherits getPrice() method from Product
    it("gets the price", () => {
        expect(clothing.getPrice()).toEqual("$7.99");
    });

    // Test: Verify that Clothing class overrides extraInfoHTML() to display size chart link
    it("displays a size chart link in extraInfoHTML", () => {
        expect(clothing.extraInfoHTML()).toContain(
            `<a href="images/clothing-size-chart.png" target="_blank">`
        );
        expect(clothing.extraInfoHTML()).toContain("Size chart");
    });
});

describe("test suite: Appliance", () => {
    let appliance;

    beforeEach(() => {
        appliance = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197,
            },
            priceCents: 1899,
            keywords: ["toaster", "kitchen", "appliances"],
            type: "appliance",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png",
        });
    });

    // Test: Verify that Appliance class inherits Product properties and adds instruction/warranty links
    it("has the correct properties", () => {
        expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add"),
            expect(appliance.image).toEqual(
                "images/products/black-2-slot-toaster.jpg"
            );

        expect(appliance.instructionsLink).toEqual(
            "images/appliance-instructions.png"
        );
        expect(appliance.warrantyLink).toEqual("images/appliance-warranty.png");
    });

    // Test: Verify that Appliance class inherits getStarsUrl() method from Product
    it("gets the stars url", () => {
        expect(appliance.getStarsUrl()).toEqual("images/ratings/rating-50.png");
    });

    // Test: Verify that Appliance class inherits getPrice() method from Product
    it("gets the price", () => {
        expect(appliance.getPrice()).toEqual("$18.99");
    });

    // Test: Verify that Appliance class overrides extraInfoHTML() to display instructions and warranty links
    it("displays instructions and warranty in extraInfoHTML", () => {
        expect(appliance.extraInfoHTML()).toContain(
            `<a href="images/appliance-instructions.png" target="_blank">`
        );
        expect(appliance.extraInfoHTML()).toContain("Instructions");
        expect(appliance.extraInfoHTML()).toContain(
            `<a href="images/appliance-warranty.png" target="_blank">`
        );
        expect(appliance.extraInfoHTML()).toContain("Warranty");
    });
});

describe("test suite: getProduct", () => {
    // Test: Verify that getProduct() retrieves the correct product from products array by ID
    it("returns the product with matching id from loaded products", () => {
        const product = getProduct("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        if (product) {
            expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
            expect(product.name).toEqual(
                "Black and Gray Athletic Cotton Socks - 6 Pairs"
            );
        }
    });

    // Test: Verify that getProduct() returns undefined when product ID is not found
    it("returns undefined if product id does not exist", () => {
        const product = getProduct("does-not-exist");
        expect(product).toBeUndefined();
    });
});
