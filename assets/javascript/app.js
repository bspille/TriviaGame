var trivia = {
	// questions array hold objects with a question string property and a answers array property 
	// correct answers are at index 0

	// div where the game will show on the screen
	display: $("#game-zone"),
	// logs correct answers
	correct: [],
	// logs wrong answers
	wrong: [],
	// array of index numbers for the questions array objects
	indexI: [],
	// array of index numbers for the answers array in each questions object
	indexJ: [],
	// counts the rounds
	round: 0,
	// ends the cylcles
	end: false,

	initial: 		function() {
						// displays initial text and start button
						trivia.display.append("<h1 class='rmText'>Test Your coding knowedge</h1>");
						trivia.display.append("<button class='start'>Begin</button>");	
						trivia.start();			
					},

	start: 			function() {
						// clears empty values
						trivia.correct = [];
						trivia.wrong = [];
						trivia.indexI = [];
						trivia.indexJ = [];
						trivia.round = 0;
						trivia.end = false;
						// sets initial values to index arrays
						for (var i = 0; i < questions.length; i++) {
							trivia.indexI.push(i);
							for ( var j = 0; j < questions[i].answers.length; j++) {
								trivia.indexJ.push(j);
							};
						};
						$('.start').click(trivia.rounds);
					},

	rounds: 	function() {
					trivia.round++;
					trivia.display.empty();
					if (!end) {
						setTimeout(trivia.after, 15000);

					};
					else {
						// end results
					}
				},

	after: 		function() {
				trivia.display.empty();
					if (!end) {
						setTimeout(trivia.rounds, 5000);
						
					};
					if (trivia.round >= questions.length) {
						trivia.end = true;
					};
				},
				
	results: 	function() {
				trivia.display.empty()
				}




	// try to use parameters more and keep the codes simple

	// game must show one question and answers set at a time

	// game must have timed intervals to advance the game or player answers to advance the game

	// game must display status of answers between question congrad u correct, times up, u wrong the answer is

	// game must display report after the game has ended, number of correct answers, number of wrong answers, option to restart


	// the game needs to loop through the array of objects random if possible with random ordering of question answers

	// note the events that need to be timed out and time intervals



}
// when the doc is ready run the start function
$(document).ready(trivia.initial);