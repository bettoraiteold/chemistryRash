const { expect, assert } = require("chai");
const { describe, it } = require("mocha");
function convertChemicalElementsToSubarrays(chemicalElementsList) {
  return [[], []];
}
describe("convert list of elements { name formula } to a subarray of an array", () => {
  describe("The length of an array should equal to the number of elements", () => {
    it("given 2 chemical elements should return an array of length 2", () => {
      const chemicalElementsList = `Formula Name Formula Name`;
      const elementsTotal = 2;
      assert.deepEqual(
        convertChemicalElementsToSubarrays(chemicalElementsList).length,
        elementsTotal
      );
    });
    it("given 4 chemical elements should return an array of length 4", () => {
      const chemicalElementsList = `Formula Name Formula Name Formula Name`;
      const elementsTotal = 4;
      assert.deepEqual(
        convertChemicalElementsToSubarrays(chemicalElementsList).length,
        elementsTotal
      );
    });
  });

  it("given 2 elements each subarray should have two elements", () => {
    const chemicalElementsList = `Formula Name Formula Name Formula Name`;
    assert.isTrue(checkSubarrayLength(convertChemicalElementsToSubarrays(chemicalElementsList)));
  });
  // it("newline chars and spaces should be ignored", () => {});
});

function checkSubarrayLength(array) {
  for (let i = 0; i < array.length; ++i) {
    for (let count = 0; count < 2; ++count) {
      const subArray = array[i];
      if (!subArray?.[count]) {
        return false;
      }
    }
  }
  return true;
}
