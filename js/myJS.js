
//Sets the number that the user must guess
function setNumber(){
	theNumber = Math.floor(Math.random()*101);
	if(theNumber < 1){
		theNumber += 1;
	}
	return theNumber;
	console.log("The number is " + theNumber);
}

setNumber();

var guessesRemaining = 5;

//Creates an array storing the user's previous guesses
	guessHistory = [];
	function recordGuess(userGuess){
		if(guessesRemaining > 0){
			guessHistory.push(userGuess);
		}
	}


//Evaluates whether user's guess is high or low, hot or cold.
function giveGuessFeedback(userGuess){

//Checks to see if guess is a repeat
	for(var i=0; i<guessHistory.length-1; i++){
		if(guessHistory[i] == userGuess){
			guessHistory.pop();
			return alert("You already guessed that number");
		}
	}
//Checks to see if guess is a valid number
	if(!(userGuess < 101) || !(userGuess > 0)){
		guessHistory.pop();
		return alert("Guess must be an integer between 1-100")
	}



//Declare Variables
	guessHotOrCold = "";
	guessHigherOrLower = "";
	guessDistance = undefined;
	guessRelative = undefined;
	feedbackText = "";

//Calculates the distance from user guess and the number 
	guessDistance = userGuess - theNumber;

//If the user guesses the correct number, return the winner text
	if(guessDistance == 0){
		feedbackText = "YOU ARE CORRECT!";
		guessesRemaining -= 1; 
		console.log("User has guessed the number");
		return feedbackText;
	}

//Subtracts one from the guess counter. Only run function if user has guesses remaining
	if(guessesRemaining > 0){
		guessesRemaining -= 1;
		if(guessesRemaining <= 0){
			feedbackText = "You are out of guesses!";
			return "You are out of guesses!";
		}	
	}

//Evaluate if guess is low or high
	if(guessDistance < 0){
		guessHigherOrLower = "Higher";
	}
	if(guessDistance > 0){
		guessHigherOrLower = "Lower";
	}

//Sets the heat level of the guess
	if(Math.abs(guessDistance) <=5){
		guessHotOrCold = "Red Hot";
	}
	if(Math.abs(guessDistance) > 5 && Math.abs(guessDistance) <= 10){
		guessHotOrCold = "Hot";
	}		
	if(Math.abs(guessDistance) > 10 && Math.abs(guessDistance) <= 20){
		guessHotOrCold = "Warm";
	}	
	if(Math.abs(guessDistance) > 20 && Math.abs(guessDistance) <= 30){
		guessHotOrCold = "Cold";
	}
	if(Math.abs(guessDistance) > 30){
		guessHotOrCold = "Ice Cold";
	}	

//Returns the text to be displayed after guess
	feedbackText = "You are " + guessHotOrCold + ", Guess " + guessHigherOrLower + ".";	
	return feedbackText;					
}

//Resets the game and all variables
function resetGame(){
	setNumber();
	// guessHotOrCold = "";
	// guessHigherOrLower = "";
	// guessDistance = undefined;
	// guessRelative = undefined;
	feedbackText = "";
	guessesRemaining = 5;
	guessHistory = [];
	$('#guess-input').val("");	
}


//START OF JQUERY

jQuery(document).ready(function(){

//Submit button click action
	$("#submit-guess").on("click", function(){
		userGuess = $('#guess-input').val();
		recordGuess(userGuess);
		if(guessesRemaining > 0){
			giveGuessFeedback(userGuess);
		}
		if(feedbackText === "YOU ARE CORRECT!"){
			$(".container").css({"background-image": "url(dogewin.png)", "background-size": "100%"});
		}
		$("#feedback-text").removeClass("hidden");
		$("#feedback-text").text(feedbackText);
		$("#guesses-remaining").text(guessesRemaining);
		$(this).closest(".guess-area").find("#guess-list").append($("<li>" + guessHistory.toString() + "</li>"));
		$(this).closest(".guess-area").find("h4").text("Guess List: " + guessHistory.join(", "));
		$('#guess-input').val("");
	});

//See Previous Guesses button click action
	$("#see-previous-guesses").on("click", function(){
		$(this).closest(".guess-area").find("#guess-list").append($("<li>" + guessHistory.toString() + "</li>"));
		$(this).closest(".guess-area").find("#guess-list").toggleClass("hidden");
		$(this).closest(".guess-area").find("h4").text("Guess List: " + guessHistory.toString());

	});	

//Reveal the Answer button click action
	$("#reveal-the-answer").on("click", function(){
		$("#feedback-text").removeClass("hidden");
		$("#feedback-text").text("The Number is " + theNumber);		
	});

//Start New Game button click action
	$("#start-new-game").on("click", function(){
		resetGame();
		$("#guesses-remaining").text(guessesRemaining);
		$("#feedback-text").text("");
		$(this).closest(".guess-area").find("#guess-list").addClass("hidden");
		$(".container").css({"background-image": "none"});		
		setNumber();
	});	
});