import { chemicalElementsListToSubarrays } from "./elementListConversion.mjs";

const chemicalElementsList = document.getElementById("chemical-elements-list");
const elementNameContainer = document.getElementById("element-name-container");
const elementFormulaContainer = document.getElementById("element-formula-container");
const quizInput = document.getElementById("quiz-input");
const skipButton = document.getElementById("quiz-skip-btn");
const replayButton = document.getElementById("quiz-replay-btn");
const quizOptionsMenuReplayButton = document.getElementById("quiz-options-menu-replay-btn");
const submitAnswerButton = document.getElementById("quiz-submit-answer-btn");
const quizTitle = document.getElementById("quiz-title");
const optionsMenuToggleButtons = document.querySelectorAll(".quiz__options-menu-toggle-btn");
const quizOptionsMenu = document.getElementById("quiz-options-menu");
const randomModeToggle = document.getElementById("quiz-random-mode-checkbox");
const swapFormulaNameButton = document.getElementById("quiz-swap-formula-name-btn");
class ElementsList {
  constructor(elementsNameFormulaArr) {
    // Creating an array of arrays that contains element name/formula from alkanes/radicals object
    this.elementsNameFormulaArr = elementsNameFormulaArr;
    this.elementIndex = 0;
    this.usedElementIndexes = new Set();
    this.usedElementIndexes.add(this.elementIndex);
  }
  moveToNextElement() {
    if (this.elementIndex < this.elementsNameFormulaArr.length) {
      ++this.elementIndex;
      this.usedElementIndexes.add(this.elementIndex);
    }
  }
  moveToRandomElement() {
    const maxRange = this.elementsNameFormulaArr.length;
    if (this.usedElementIndexes.size === this.elementsNameFormulaArr.length) {
      return null;
    }
    while (true) {
      const randIndex = Math.floor(Math.random() * maxRange);
      if (this.usedElementIndexes.has(randIndex)) {
        continue;
      }
      this.usedElementIndexes.add(randIndex);
      this.elementIndex = randIndex;
      break;
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
    this.usedElementIndexes.clear();
    this.usedElementIndexes.add(this.elementIndex);
  }
  swapFormulaName() {
    this.elementsNameFormulaArr.forEach((element) => {
      const swap = element[0];
      element[0] = element[1];
      element[1] = swap;
    });
  }
}
const elementsList = new ElementsList(
  chemicalElementsListToSubarrays(chemicalElementsList.innerHTML)
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
  if (userFormula.toLowerCase().trim() == elementsList.getCurrentElementFormula().toLowerCase()) {
    moveToNextQuestion();
  }
}

function init() {
  displayElementName();
  hideElementFormula();
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
  replayButton.classList.add("quiz__replay-btn--hidden");
});
quizOptionsMenuReplayButton.addEventListener("click", () => {
  init();
  quizOptionsMenuReplayButton.classList.toggle("quiz__options-menu-replay-btn--active");
});
swapFormulaNameButton.addEventListener("click", () => {
  elementsList.swapFormulaName();
  init();
  swapFormulaNameButton.classList.toggle("quiz__options-menu-btn--active");
});
optionsMenuToggleButtons.forEach((menuToggleButton) => {
  menuToggleButton.addEventListener("click", () => {
    quizOptionsMenu.classList.toggle("quiz__options-menu--hidden");
  });
});

function clearInput() {
  quizInput.value = "";
}

function moveToNextQuestion() {
  if (randomModeToggle.checked) {
    console.log("hi");
    elementsList.moveToRandomElement();
  } else {
    elementsList.moveToNextElement();
  }

  displayElementName();
  if (elementsList.isListFinished()) {
    quizInput.disabled = true;
    replayButton.classList.remove("quiz__replay-btn--hidden");
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
  elementFormulaContainer.classList.toggle("quiz__element-formula-container--hidden");
}
function hideElementFormula() {
  elementFormulaContainer.classList.add("quiz__element-formula-container--hidden");
}
