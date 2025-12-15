import { orders, addOrder, getOrder } from "../../data/orders.js";

describe("test suite: addOrder", () => {
    beforeEach(() => {
        spyOn(localStorage, "setItem");
        spyOn(localStorage, "getItem").and.returnValue(JSON.stringify([]));
        orders.length = 0;
    });

    // Test: Verify that a new order is added to the beginning of the orders array
    it("adds a new order to the beginning of the orders array", () => {
        const order = {
            id: "order-123",
            orderTime: "2025-01-15",
            totalCostCents: 5000,
            products: [],
        };
        addOrder(order);
        expect(orders.length).toEqual(1);
        expect(orders[0].id).toEqual("order-123");
        expect(orders[0].totalCostCents).toEqual(5000);
    });

    // Test: Verify that newer orders are added to the front, maintaining reverse chronological order
    it("adds new order to the beginning (unshift behavior)", () => {
        const order1 = {
            id: "order-1",
            orderTime: "2025-01-10",
            totalCostCents: 3000,
            products: [],
        };
        const order2 = {
            id: "order-2",
            orderTime: "2025-01-15",
            totalCostCents: 5000,
            products: [],
        };
        addOrder(order1);
        addOrder(order2);
        expect(orders.length).toEqual(2);
        expect(orders[0].id).toEqual("order-2");
        expect(orders[1].id).toEqual("order-1");
    });

    // Test: Verify that addOrder persists the order to localStorage with correct key and format
    it("saves the order to localStorage", () => {
        const order = {
            id: "order-456",
            orderTime: "2025-01-20",
            totalCostCents: 7500,
            products: [],
        };
        addOrder(order);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "amazonOrders",
            JSON.stringify([order])
        );
    });
});

describe("test suite: getOrder", () => {
    beforeEach(() => {
        orders.length = 0;
        orders.push(
            {
                id: "order-1",
                orderTime: "2025-01-10",
                totalCostCents: 3000,
                products: [],
            },
            {
                id: "order-2",
                orderTime: "2025-01-15",
                totalCostCents: 5000,
                products: [],
            }
        );
    });

    // Test: Verify that getOrder retrieves the correct order by ID with all properties intact
    it("returns the order with matching id", () => {
        const order = getOrder("order-1");
        expect(order).not.toBeUndefined();
        expect(order.id).toEqual("order-1");
        expect(order.totalCostCents).toEqual(3000);
    });

    // Test: Verify that getOrder can retrieve different orders correctly from multiple stored orders
    it("returns the correct order for a different id", () => {
        const order = getOrder("order-2");
        expect(order).not.toBeUndefined();
        expect(order.id).toEqual("order-2");
        expect(order.totalCostCents).toEqual(5000);
    });

    // Test: Verify that getOrder returns undefined when searching for a non-existent order ID
    it("returns undefined if order id does not exist", () => {
        const order = getOrder("does-not-exist");
        expect(order).toBeUndefined();
    });

    // Test: Verify that getOrder handles an empty orders array gracefully by returning undefined
    it("returns undefined for empty orders array", () => {
        orders.length = 0;
        const order = getOrder("order-1");
        expect(order).toBeUndefined();
    });
});
