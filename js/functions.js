// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// this function take an array and loop though it to render all game cards to screen beside player state (timer, moves, stars)
function generateCards(array) {
    let cardsHtml = "";
    array.map((card) => {
        cardsHtml += `<li class="card" id=${card.cardId}><i class="${card.cardClass}"></i></li>\n`;
    })
    deckUl.innerHTML = cardsHtml;
    moveSpan.textContent = movements;
    timer();
    setRateStars(stars, starsUl);
    savePlayerState();
} 

// this function to show the symbol of the card and increases movements by 1
function openCard(e) {
    const cardClasses = e.target.classList;
    if (cardClasses.contains("card") && allMatchedCards.length < 16 && !cardClasses.contains("match")) {
        cardClasses.add("open", "show");
        countMoves();
        openedCards.push(e.target);
        isMatched();
        handleWin();
    }
}

// if the seconed card didn't match the first in the openedCards array both hide their symbols
function closeCard() {
    // use setTimeout to let the user see the two cards before closing them
    setTimeout(() => {
        openedCards.forEach((card) => {
            card.classList.remove("open", "show", "animated", "shake", "wrong");
        })
        openedCards = [];
    }, 500);
}

// count each click the user do to the cards
function countMoves() {
    movements += 1;
    saveToLocalStorage("moves", movements);
    moveSpan.textContent = movements;
    if (movements % 16 === 0) {
        stars -= 1;
        setRateStars(stars, starsUl);
    }
}

/* 
render the number of stars to the screen it take the number 
and the parent of the stars in the dom tree as there are to places win panel and score panel
*/
function setRateStars(stars, starsPlace) {
    saveToLocalStorage("stars", stars);
    let starsHtml = "";

    for (let i=1 ; i<=stars ; i++){
        starsHtml += `<li><i class="fa fa-star"></i></li>\n`
    }

    starsPlace.innerHTML = starsHtml;
}

/*
    count each second the user spend until win the game or reset it
    I used the changeTime as a global variable to enable me to clearInterval
    when the player reset the game or win it
*/
function timer() {
    let minutes = 0;
    let seconds = 0;

    changeTime = setInterval(() => {
        seconds += 1;
        if (seconds % 60 === 0) {
            minutes += 1;
            seconds = 0;
        }
        // use slice(-2) copyright https://www.developerdrive.com/build-countdown-timer-pure-javascript/
        const timerFormula = `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
        saveToLocalStorage("gameTime", timerFormula);
        timerSpan.textContent = timerFormula;
        
    }, 1000)
}

// this function set all variables to their initial values and rerender the cards to the screen
function resetGame() {
    /* this is another solution to restart the game but it is not good for user experience
        location.reload();
    */
    closeWinModal()
    clearInterval(changeTime);
    allMatchedCards = [];
    openedCards = [];
    movements = 0;
    stars = 5;
    timerSpan.textContent = "00:00"
    generateCards(shuffle(cardsArray));
    savePlayerState()
}

// here we know that the two cards are matched so we change classes and push them to the allMatchedCards array
function handleMatchedCards() {
    openedCards.forEach((card) => {
        card.classList.remove("open", "show");
        card.classList.add("match", "animated", "rubberBand");
    })
    allMatchedCards = [...allMatchedCards, ...openedCards];
    openedCards = [];
}

// here we compare the two elements in the openedCards array to know they are matched or not
function isMatched() {
    // I made nested condition here and didn't use && operator because I didn't want to run else block in case the length is lower then 2
    if (openedCards.length === 2) {
        if (openedCards[0]["id"] !== openedCards[1]["id"] && openedCards[0]["id"].split("-")[1] === openedCards[1]["id"].split("-")[1]) {
            handleMatchedCards()
        } else {
            openedCards.forEach((card) => {
                card.classList.add("animated", "shake", "wrong");
            })
            closeCard()
        }
    }
}

// this show the win modal when the player can solve all cards 
function handleWin() {
    if (allMatchedCards.length === 16) {
        clearInterval(changeTime);
        winSection.style.display = "block";
        document.querySelector(".win-moves").textContent = getLocalStorageItem("moves");
        document.querySelector(".win-timer").textContent = `${getLocalStorageItem("gameTime")} duration`;
        const winRate = document.querySelector(".win-stars");
        setRateStars(stars, winRate);
        localStorage.clear();
    }
}

// save player intial state to the localstorage when start or restart the game
function savePlayerState() {
    saveToLocalStorage("moves", movements);
    saveToLocalStorage("stars", stars);
    saveToLocalStorage("gameTime", "00:00");
}

// helper functions to deal with localstorage

function getLocalStorageItem(item) {
    let data = localStorage.getItem(item);
    if (data) {
        return JSON.parse(data);
    }
    return data;
}

function saveToLocalStorage(name, item) {
    localStorage.setItem(name, JSON.stringify(item));
}

function removeLocalStorageItem(item) {
    localStorage.removeItem(item);
}

// this hide the win modal depending on the player choice
function closeWinModal() {
    winSection.style.display = "none";
}