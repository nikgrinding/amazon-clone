import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
    // Test: Verify that cents are correctly converted to dollar format with two decimal places
    it("converts cents into dollars", () => {
        expect(formatCurrency(2095)).toEqual("20.95");
    });

    // Test: Verify that zero cents returns "0.00" format
    it("works with 0", () => {
        expect(formatCurrency(0)).toEqual("0.00");
    });

    // Test: Verify that fractional cents are rounded up to the nearest whole cent
    it("rounds up to the nearest cent", () => {
        expect(formatCurrency(2000.5)).toEqual("20.01");
    });
});
