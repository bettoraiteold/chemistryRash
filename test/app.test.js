const { assert } = require("chai");
const { describe, it } = require("mocha");
function chemicalElementsListToSubarrays(chemicalElementsList) {
  const array = new Array();
  const subarrMaxLength = 2;
  let subarray = new Array();
  let word = "";
  for (let i = 0; i < chemicalElementsList.length; ++i) {
    const letter = chemicalElementsList[i];

    switch (letter) {
      case " ":
        subarray.push(word);
        word = "";
        if (subarray.length == subarrMaxLength) {
          array.push(subarray);
          subarray = [];
        }
        break;
      case "\n":
        break;
      default:
        word += letter;
    }
  }
  if (word) {
    subarray.push(word);
    if (subarray.length == subarrMaxLength) {
      array.push(subarray);
    }
  }
  return array;
}
describe("convert a list of elements 'name formula'  to a subarray of an array", () => {
  describe("The length of an array should equal to the number of elements", () => {
    it("given 2 chemical elements should return an array of length 2", () => {
      const chemicalElementsList = `CH4 Метан C2H6 Этан`;
      const elementsTotal = 2;
      assert.deepEqual(chemicalElementsListToSubarrays(chemicalElementsList).length, elementsTotal);
    });
    it("given 4 chemical elements should return an array of length 4", () => {
      const chemicalElementsList = `CH4 Метан C2H6 Этан C3H8 Пропан C4H10 Бутан`;
      const elementsTotal = 4;
      assert.deepEqual(chemicalElementsListToSubarrays(chemicalElementsList).length, elementsTotal);
    });
  });

  it("given 2 elements each subarray should have two elements", () => {
    const chemicalElementsList = `Formula Name Formula Name`;
    assert.isTrue(checkSubarrayLength(chemicalElementsListToSubarrays(chemicalElementsList)));
  });
  it("newline chars and spaces should be ignored", () => {
    const chemicalElementsList = `Formula \n\nName \n\n\nFormula Name`;
    const elementsTotal = 2;
    assert.deepEqual(chemicalElementsListToSubarrays(chemicalElementsList).length, elementsTotal);
  });
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
