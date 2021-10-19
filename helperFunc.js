/* eslint-disable no-undef */

/**
 * Function to generate the possible score table according to bet amount
 */
const createScoreTable = () => {
  const table = document.createElement('table');
  table.classList.add('scoreTable');
  const header = table.createTHead();
  const hRow = header.insertRow(0);
  const cell0 = hRow.insertCell(0);
  const cell1 = hRow.insertCell(0);
  const cell2 = hRow.insertCell(0);
  cell0.innerText = 'Probability';
  cell2.innerText = 'Hand';
  cell1.innerHTML = 'Score';
  const tableBody = table.createTBody();
  for (let i = 0; i < refScoreTable.length; i += 1) {
    const bRow = tableBody.insertRow(0);
    bRow.id = refScoreTable[i][0].replace(/ /g, '');
    const cellProb = bRow.insertCell(0);
    cellProb.id = `${refScoreTable[i][0].replace(/ /g, '')}Prob`;
    const cellScore = bRow.insertCell(0);
    const cellHand = bRow.insertCell(0);
    cellScore.innerText = refScoreTable[i][1] * betAmount;
    cellHand.innerText = refScoreTable[i][0];
    cellProb.innerText = 0;
  }
  headBoard.replaceChild(table, headBoard.childNodes[1]);
};

/**
 * helper function to play sound on demand
 * @param {string} sound ID of the sound to play
 */
const playSound = (sound) => {
  const currentSound = document.querySelector(sound);
  currentSound.preload = 'auto';
  currentSound.load();
  currentSound.play();
};

/**
 * Function to highlight the combo of the player's hand on the score table
 */
const highlightCurrentHand = () => {
  if (!handChecker(playerHand)) {
    if (currentID != '') {
      currentID.classList.remove('highlightRed');
      currentID.classList.remove('highlightGreen');
    }
    const refID = getKeyByValue(refScoreObject, 0);
    currentID = document.querySelector(`#${refID}`);
    currentID.classList.add('highlightRed');
  }
  if (handChecker(playerHand)) {
    if (currentID != '') {
      currentID.classList.remove('highlightRed');
      currentID.classList.remove('highlightGreen');
    }
    const refID = getKeyByValue(refScoreObject, handChecker(playerHand));
    currentID = document.querySelector(`#${refID}`);
    currentID.classList.add('highlightGreen');
  }
};
