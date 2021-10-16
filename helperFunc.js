const prepCheck = () => {
  const arrangedHand = JSON.parse(JSON.stringify(playerHand));
  arrangedHand.sort((a, b) => ((a.rank - b.rank)));
  return arrangedHand;
};

const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

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

const findPairRank = () => {
  const cardRankTally = {};
  fillRankTally(cardRankTally);
  if (cardRankTally['11'] === 2 || cardRankTally['12'] === 2 || cardRankTally['13'] === 2 || cardRankTally['14'] === 2) {
    return true;
  }
  return false;
};

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

const checkRoyalFlush = () => {
  const cardRankTally = {};
  fillRankTally(cardRankTally);
  const rankArray = Object.keys(cardRankTally);
  if (rankArray[0] == 10) {
    return true;
  }
  return false;
};

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

const checkTwoPairs = () => {
  const numPairs = checkNumOfPairs();
  if (numPairs === 2) {
    return 2;
  }
  return false;
};

const checkThreeOfAKind = () => {
  if (checkThree() === true && checkNumOfPairs() === 0) {
    return 3;
  }
  return false;
};

const checkFullHouse = () => {
  if (checkThree() === true && checkNumOfPairs() === 1) {
    return 9;
  }
  return false;
};

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

const checkStraightOrRoyalFlush = () => {
  if (checkStraight() === true && checkFlush() === true && checkRoyalFlush() === false) {
    return 50;
  }
  if (checkStraight() === true && checkFlush() === true && checkRoyalFlush() === true) {
    return 800;
  }
  return false;
};

const handStraight = () => {
  if (checkStraight() === true && checkFlush() === false) {
    return 4;
  }
  return false;
};

const handFlush = () => {
  if (checkFlush() === true && checkStraight() === false) {
    return 6;
  }
  return false;
};

const handChecker = () => checkJacksBetter() || checkTwoPairs() || checkThreeOfAKind() || handStraight() || handFlush() || checkFullHouse() || checkFourOfAKind() || checkStraightOrRoyalFlush(); // eslint-disable-line

const createScoreTable = () => {
  //
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

const playSound = (sound) => {
  const currentSound = document.querySelector(sound);
  currentSound.preload = 'auto';
  currentSound.load();
  currentSound.play();
};

const highlightCurrentHand = () => {
  if (!handChecker()) {
    if (currentID != '') {
      currentID.classList.remove('highlight');
    }
    const refID = getKeyByValue(refScoreObject, 0);
    currentID = document.querySelector(`#${refID}`);
    currentID.classList.add('highlight');
  }
  if (handChecker()) {
    if (currentID != '') {
      currentID.classList.remove('highlight');
    }
    const refID = getKeyByValue(refScoreObject, handChecker());
    currentID = document.querySelector(`#${refID}`);
    currentID.classList.add('highlight');
  }
};
