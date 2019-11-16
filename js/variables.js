const cardsArray = [
    {cardId: "first-diamond", cardClass: "fa fa-diamond"},
    {cardId: "second-diamond", cardClass: "fa fa-diamond"},
    {cardId: "first-plane", cardClass: "fa fa-paper-plane-o"},
    {cardId: "second-plane", cardClass: "fa fa-paper-plane-o"},
    {cardId: "first-anchor", cardClass: "fa fa-anchor"},
    {cardId: "second-anchor", cardClass: "fa fa-anchor"},
    {cardId: "first-bolt", cardClass: "fa fa-bolt"},
    {cardId: "second-bolt", cardClass: "fa fa-bolt"},
    {cardId: "first-cube", cardClass: "fa fa-cube"},
    {cardId: "second-cube", cardClass: "fa fa-cube"},
    {cardId: "first-leaf", cardClass: "fa fa-leaf"},
    {cardId: "second-leaf", cardClass: "fa fa-leaf"},
    {cardId: "first-bicycle", cardClass: "fa fa-bicycle"},
    {cardId: "second-bicycle", cardClass: "fa fa-bicycle"},
    {cardId: "first-bomb", cardClass: "fa fa-bomb"},
    {cardId: "second-bomb", cardClass: "fa fa-bomb"}
];


let openedCards = [];

let movements = 0;

let stars = 5;

let allMatchedCards = [];

const deckUl = document.querySelector(".deck");

const moveSpan = document.querySelector(".moves");

const starsUl = document.querySelector(".stars");

const timerSpan = document.querySelector(".timer");

const resetDiv = document.querySelector(".restart");