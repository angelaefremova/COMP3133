const expect = require("chai").expect;
const calculator = require("../app/calculator");

describe("Calculator Test", () => {

        const add = calculator.add(5, 2);
        const sub = calculator.sub(5, 2);
        const mul = calculator.mul(5, 2);
        const div = calculator.div(10, 2);

        it("add(5, 2) expected result 7 PASS", () => {
            expect(add).to.equal(7);
        });
        it("add(5, 2) expected result 7 FAIL", () => {
            expect(add).to.equal(8);
        });

        it("sub(5, 2) expected result 3 PASS", () => {
            expect(sub).to.equal(3);
        });
        it("sub(5, 2) expected result 3 FAIL", () => {
            expect(sub).to.equal(5);
        });

        it("mul(5, 2) expected result 10 PASS", () => {
            expect(mul).to.equal(10);
        })
        it("mul(5, 2) expected result 10 FAIL", () => {
            expect(mul).to.equal(12);
        })
        
        it("div(10, 2) expected result 5 PASS", () => {
            expect(div).to.equal(5);
        })
        it("div(10, 2) expected result 5 FAIL", () => {
            expect(div).to.equal(2);
        })

});

