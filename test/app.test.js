const { expect, assert } = require("chai");
const { describe, it } = require("mocha");
const numSetOuter = new Set();

function moveToRandomElement() {
  const maxRange = 3;
  if (numSetOuter.size == 3) {
    return null;
  }
  while (true) {
    const uniqueIndex = Math.floor(Math.random() * maxRange);
    if (numSetOuter.has(uniqueIndex)) {
      return moveToRandomElement();
    }
    numSetOuter.add(uniqueIndex);
    return uniqueIndex;
  }
}
for (let i = 0; i < 10; ++i) {
  test();
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
