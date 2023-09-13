const { expect, assert } = require("chai");
const { describe, it } = require("mocha");
const usedElementIndexes = new Set();

for (let i = 0; i < 10; ++i) {
  test();
  usedElementIndexes.clear();
}
function test() {
  describe("Generating non-repeating numbers within certain range", () => {
    const numSetInner = new Set();
    afterEach(() => {
      console.log(numSetInner);
    });

    function makeTest(test) {
      describe("Should generate non-repeating number within range of 3", () => {
        const num = moveToRandomElement();
        it(`test - ${test}`, () => {
          assert.isFalse(numSetInner.has(num));
          numSetInner.add(num);
        });
      });
    }
    for (let i = 0; i < 3; ++i) {
      makeTest(i);
    }
    describe("Should return null if all numbers have been generated", () => {
      const num = moveToRandomElement();
      it("should return null", () => {
        assert.equal(num, null);
      });
    });
  });
}
