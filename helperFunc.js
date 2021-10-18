/* eslint-disable no-undef */
/**
 * Function to get a key given the object and value
 * @param {object} object the object to be passed in
 * @param {*} value the value to be passed in
 * @returns
 */

const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

/**
 * Function to fill a object with a tally of card names from playerHand
 * @param {object} cardNameTally
 */
const fillNameTally = (cardNameTally) => {
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardName = playerHand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    } else {
      cardNameTally[cardName] = 1;
    }
  }
};

/**
 * Function to fill a object with a tally of card ranks from playerHand
 * @param {object} cardRankTally
 */
const fillRankTally = (cardRankTally) => {
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardRank = playerHand[i].rank;
    // If we have seen the card name before, increment its count
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    } else {
      cardRankTally[cardRank] = 1;
    }
  }
};

/**
 * Function to fill a object with a tally of card suit from playerHand
 * @param {object} cardSuitTally
 */
const fillSuitTally = (cardSuitTally) => {
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardRank = playerHand[i].suit;
    // If we have seen the card name before, increment its count
    if (cardRank in cardSuitTally) {
      cardSuitTally[cardRank] += 1;
    } else {
      cardSuitTally[cardRank] = 1;
    }
  }
};

// const fillTally = (cardTally,modifier) => {
//   for (let i = 0; i < playerHand.length; i += 1) {
//     const card = playerHand[i].modifier;
//     // If we have seen the card name before, increment its count
//     if (card in cardTally) {
//       cardTally[card] += 1;
//     } else {
//       cardTally[card] = 1;
//     }
//   }
// }

/**
 * Function to check the number of pairs in the player's hand
 * @returns number of pairs found in the tally
 */
const checkNumOfPairs = () => {
  const cardNameTally = {};
  fillNameTally(cardNameTally);
  let numPairs = 0;
  const valuesArray = Object.values(cardNameTally);
  valuesArray.forEach((value) => {
    if (value === 2) {
      numPairs += 1;
    }
  });
  return numPairs;
};

/**
 * To check if three cards of the same number is found in the player's hand
 * @returns true if three cards of the same name is found, if not , false
 */
const checkThree = () => {
  const cardNameTally = {};
  fillNameTally(cardNameTally);
  let threeFound = false;
  const valuesArray = Object.values(cardNameTally);
  valuesArray.forEach((value) => {
    if (value === 3) {
      threeFound = true;
    }
  });
  if (threeFound === true) {
    return true;
  }
  return false;
};

/**
 * To check if there are pair found ranked Jack and above
 * @returns true if card rank is 11,12,13 or 14. Else false
 */
const findPairRank = () => {
  const cardRankTally = {};
  fillRankTally(cardRankTally);
  if (cardRankTally['11'] === 2 || cardRankTally['12'] === 2 || cardRankTally['13'] === 2 || cardRankTally['14'] === 2) {
    return true;
  }
  return false;
};

/**
 * To check for straights in the player's hand
 * @returns true if 5 consecutive card ranks are found in the tally. else false
 */
const checkStraight = () => {
  const cardRankTally = {};
  fillRankTally(cardRankTally);
  const rankArray = Object.keys(cardRankTally);
  const rankArrayInt = rankArray.map((x) => parseInt(x, 10));
  for (let i = 1; i < rankArrayInt.length; i += 1) {
    if (rankArrayInt[i] !== rankArrayInt[0] + i) {
      break;
    }
    if (i === rankArrayInt.length - 1) {
      return true;
    }
  }
  return false;
};

/**
 * Check for flush in player's hands
 * @returns true if a suit's count in the tally is equals to 5. Else false
 */
const checkFlush = () => {
  const cardSuitTally = {};
  fillSuitTally(cardSuitTally);
  let flushFound = false;
  const valuesArray = Object.values(cardSuitTally);
  valuesArray.forEach((value) => {
    if (value === 5) {
      flushFound = true;
    }
  });
  if (flushFound === true) {
    return true;
  }
  return false;
};

/**
 * To check for royal flush. This will be done together with the straight check and check
 * if the tally starts with a 10.
 * @returns true if the rank tally starts with a 10
 */
