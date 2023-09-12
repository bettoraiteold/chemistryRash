const elementNameContainer = document.getElementById("element-name-container");
const elementFormulaContainer = document.getElementById("element-formula-container");
const quizInput = document.getElementById("quiz-input");
const skipButton = document.getElementById("quiz-skip-btn");
const replayButton = document.getElementById("quiz-replay-btn");
const submitAnswerButton = document.getElementById("quiz-submit-answer-btn");
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
  CH3: "Метил",
  C2H5: "Этил",
  C3H7: "Пропил",
  C4H9: "Бутил",
  C5H11: "Пентил",
  C6H13: "Гексил",
  C7H15: "Гептил",
  C8H17: "Октил",
  C9H19: "Нонил",
  C10H21: "Декил",
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
  resetList() {
    this.elementIndex = 0;
  }
}
const elementsList = new ElementsList(
  Object.entries(quizTitle.innerText.toLowerCase() == "alkanes" ? alkanes : radicals)
);

quizInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});
function checkAnswer() {
  const userFormula = quizInput.value; // Getting the user input
  clearInput();
  // Getting the formula of the current element to check if user's right.
  if (userFormula.toLowerCase() == elementsList.getCurrentElementFormula().toLowerCase()) {
    moveToNextQuestion();
  }
}

function init() {
  displayElementName();
  elementsList.resetList();
  displayElementName();
  quizInput.disabled = false;
}
init();

submitAnswerButton.addEventListener("click", () => {
  checkAnswer();
});
skipButton.addEventListener("click", () => {
  displayElementFormula();
});
replayButton.addEventListener("click", () => {
  init();
});
function clearInput() {
  quizInput.value = "";
}

function moveToNextQuestion() {
  elementsList.moveToNextElement();
  displayElementName();
  if (elementsList.isListFinished()) {
    quizInput.disabled = true;
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
  // elementNameContainer.style.fontSize = "60px";
  // elementNameContainer.style.color = "white";
}
function displayElementFormula() {
  const elementFormula = elementsList.getCurrentElementFormula();
  elementFormulaContainer.innerText = elementFormula ?? "nope";
  elementFormulaContainer.classList.remove("quiz__element-formula-container--hidden");
}
function hideElementFormula() {
  elementFormulaContainer.classList.add("quiz__element-formula-container--hidden");
}
