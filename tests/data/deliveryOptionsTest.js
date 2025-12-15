import {
    getDeliveryOption,
    calculateDeliveryDate,
    validDeliveryOption,
    deliveryOptions,
} from "../../data/deliveryOptions.js";

describe("test suite: getDeliveryOption", () => {
    // Test: Verify that getDeliveryOption() finds and returns the correct delivery option by ID
    it("returns the delivery option with matching id", () => {
        const deliveryOption = getDeliveryOption("2");
        expect(deliveryOption.id).toEqual("2");
        expect(deliveryOption.deliveryDays).toEqual(3);
        expect(deliveryOption.priceCents).toEqual(499);
    });

    // Test: Verify that invalid ID returns first (default) delivery option as fallback
    it("returns the first delivery option if id does not match", () => {
        const deliveryOption = getDeliveryOption("does-not-exist");
        expect(deliveryOption.id).toEqual("1");
        expect(deliveryOption.deliveryDays).toEqual(7);
        expect(deliveryOption.priceCents).toEqual(0);
    });

    // Test: Verify that free delivery option (7 days) is correctly retrieved
    it("returns the correct delivery option for id 1", () => {
        const deliveryOption = getDeliveryOption("1");
        expect(deliveryOption.id).toEqual("1");
        expect(deliveryOption.priceCents).toEqual(0);
    });

    // Test: Verify that express delivery option (1 day) is correctly retrieved
    it("returns the correct delivery option for id 3", () => {
        const deliveryOption = getDeliveryOption("3");
        expect(deliveryOption.id).toEqual("3");
        expect(deliveryOption.deliveryDays).toEqual(1);
        expect(deliveryOption.priceCents).toEqual(999);
    });
});

describe("test suite: validDeliveryOption", () => {
    // Test: Verify that all three valid delivery option IDs return true
    it("returns true for valid delivery option id", () => {
        expect(validDeliveryOption("1")).toEqual(true);
        expect(validDeliveryOption("2")).toEqual(true);
        expect(validDeliveryOption("3")).toEqual(true);
    });

    // Test: Verify that non-existent or invalid delivery option IDs return false
    it("returns false for invalid delivery option id", () => {
        expect(validDeliveryOption("4")).toEqual(false);
        expect(validDeliveryOption("does-not-exist")).toEqual(false);
        expect(validDeliveryOption("")).toEqual(false);
    });
});

describe("test suite: calculateDeliveryDate", () => {
    // Test: Verify that calculateDeliveryDate() returns a string in the format "DayOfWeek, Month Day"
    it("returns a properly formatted date string", () => {
        const deliveryOption = deliveryOptions[0];
        const deliveryDate = calculateDeliveryDate(deliveryOption);
        expect(typeof deliveryDate).toEqual("string");
        expect(deliveryDate).toMatch(/\w+, \w+ \d+/);
        expect(deliveryDate).toContain(",");
    });

    // Test: Verify that 1-day delivery calculates a date in the near future
    it("calculates a future date for 1-day delivery", () => {
        const deliveryOption = { id: "3", deliveryDays: 1, priceCents: 999 };
        const result = calculateDeliveryDate(deliveryOption);
        expect(typeof result).toEqual("string");
        expect(result.split(",").length).toEqual(2);
        expect(result).toMatch(/\w+, \w+ \d+/);
    });

    // Test: Verify that 3-day delivery option returns valid formatted date
    it("handles 3-day delivery option", () => {
        const deliveryOption = deliveryOptions[1];
        const deliveryDate = calculateDeliveryDate(deliveryOption);
        expect(typeof deliveryDate).toEqual("string");
        expect(deliveryDate).toMatch(/\w+, \w+ \d+/);
    });

    // Test: Verify that 7-day (free) delivery option returns valid formatted date
    it("handles 7-day delivery option", () => {
        const deliveryOption = deliveryOptions[0];
        const deliveryDate = calculateDeliveryDate(deliveryOption);
        expect(typeof deliveryDate).toEqual("string");
        expect(deliveryDate).toMatch(/\w+, \w+ \d+/);
    });

    // Test: Verify that different delivery speeds produce different delivery dates
    it("returns different dates for different delivery options", () => {
        const option1Day = { id: "3", deliveryDays: 1, priceCents: 999 };
        const option7Days = { id: "1", deliveryDays: 7, priceCents: 0 };
        const date1 = calculateDeliveryDate(option1Day);
        const date7 = calculateDeliveryDate(option7Days);
        expect(typeof date1).toEqual("string");
        expect(typeof date7).toEqual("string");
        expect(date1).not.toEqual(date7);
    });
});