const checkRoyalFlush = () => {
  const cardRankTally = {};
  fillRankTally(cardRankTally);
  const rankArray = Object.keys(cardRankTally);
  if (rankArray[0] == 10) {
    return true;
  }
  return false;
};

/**
 * To check if there is Jacks or Better in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const checkJacksBetter = () => {
  const numPairs = checkNumOfPairs();
  if (numPairs === 1 && findPairRank() === true) {
    // const cardRankTally = {};
    // fillRankTally(cardRankTally);
    // return getKeyByValue(cardRankTally, 2);
    return 1;
  }
  return false;
};

/**
 * To check if there is Two Pairs in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const checkTwoPairs = () => {
  const numPairs = checkNumOfPairs();
  if (numPairs === 2) {
    return 2;
  }
  return false;
};

/**
 * To check if there is Three Of A Kind in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const checkThreeOfAKind = () => {
  if (checkThree() === true && checkNumOfPairs() === 0) {
    return 3;
  }
  return false;
};

/**
 * To check if there is Full House in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const checkFullHouse = () => {
  if (checkThree() === true && checkNumOfPairs() === 1) {
    return 9;
  }
  return false;
};

/**
 * To check if there is Four Of A Kind in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const checkFourOfAKind = () => {
  const cardNameTally = {};
  fillNameTally(cardNameTally);
  let fourFound = false;
  const valuesArray = Object.values(cardNameTally);
  valuesArray.forEach((value) => {
    if (value === 4) {
      fourFound = true;
    }
  });
  if (fourFound === true) {
    return 25;
  }
  return false;
};

/**
 * To check if there is Straight Flush or Royal Flush in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const checkStraightOrRoyalFlush = () => {
  if (checkStraight() === true && checkFlush() === true && checkRoyalFlush() === false) {
    return 50;
  }
  if (checkStraight() === true && checkFlush() === true && checkRoyalFlush() === true) {
    return 800;
  }
  return false;
};

/**
 * To check if there is Straight in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const handStraight = () => {
  if (checkStraight() === true && checkFlush() === false) {
    return 4;
  }
  return false;
};

/**
 * To check if there is Flush in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const handFlush = () => {
  if (checkFlush() === true && checkStraight() === false) {
    return 6;
  }
  return false;
};

/**
 * Check player's hand for all combinations of wins and return multiplier if exist
 * @returns multiplier of combo found.Else false
 */
const handChecker = () => checkJacksBetter() || checkTwoPairs() || checkThreeOfAKind() || handStraight() || handFlush() || checkFullHouse() || checkFourOfAKind() || checkStraightOrRoyalFlush(); // eslint-disable-line

/**
 * Function to generate the possible score table according to bet amount
 */
const createScoreTable = () => {
  const table = document.createElement('table');
  table.classList.add('scoreTable');
  const header = table.createTHead();
  const hRow = header.insertRow(0);
  const cell1 = hRow.insertCell(0);
  const cell2 = hRow.insertCell(0);
  cell2.innerText = 'Hand';
  cell1.innerHTML = 'Score';
  const tableBody = table.createTBody();
  for (let i = 0; i < refScoreTable.length; i += 1) {
    const bRow = tableBody.insertRow(0);
    bRow.id = refScoreTable[i][0].replace(/ /g, '');
    const cellScore = bRow.insertCell(0);
    const cellHand = bRow.insertCell(0);
    cellScore.innerText = refScoreTable[i][1] * betAmount;
    cellHand.innerText = refScoreTable[i][0];
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
  if (!handChecker()) {
    if (currentID != '') {
      currentID.classList.remove('highlightRed');
      currentID.classList.remove('highlightGreen');
    }
    const refID = getKeyByValue(refScoreObject, 0);
    currentID = document.querySelector(`#${refID}`);
    currentID.classList.add('highlightRed');
  }
  if (handChecker()) {
    if (currentID != '') {
      currentID.classList.remove('highlightRed');
      currentID.classList.remove('highlightGreen');
    }
    const refID = getKeyByValue(refScoreObject, handChecker());
    currentID = document.querySelector(`#${refID}`);
    currentID.classList.add('highlightGreen');
  }
};
