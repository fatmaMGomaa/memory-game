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


function generateCards(array) {
    let cardsHtml = "";
    array.map((card) => {
        cardsHtml += `<li class="card" id=${card.cardId}><i class="${card.cardClass}"></i></li>\n`;
    })
    deckUl.innerHTML = cardsHtml;
}

function openCard(e) {
    const cardClasses = e.target.classList;
    if (cardClasses.contains("card")) {
        cardClasses.add("open", "show");
        movements += 1;
        openedCards.push(e.target);
        isMatched()
    }
}

function closeCard() {
    setTimeout(() => {
        openedCards.forEach((card) => {
            card.classList.remove("open", "show");
        })
        openedCards = [];
    }, 500);
}
function isMatched() {
    // I made nested condition here and didn't use && operator because I didn't want to run else block in case the length is lower then 2
    if (openedCards.length === 2) {
        if (openedCards[0]["id"].split("-")[1] === openedCards[1]["id"].split("-")[1]) {
            allMatchedCards = [...allMatchedCards, ...openedCards];
            openedCards = [];
        } else {
            closeCard()
        }
    }
}