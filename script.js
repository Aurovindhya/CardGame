

var deckConfig = undefined;
var previousCard  = undefined;
var currentCard = undefined;

var score = 0;
var cardsLeft = 0;

const cardValues = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"]

async function fetchDeck () {
	var response = await axios.get("https://www.deckofcardsapi.com/api/deck/new/")
	console.log(response);
	deckConfig = response.data;
	return response.data.remaining;
}

document.getElementById('generate-button').addEventListener('click', async function() {
	var cardCount = parseInt(await fetchDeck()) //parseInt(document.getElementById('card-count').value);
	var cardContainer = document.getElementById('card-container');
	cardContainer.innerHTML = '';
	cardsLeft = cardCount;
	for (var i = 1; i <= cardCount; i++) {
	  var card = document.createElement('div');
	  card.className = 'card';
	  
	  card.style.transform = 'translate(' + (i * 15) + 'px, '+ (i * 12) + 'px' +')'; // Adjust the value to change the offset
	  cardContainer.appendChild(card);
	}

	document.getElementById("guess-card").removeAttribute("disabled");
	document.getElementById("check-guess").removeAttribute("disabled");
  });


  async function  drawCard (question) {

	var response = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckConfig.deck_id}/draw/?count=1`)
	console.log(response.data);
	
	var cardContainer = document.getElementById('card-container');
	

	if (question === 2) {
		const guess = document.getElementById("guess-card").value;
		previousCard = currentCard;
		currentCard = response.data;

		cardContainer.children[cardsLeft-1].style["background-image"] = `url(${currentCard.cards[0].image})`
		if (guess === "black") {
			
			
			if (currentCard.cards[0].suit === "SPADES" || currentCard.cards[0].suit === "CLUBS") {
				alert ("Guess was correct");
				score = score + 1;
				document.getElementById("guess-card-3").removeAttribute("disabled");
				document.getElementById("check-guess-3").removeAttribute("disabled");
				/* setTimeout(() => {
					cardContainer.removeChild(cardContainer.lastChild);
				}, 2000) */
			}
			else {
				const choice = confirm (`Guess was incorrect. Your score was : ${score}. Replay ?`);
				if (choice) {
					window.location.reload();
				}
			
			}
		}
	
		if (guess === "red") {
			if (currentCard.cards[0].suit === "HEARTS" || currentCard.cards[0].suit === "DIAMONDS") {
				alert ("Guess was correct");
				score = score + 1;
				document.getElementById("guess-card-3").removeAttribute("disabled");
				document.getElementById("check-guess-3").removeAttribute("disabled");
				/* setTimeout(() => {
					cardContainer.removeChild(cardContainer.lastChild);
				}, 2000) */
			}
			else {
				const choice = confirm (`Guess was incorrect. Your score was : ${score}. Replay ?`);
				if (choice) {
					window.location.reload();
				}
				
			}
		}
	}
	else if (question === 3) {
		const guess = document.getElementById("guess-card-3").value;
		previousCard = currentCard;
		currentCard = response.data;

		cardContainer.children[cardsLeft-1].style["background-image"] = `url(${currentCard.cards[0].image})`
		const prevNum = cardValues.findIndex((value, index) => {
			if (value === previousCard.cards[0].value)
				return index;
			
		});
		const valNum = cardValues.findIndex((value, index) => {
			if (value === currentCard.cards[0].value)
				return index;
			
		});

		let nextActive = false;
		if (guess === "higher" && valNum > prevNum) {
			alert ("Guess was correct");
			score = score + 1;
			nextActive = true;
		}
		else if (guess === "lower" && valNum < prevNum) {
			alert ("Guess was correct");
			score = score + 1;
			nextActive = true;
		}
		else if (guess === "equals" && valNum === prevNum) {
			alert ("Guess was correct");
			score = score + 1;
			nextActive = true;
		}
		else {
			const choice = confirm (`Guess was incorrect. Your score was : ${score}. Replay ?`);
			if (choice) {
				window.location.reload();
			}
		}

		if (nextActive) {
			document.getElementById("guess-card-4").removeAttribute("disabled");
			document.getElementById("check-guess-4").removeAttribute("disabled");
		}
		
	}
	else if (question === 4) {
		previousCard = currentCard;
		currentCard = response.data;
		cardContainer.children[cardsLeft-1].style["background-image"] = `url(${currentCard.cards[0].image})`
		const guess = document.getElementById("guess-card-4").value;

		if (guess === currentCard.cards[0].suit) {
			alert ("Guess was correct");
			score = score + 1;
			document.getElementById("final-text").style.visibility = "visible"

		}
		else {
			const choice = confirm (`Guess was incorrect. Your score was : ${score}. Replay ?`);
			if (choice) {
				window.location.reload();
			}
		}
	}

	cardsLeft = cardsLeft - 1;
	if (cardsLeft <= 0) {
		const choice = confirm (`Game Over. Your score was : ${score}. Replay ?`);
		if (choice) {
			window.location.reload();
		}

		document.getElementById("guess-card-4").setAttribute("disabled");
			document.getElementById("check-guess-4").setAttribute("disabled");

			document.getElementById("guess-card-3").setAttribute("disabled");
			document.getElementById("check-guess-3").setAttribute("disabled");

			document.getElementById("guess-card").setAttribute("disabled");
			document.getElementById("check-guess").setAttribute("disabled");
	}

	document.getElementById("guess-card")

}