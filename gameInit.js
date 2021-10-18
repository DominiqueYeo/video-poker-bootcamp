/* eslint-disable no-undef */
/**
 * Function to initialise game elements
 */
const initGame = () => {
  buttonBet = document.createElement('button');
  buttonBet.classList.add('buttons');
  buttonBet.id = 'buttonBet';
  buttonBet.innerText = 'Bet';
  buttonDeal = document.createElement('button');
  buttonDeal.classList.add('buttons');
  buttonDeal.id = 'buttonDeal';
  buttonDeal.innerText = 'Deal';
  const buttonContainer = document.querySelector('.buttonContainer');
  walletElement = document.createElement('p');
  walletElement.id = 'wallet';
  walletElement.innerText = playerWallet;
  buttonContainer.appendChild(buttonBet);
  buttonContainer.appendChild(walletElement);
  buttonContainer.appendChild(buttonDeal);
  messageEl.innerText = 'PLACE BET AND DEAL';

  buttonBet.addEventListener('click', betIncrement);

  shuffledDeck = shuffleCards(makeDeck());
  buttonDeal.addEventListener('click', () => dealCards(shuffledDeck));
};

initGame();
