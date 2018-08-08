/*
 * Create a list that holds all of your cards
 */
const cardList = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

//Create deck that holds all the cards
const deck = document.querySelector(".deck");

//Create an empty array for opened cards
let openedCards = [];
let matchedCards = [];

//Move counter variables
let moveCounter = document.querySelector(".moves");
let moves = 0;

// Scoring system from 1 to 3 stars
const stars = document.querySelector(".stars");
stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';

//Timer variables
let timer = document.querySelector(".timer")
let second = 0;
let startTime;

//Modal variables
let modal = document.getElementById("modal");
let replay = document.querySelector("#replay");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

//Create cards and add them to the deck
function start(){
	for(let i = 0; i < cardList.length; i++) {
        let card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${cardList[i]}"></i>`;
        deck.appendChild(card);

        //Invoke clickOnCards function
        clickOnCards(card);
    }
		// Enable the timer to reset to 0 when the game is restarted
		resetTimer(startTime);
		second = 0;
		timer.textContent =`${second}`;
		timerStart();

}

//Invoke the shuffle function
shuffle(cardList);

// Timer function by SLaks from: https://stackoverflow.com/questions/2604450/how-to-create-a-jquery-clock-timer
function timerStart() {
	second = 0;
	startTime = setInterval(function(){
	second = second + 1;
	timer.innerHTML = second;
	},1000);
}

//Create the main game function
function clickOnCards(card){

//Create card click event
card.addEventListener("click", function(){	

//Add an if statement so that we can't open more than two cards at the same time
	if (openedCards.length === 0 || openedCards.length === 1){
	secondCard = this;
	firstCard = openedCards[0];

	//We have opened card
	if(openedCards.length === 1){
	card.classList.add("open","show","disable");
	openedCards.push(this);

	//We invoke the function to compare two cards
	check(secondCard, firstCard);

	}else {
    //We don't have opened cards
	card.classList.add("open","show","disable");
	openedCards.push(this);
    }
	}
});
}

//Create the function which compares two cards
function check(secondCard, firstCard){
	if(secondCard.innerHTML === firstCard.innerHTML){

		//Cards match
		secondCard.classList.add("match");
		firstCard.classList.add("match");
		matchedCards.push(secondCard,firstCard);
		openedCards = [];

		//If the game is over run the popup
		gameOver();

	} else {
		//Wait for 500 miliseconds before closing the cards
		setTimeout(function(){
		secondCard.classList.remove("open", "show", "disable");
		firstCard.classList.remove("open", "show", "disable");
		openedCards = [];
		}, 500);
	}	
	
//Count moves
countMoves();

//Run the rating function
rating();
};
//Create moves counter
function countMoves(){
	moves++;
	moveCounter.innerHTML = moves;
}

//Create star rating
function rating() {
    if (moves < 12) {
		stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	} else if (moves > 12 && moves <15) {
		stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	} else if (moves > 15){
		stars.innerHTML = '<li><i class="fa fa-star"></i></li>';
	}
}

//Create the game over modal
function gameOver (){
	if(matchedCards.length === cardList.length){
	   clearInterval(startTime);

	   //Define final variables
	   let timeScore = timer.innerHTML;
	   let movesScore = moveCounter.innerHTML;
	   let starsScore = stars.innerHTML;

	   //Show the modal
	   modal.classList.add("show");

	   //Show the final variables
	   document.getElementById("timeScore").innerHTML = second;
	   document.getElementById("movesScore").innerHTML = moves;
	   document.getElementById("starsScore").innerHTML = stars.innerHTML;
	   replay.addEventListener("click",function(){
			deck.innerHTML = "";
			openedCards = [];
			matchedCards = [];
			moves = 0;
			moveCounter.innerHTML = 0;
			stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
			start();
			modal.classList.remove("show");
		});
	   }
}

//Create the restart button
const restart = document.querySelector(".restart");
restart.addEventListener("click",function(){
	deck.innerHTML = "";
	openedCards = [];
	matchedCards = [];
	moves = 0;
	moveCounter.innerHTML = 0;
	stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	shuffle(cardList);
	start();
});

//Resets the timer when the game is restarted
function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

//Invoke the start function
start();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
