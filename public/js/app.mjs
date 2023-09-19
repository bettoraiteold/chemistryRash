import { chemicalElementsListToSubarrays } from "./elementListConversion.mjs";
const quizNavbarTitle = document.getElementById("navbar-title");
const quizTitle = document.getElementById("quiz-title");
const chemicalElementsList = document.getElementById("chemical-elements-list");
const elementNameContainer = document.getElementById("element-name-container");
const elementFormulaContainer = document.getElementById("element-formula-container");
const quizInput = document.getElementById("quiz-input");
const skipButton = document.getElementById("quiz-skip-btn");
const replayButton = document.getElementById("quiz-replay-btn");
const quizOptionsMenuReplayButton = document.getElementById("quiz-options-menu-replay-btn");
const submitAnswerButton = document.getElementById("quiz-submit-answer-btn");
const optionsMenuToggleButtons = document.querySelectorAll(".quiz__options-menu-toggle-btn");
const quizOptionsMenu = document.getElementById("quiz-options-menu");
const randomModeToggle = document.getElementById("quiz-random-mode-checkbox");
const swapFormulaNameButton = document.getElementById("quiz-swap-formula-name-btn");

quizNavbarTitle.innerText = document.getElementById("quiz-name").innerText;
quizTitle.innerText = document.getElementById("quiz-name-en").innerText;
class List {
  constructor(elementsNameFormulaArr) {
    this.elementsNameFormulaArr = elementsNameFormulaArr;
    this.elementIndex = 0;
    this.usedElementIndexes = new Set();
    this.usedElementIndexes.add(this.elementIndex);
  }
  listToNextChemicalElement() {
    if (this.elementIndex < this.elementsNameFormulaArr.length) {
      ++this.elementIndex;
      this.usedElementIndexes.add(this.elementIndex);
    }
  }
  listToRandomChemicalElement() {
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
      return true;
    }
  }
  getChemicalElementName() {
    const element = this.elementsNameFormulaArr[this.elementIndex];
    return element?.[1];
  }
  getChemicalElementFormula() {
    const element = this.elementsNameFormulaArr[this.elementIndex];
    return element?.[0];
  }
  isListFinished() {
    return this.elementIndex == this.elementsNameFormulaArr.length;
  }
  resetList() {
    this.elementIndex = 0;
    this.usedElementIndexes.clear();
    if (randomModeToggle.checked) {
      this.listToRandomChemicalElement();
      return;
    }
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
// Creating a chemical elements list
const list = new List(chemicalElementsListToSubarrays(chemicalElementsList.innerHTML));

// Initializing
init();
function init() {
  list.resetList();
  displayChemicalElementName();
  hideChemicalElementFormula();
  quizInput.disabled = false;
}

function displayChemicalElementName() {
  const elementName = list.getChemicalElementName();
  if (elementName) {
    elementNameContainer.innerText = elementName;
    return;
  }
  elementNameContainer.innerText = "👍";
}
function displayChemicalElementFormula() {
  const chemicalElementFormula = list.getChemicalElementFormula();
  elementFormulaContainer.innerText = chemicalElementFormula ?? "Конец.";
  elementFormulaContainer.classList.toggle("quiz__element-formula-container--hidden");
}
function hideChemicalElementFormula() {
  elementFormulaContainer.classList.add("quiz__element-formula-container--hidden");
}

quizInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});
function clearInput() {
  quizInput.value = "";
}
function checkAnswer() {
  const userAnswer = quizInput.value.toLowerCase().trim();
  clearInput();
  const chemicalElementFormula = list.getChemicalElementFormula().toLowerCase();
  if (userAnswer == chemicalElementFormula) {
    moveToNextQuestion();
  }
}
function moveToNextQuestion() {
  if (randomModeToggle.checked) {
    if (!list.listToRandomChemicalElement()) {
      replay();
    }
  } else {
    list.listToNextChemicalElement();
  }
  hideChemicalElementFormula();
  displayChemicalElementName();
  if (list.isListFinished()) {
    replay();
  }
}
function replay() {
  quizInput.disabled = true;
  list.elementIndex = list.elementsNameFormulaArr.length;
  displayChemicalElementName();
  replayButton.classList.remove("quiz__replay-btn--hidden");
}
submitAnswerButton.addEventListener("click", () => {
  checkAnswer();
});
skipButton.addEventListener("click", () => {
  displayChemicalElementFormula();
});
replayButton.addEventListener("click", () => {
  init();

  replayButton.classList.add("quiz__replay-btn--hidden");
});
quizOptionsMenuReplayButton.addEventListener("click", () => {
  init();
  replayButton.classList.add("quiz__replay-btn--hidden");
  quizOptionsMenuReplayButton.classList.toggle("quiz__options-menu-replay-btn--active");
});
swapFormulaNameButton.addEventListener("click", () => {
  const placeholder = quizInput.placeholder;
  quizInput.placeholder =
    placeholder == "впишите имя элемента" ? "впишите формулу" : "впишите имя элемента";

  list.swapFormulaName();
  displayChemicalElementName();
  swapFormulaNameButton.classList.toggle("quiz__options-menu-btn--active");
});
optionsMenuToggleButtons.forEach((menuToggleButton) => {
  menuToggleButton.addEventListener("click", () => {
    quizOptionsMenu.classList.toggle("quiz__options-menu--hidden");
  });
});
