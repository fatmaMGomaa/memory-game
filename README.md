# Memory Game Project

## Table of Contents

* [How the Game Works](#How-the-Game-Works)
* [Technologies](#Technologies)
* [Main Functions](#Main-Functions)
* [code](#code)

## How-the-Game-Works

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match.

Each turn:

* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.
* The game ends once all cards have been correctly matched.


## Technologies
I used HTML, CSS, ES6, Google Fonds, Animate-CSS library which uses JQuery.


## Main-Functions

* generateCards: this function shuffle all cards and then render them to the screen
* openCard: show the card and check if there is another card is opend, then compare the two card
  and find if they are matched or not and check if all cards are matched to show the win modal, besides counting the number of moves which will reflect to stars rate
* resetGame: set all variables to their intial values and rerender the cards


## code

* All global variables exist in js folder in variables.js
* all functions exist in js folder in functions.js
* In app.js inside js folder, I used the main functions with events