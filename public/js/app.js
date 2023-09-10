const elementNameContainer = document.getElementById("element-name-container");
const elementFormulaContainer = document.getElementById("element-formula-container");
const quizInput = document.getElementById("quiz-input");
const skipButton = document.getElementById("quiz-skip-btn");
const replayButton = document.getElementById("quiz-replay-btn");
const quizTitle = document.getElementById("quiz-title");
const alkanes = {
  CH4: "Метан",
  C2H6: "Этан",
  C3H8: "Пропан",
  C4H10: "Бутан",
  C5H12: "Пентан",
  C6H14: "Гексан",
  C7H16: "Гептан",
  C8H18: "Октан",
  C9H20: "Нонан",
  C1H22: "Декан",
};
const radicals = {
  CH4: "Метанaaa",
  C2H6: "Этанaaa",
};
class ElementsList {
  constructor(elementsNameFormulaArr) {
    // Creating an array of arrays that contains element name/formula from alkanes/radicals object
    this.elementsNameFormulaArr = elementsNameFormulaArr;
    this.elementIndex = 0;
  }
  moveToNextElement() {
    if (this.elementIndex < this.elementsNameFormulaArr.length) {
      ++this.elementIndex;
    }
  }
  getCurrentElementName() {
    const element = this.elementsNameFormulaArr[this.elementIndex];
    return element?.[1];
  }
  getCurrentElementFormula() {
    const element = this.elementsNameFormulaArr[this.elementIndex];
    return element?.[0];
  }
  isListFinished() {
    return this.elementIndex == this.elementsNameFormulaArr.length;
  }
}
const elementsList = new ElementsList(
  Object.entries(quizTitle.innerText.toLowerCase() == "alkanes" ? alkanes : radicals)
);

quizInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const userFormula = quizInput.value;
    clearInput();
    console.log(elementsList.getCurrentElementName(), elementsList.getCurrentElementFormula());
    if (userFormula.toLowerCase() == elementsList.getCurrentElementFormula().toLowerCase()) {
      moveToNextQuestion();
    }
  }
});

skipButton.addEventListener("click", () => {
  displayElementFormula();
  console.log("hi");
});
function clearInput() {
  quizInput.value = "";
}
(function () {
  displayElementName();
})();
function moveToNextQuestion() {
  elementsList.moveToNextElement();
  displayElementName();
  if (elementsList.isListFinished()) {
    quizInput.style.display = "none";
  } else {
    hideElementFormula();
  }
}
function displayElementName() {
  const elementName = elementsList.getCurrentElementName();
  if (elementName) {
    elementNameContainer.innerText = elementName;
    return;
  }
  elementNameContainer.innerText = "👍";
  elementNameContainer.style.fontSize = "60px";
  elementNameContainer.style.color = "white";
}
function displayElementFormula() {
  const elementFormula = elementsList.getCurrentElementFormula();
  elementFormulaContainer.innerText = elementFormula ?? "nope";
  elementFormulaContainer.classList.remove("quiz__element-formula-container--hidden");
}
function hideElementFormula() {
  elementFormulaContainer.classList.add("quiz__element-formula-container--hidden");
}
