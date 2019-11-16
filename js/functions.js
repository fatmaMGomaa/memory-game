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

function resetGame() {
    location.reload();
}

function generateCards(array) {
    let cardsHtml = "";
    array.map((card) => {
        cardsHtml += `<li class="card" id=${card.cardId}><i class="${card.cardClass}"></i></li>\n`;
    })
    deckUl.innerHTML = cardsHtml;
    timer()
}

function countMoves() {
    movements += 1;
    moveSpan.textContent = movements;
    movements % 16 === 0 ? setRateStars() : movements;
}

function setRateStars() {
    if (stars > 1){
        stars -= 1;
        starsUl.lastElementChild.remove();
    }
}
function timer() {
    let minutes = 0;
    let seconds = 0;
    const changeTime = setInterval(() => {
        seconds += 1;
        if (seconds % 60 === 0) {
            minutes += 1;
            seconds = 0;
        }
        // use slice(-2) copyright https://www.developerdrive.com/build-countdown-timer-pure-javascript/
        timerSpan.textContent = `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
        if (allMatchedCards.length === 16) {
            clearInterval(changeTime);
        }
    }, 1000)
}

function openCard(e) {
    const cardClasses = e.target.classList;
    if (cardClasses.contains("card") && allMatchedCards.length < 16) {
        cardClasses.add("open", "show");
        countMoves()
        openedCards.push(e.target);
        isMatched()
    }
}

function closeCard() {
    // use setTimeout to let the user see the two cards before closing them
    setTimeout(() => {
        openedCards.forEach((card) => {
            card.classList.remove("open", "show");
        })
        openedCards = [];
    }, 500);
}

function handleMatchedCards() {
    openedCards.forEach((card) => {
        card.classList.remove("open", "show");
        card.classList.add("match");
    })
    allMatchedCards = [...allMatchedCards, ...openedCards];
    openedCards = [];
}

function isMatched() {
    // I made nested condition here and didn't use && operator because I didn't want to run else block in case the length is lower then 2
    if (openedCards.length === 2) {
        if (openedCards[0]["id"] !== openedCards[1]["id"] && openedCards[0]["id"].split("-")[1] === openedCards[1]["id"].split("-")[1]) {
            handleMatchedCards()
        } else {
            closeCard()
        }
    }
}