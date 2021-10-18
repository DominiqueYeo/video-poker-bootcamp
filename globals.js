// Global variables for the video poker project

// Create the element for the headboard
const headBoard = document.querySelector('.headBoard');

// Create the element for the table
let tableElement;

// Create the element for the card container
let cardContainer;
let walletElement;
const messageEl = document.querySelector('.bannerMessage');

// player wallet starts at 100
let playerWallet = 100; // eslint-disable-line
let betAmount = 0; // eslint-disable-line
let dealFlag = 0; // eslint-disable-line
let shuffledDeck ; // eslint-disable-line

// create elements for two buttons
let buttonBet;
let buttonDeal;

// create array to hold player hand
// const playerHand = [{
//   name: 'queen',
//   rank: 12,
//   suit: 'heart',
// }, {
//   name: 'Ace',
//   rank: 14,
//   suit: 'heart',
// }, {
//   name: '10',
//   rank: 10,
//   suit: 'heart',
// }, {
//   name: 'jack',
//   rank: 11,
//   suit: 'heart',
// }, {
//   name: 'king',
//   rank: 13,
//   suit: 'heart',
// }];
const playerHand = [];
let selectedIndex = [false, false, false, false, false]; // eslint-disable-line

const refScoreTable = [['None', 0], ['Jacks or Better', 1], ['Two Pairs', 2], ['Three of a Kind', 3], ['Straight', 4], ['Flush', 6], ['Full House', 9], ['Four of a Kind', 25], ['Straight Flush', 50], ['Royal Flush', 800]];

const refScoreObject = {
  None: 0, JacksorBetter: 1, TwoPairs: 2, ThreeofaKind: 3, Straight: 4, Flush: 6, FullHouse: 9, FourofaKind: 25, StraightFlush: 50, RoyalFlush: 800,
};

let currentID = ''; // eslint-disable-line
