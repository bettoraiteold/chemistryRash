export function chemicalElementsListToSubarrays(chemicalElementsList) {
  const array = new Array();
  const subarrMaxLength = 2;
  let subarray = new Array();
  let word = "";
  for (let i = 0; i < chemicalElementsList.length; ++i) {
    const letter = chemicalElementsList[i];

    switch (letter) {
      case " ":
        if (word) {
          subarray.push(word);
          word = "";
        }
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
