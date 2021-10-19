/* eslint-disable no-undef */
/**
 * A function that gives a random index given a maximum number
 * @param {number} max {number} that limits the maximum index to be generated
 * @returns {number} a random number between 0 and max-1
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * a function that shuffles an array of cards
 * @param {array} cards array to be shuffled
 * @returns {array} shuffled array
 */
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

/**
 * a function to create a standard deck of cards
 * @returns {array} deck of cards
 */
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitsSymbol = ['♥️', '♦️', '♣️', '♠️'];
  const suitsColour = ['red', 'red', 'black', 'black'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitsSymbol[suitIndex];
    const currentColour = suitsColour[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 2; rankCounter <= 14; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let display = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '14') {
        cardName = 'ace';
        display = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        display = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        display = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        display = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitsSymbol: currentSymbol,
        colour: currentColour,
        displayName: display,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

/**
 * Function to create the card element according to the card object
 * @param {object} cardInfo card object that contains information about card
 * @returns card element
 */
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitsSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

/**
 * To change the selectedIndex value based on if the card is selected
 * @param {html node} selectedCard the selected card's node
 * @param {number} cardIndex the index of the card selected
 */
const cardSelect = (selectedCard, cardIndex) => {
  if (selectedIndex[cardIndex] === false) {
    selectedCard.classList.add('select');
    selectedIndex[cardIndex] = true;
  } else {
    selectedCard.classList.remove('select');
    selectedIndex[cardIndex] = false;
  }
  console.log(selectedIndex);
  calculateProbability(shuffledDeck);
};

/**
 * To change the player's card based on the boolean value in selectedIndex
 * @param {array} deck array of objects containing card information
 */
const swapCard = (deck) => {
  for (let i = 0; i < playerHand.length; i += 1) {
    if (selectedIndex[i] === true) {
      playerHand[i] = deck.pop();
    }
  }
};

/**
 * To clear a html node of all of its child nodes
 * @param {html node} container
 */
const clearCont = (container) => {
  const eleCount = container.childElementCount;
  for (let j = 0; j < eleCount; j += 1) {
    container.childNodes[0].remove();
  }
};

/**
 * function that runs when the deal button is clicked
 * checks the state of the dealFlag and runs in 3 states, deal first hand,
 * swap selected cards if any and end round to calculate winnings or loss
 * @param {array} deck array of objects containing card information
 */
const dealCards = (deck) => {
  const cardContainer = document.querySelector('.cardContainer');
  if (dealFlag === 0 && betAmount != 0) {
    messageEl.innerText = 'SELECT CARD TO SWAP';
    playSound('#shuffle');
    createScoreTable();
    clearCont(cardContainer);
    for (let i = 0; i < 5; i += 1) {
      const currentCard = deck.pop();
      playerHand.push(currentCard);
      const cardElement = createCard(currentCard);
      cardElement.classList.add('card');
      cardElement.classList.add('flipInY');
      cardElement.id = `card${i}`;
      cardElement.addEventListener('click', (event) => cardSelect(event.currentTarget, i));
      cardContainer.appendChild(cardElement);
      dealFlag = 1;
      buttonDeal.innerText = 'Swap';
    }
    highlightCurrentHand();
    calculateProbability(shuffledDeck);
  } else if (dealFlag === 1) {
    // clearCont(cardContainer);
    swapCard(shuffledDeck);
    for (let i = 0; i < 5; i += 1) {
      const currentCard = playerHand[i];
      const cardElement = createCard(currentCard);
      cardElement.classList.add('card');
      cardElement.classList.remove('flipInY');
      cardElement.id = `card${i}`;
      if (selectedIndex[i] === true) {
        playSound('#flip');
        cardElement.classList.add('fadeInDown');
      }
      cardContainer.replaceChild(cardElement, cardContainer.childNodes[i]);
    }
    buttonDeal.innerText = 'End';
    messageEl.innerText = 'PRESS END TO END ROUND';
    highlightCurrentHand();
    dealFlag = 2;
  } else if (dealFlag === 2) {
    let winMultiplier = -1;
    if (handChecker(playerHand)) {
      winMultiplier = handChecker(playerHand);
      playSound('#win');
      messageEl.innerText = 'WIN';
    } else {
      messageEl.innerText = 'TRY AGAIN';
      playSound('#lose');
    }
    highlightCurrentHand();
    const winAmount = betAmount * winMultiplier;
    playerWallet += winAmount;
    walletElement.innerText = playerWallet;
    playerHand.length = 0;
    selectedIndex = [false, false, false, false, false];
    buttonDeal.innerText = 'Deal';
    dealFlag = 0;
    shuffledDeck = shuffleCards(makeDeck());
  }
};

/**
 * function to increment bet amount
 */
const betIncrement = () => {
  if (dealFlag === 0) {
    betAmount += 1;
    betAmount = betAmount > 5 ? 1 : betAmount;
    buttonBet.innerText = `Bet: ${betAmount}`;
    playSound('#coins');
  }
};
