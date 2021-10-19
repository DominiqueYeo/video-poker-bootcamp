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
const fillNameTally = (cardNameTally, playerHand) => {
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
const fillRankTally = (cardRankTally, playerHand) => {
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
const fillSuitTally = (cardSuitTally, playerHand) => {
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

/**
 * Function to check the number of pairs in the player's hand
 * @returns number of pairs found in the tally
 */
const checkNumOfPairs = (hand) => {
  const cardNameTally = {};
  fillNameTally(cardNameTally, hand);
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
const checkThree = (hand) => {
  const cardNameTally = {};
  fillNameTally(cardNameTally, hand);
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
const findPairRank = (hand) => {
  const cardRankTally = {};
  fillRankTally(cardRankTally, hand);
  if (cardRankTally['11'] === 2 || cardRankTally['12'] === 2 || cardRankTally['13'] === 2 || cardRankTally['14'] === 2) {
    return true;
  }
  return false;
};

/**
 * To check for straights in the player's hand
 * @returns true if 5 consecutive card ranks are found in the tally. else false
 */
const checkStraight = (hand) => {
  const cardRankTally = {};
  fillRankTally(cardRankTally, hand);
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
const checkFlush = (hand) => {
  const cardSuitTally = {};
  fillSuitTally(cardSuitTally, hand);
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
const checkRoyalFlush = (hand) => {
  const cardRankTally = {};
  fillRankTally(cardRankTally, hand);
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
const checkJacksBetter = (hand) => {
  const numPairs = checkNumOfPairs(hand);
  if (numPairs === 1 && findPairRank(hand) === true) {
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
const checkTwoPairs = (hand) => {
  const numPairs = checkNumOfPairs(hand);
  if (numPairs === 2) {
    return 2;
  }
  return false;
};

/**
 * To check if there is Three Of A Kind in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const checkThreeOfAKind = (hand) => {
  if (checkThree(hand) === true && checkNumOfPairs(hand) === 0) {
    return 3;
  }
  return false;
};

/**
 * To check if there is Full House in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const checkFullHouse = (hand) => {
  if (checkThree(hand) === true && checkNumOfPairs(hand) === 1) {
    return 9;
  }
  return false;
};

/**
 * To check if there is Four Of A Kind in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const checkFourOfAKind = (hand) => {
  const cardNameTally = {};
  fillNameTally(cardNameTally, hand);
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
const checkStraightOrRoyalFlush = (hand) => {
  if (checkStraight(hand) === true && checkFlush(hand) === true && checkRoyalFlush(hand) === false) {
    return 50;
  }
  if (checkStraight(hand) === true && checkFlush(hand) === true && checkRoyalFlush(hand) === true) {
    return 800;
  }
  return false;
};

/**
 * To check if there is Straight in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const handStraight = (hand) => {
  if (checkStraight(hand) === true && checkFlush(hand) === false) {
    return 4;
  }
  return false;
};

/**
 * To check if there is Flush in player's hand
 * @returns multiplier of hand combo if true.else false
 */
const handFlush = (hand) => {
  if (checkFlush(hand) === true && checkStraight(hand) === false) {
    return 6;
  }
  return false;
};

/**
 * Check player's hand for all combinations of wins and return multiplier if exist
 * @param {array} hand array of player's card
 * @returns multiplier of combo found.Else false
 */
const handChecker = (hand) => checkJacksBetter(hand) || checkTwoPairs(hand) || checkThreeOfAKind(hand) || handStraight(hand) || handFlush(hand) || checkFullHouse(hand) || checkFourOfAKind(hand) || checkStraightOrRoyalFlush(hand); // eslint-disable-line

/**
 *  helper function to generate all k-sized sets of combinations given an initial set
 * of elements. Borrowed from https://gist.github.com/axelpale/3118596
 * @param {array} set array of elements to get combinations
 * @param {number} k  parameter to determine the size of sets of combinations
 * @returns
 */
const kCombinations = (set, k) => {
  let i; let j; let combs; let head; let
    tailcombs;

  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > set.length || k <= 0) {
    return [];
  }

  // K-sized set has only one K-sized subset.
  if (k === set.length) {
    return [set];
  }

  // There is N 1-sized subsets in a N-sized set.
  if (k === 1) {
    combs = [];
    for (i = 0; i < set.length; i += 1) {
      // console.log(set[i]);
      combs.push([set[i]]);
    }
    // console.log(combs);
    return combs;
  }

  // Assert {1 < k < set.length}

  // Algorithm description:
  // To get k-combinations of a set, we want to join each element
  // with all (k-1)-combinations of the other elements. The set of
  // these k-sized sets would be the desired result. However, as we
  // represent sets with lists, we need to take duplicates into
  // account. To avoid producing duplicates and also unnecessary
  // computing, we use the following approach: each element i
  // divides the list into three: the preceding elements, the
  // current element i, and the subsequent elements. For the first
  // element, the list of preceding elements is empty. For element i,
  // we compute the (k-1)-computations of the subsequent elements,
  // join each with the element i, and store the joined to the set of
  // computed k-combinations. We do not need to take the preceding
  // elements into account, because they have already been the i:th
  // element so they are already computed and stored. When the length
  // of the subsequent list drops below (k-1), we cannot find any
  // (k-1)-combs, hence the upper limit for the iteration:
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = kCombinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
};

/**
 * to count the number of selected cards for swapping
 * @returns number of true
 */
const calculateNumberOfTrue = () => {
  const counts = {};
  for (const trueFalse of selectedIndex) {
    counts[trueFalse] = counts[trueFalse] ? counts[trueFalse] + 1 : 1;
  }
  console.log(counts);
  if (counts.false == 5) {
    return 0;
  }
  return counts.true;
};

/**
 * to calculate the probability and generate the probability table on screen
 * @param {array} deck array of objects containing card info
 */
const calculateProbability = (deck) => {
  const holdingDeck = JSON.parse(JSON.stringify(deck));
  // eslint-disable-next-line prefer-const
  let holdingHand = JSON.parse(JSON.stringify(playerHand));
  const numberToSwap = calculateNumberOfTrue();
  const arrayOfHands = [];
  const handTally = {
    1: 0, 2: 0, 3: 0, 4: 0, 6: 0, 9: 0, 25: 0, 50: 0, 800: 0, false: 0,
  };
  if (numberToSwap === 0) {
    const handScore = handChecker(playerHand);

    if (handScore in handTally) {
      handTally[handScore] += 1;
    } else {
      handTally[handScore] = 1;
    }
  } else if (numberToSwap === 5 || numberToSwap === 4) {

  } else {
    const possibleCards = JSON.parse(JSON.stringify(kCombinations(holdingDeck, numberToSwap)));
    for (i = 0; i < possibleCards.length; i += 1) {
      const holdingSelectedIndex = [...selectedIndex];
      while (holdingSelectedIndex.indexOf(true) !== -1) {
        holdingHand[holdingSelectedIndex.indexOf(true)] = possibleCards[i].pop();
        holdingSelectedIndex[holdingSelectedIndex.indexOf(true)] = false;
      }
      arrayOfHands.push(JSON.parse(JSON.stringify(holdingHand)));
    }

    for (let j = 0; j < arrayOfHands.length; j += 1) {
      const handScore = handChecker(arrayOfHands[j]);
      // console.log('handscore', handScore);
      // If we have seen the score before, increment its count
      if (handScore in handTally) {
        handTally[handScore] += 1;
      } else {
        handTally[handScore] = 1;
      }
    }
  }

  console.log('handTally', handTally);
  fillProbTable(handTally, numberToSwap);
};

/**
 * To output the table in the screen
 * @param {object} tally tally of possible winning hands
 * @param {number} numCardSwapped number of cards to be swapped
 */
const fillProbTable = (tally, numCardSwapped) => {
  let refID;
  let probID;
  let probabilityHand = 0;
  const tallyKeys = Object.keys(tally);
  const tallyValues = Object.values(tally);
  const maxNumOfHands = {
    0: 1, 1: 47, 2: 1081, 3: 16218, 4: 178365,
  };
  if (numCardSwapped === 5 || numCardSwapped === 4) {
    for (let i = 0; i < tallyKeys.length - 1; i += 1) {
      refID = getKeyByValue(refScoreObject, parseInt(tallyKeys[i], 10));
      probID = document.querySelector(`#${refID}Prob`);
      probID.innerText = 'Good Luck';
    }
    refID = getKeyByValue(refScoreObject, 0);
    probID = document.querySelector(`#${refID}Prob`);
    probID.innerText = 'Good Luck';
  } else {
    for (let i = 0; i < tallyKeys.length - 1; i += 1) {
      refID = getKeyByValue(refScoreObject, parseInt(tallyKeys[i], 10));
      probID = document.querySelector(`#${refID}Prob`);
      probabilityHand = `${((tallyValues[i] * 100) / maxNumOfHands[numCardSwapped]).toFixed(2)}%`;
      probID.innerText = probabilityHand;
    }
    refID = getKeyByValue(refScoreObject, 0);
    probID = document.querySelector(`#${refID}Prob`);
    probabilityHand = `${((tallyValues[tallyKeys.length - 1] * 100) / maxNumOfHands[numCardSwapped]).toFixed(2)}%`;
    probID.innerText = probabilityHand;
  }
};
