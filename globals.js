/* eslint-disable no-unused-vars */
/**
 * Global variables for the video poker project
 */

/**
 * Create HTML elements
 */
const headBoard = document.querySelector('.headBoard');
let tableElement;
let cardContainer;
let walletElement;
const messageEl = document.querySelector('.bannerMessage');
let buttonBet;
let buttonDeal;

/**
 * Global variables for game function
 */
// player wallet starts at 100
let playerWallet = 100; // eslint-disable-line
let betAmount = 0; // eslint-disable-line
let dealFlag = 0; // eslint-disable-line
let shuffledDeck ; // eslint-disable-line
let currentID = ''; // eslint-disable-line
const playerHand = [];
// array to check if card is selected
let selectedIndex = [false, false, false, false, false]; // eslint-disable-line
// array to populate score table
const refScoreTable = [['None', 0], ['Jacks or Better', 1], ['Two Pairs', 2], ['Three of a Kind', 3], ['Straight', 4], ['Flush', 6], ['Full House', 9], ['Four of a Kind', 25], ['Straight Flush', 50], ['Royal Flush', 800]];
// object for highlighting table
const refScoreObject = {
  // eslint-disable-next-line max-len
  None: 0, JacksorBetter: 1, TwoPairs: 2, ThreeofaKind: 3, Straight: 4, Flush: 6, FullHouse: 9, FourofaKind: 25, StraightFlush: 50, RoyalFlush: 800,
};
