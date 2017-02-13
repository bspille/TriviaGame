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
	// question load point
	question: [],
	// answer load point
	answer: [],
	// value given to the answer
	value: [],
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
						trivia.question = [];
						trivia.round = 0;
						trivia.end = false;
						// sets initial values to index arrays
						for (var i = 0; i < questions.length; i++) {
							trivia.indexI.push(i);
						};
						$('.start').click(trivia.rounds); 
					},

	randomI: 	function() {
					// random selection of questions from questions array with no repeats
					var al = indexI.length--;
					var ri = Math.round(Math.ramdom() * al);
					trivia.question = indexI[ri];
					trivia.indexI.splice(ri, 1);
					// set value for indexJ array
					for (var i = 0; i < questions[trivia.question].answers.length; i++) {
						trivia.indexJ.push(i);
					};
				},

	randomJ:  	function() {
					// randomly selects answers with no repeats
					var al = indexJ.length--;
					var rj = Math.round(Math.random() * al);
					trivia.answer  = trivia.indexJ[rj]
					trivia.indexJ.splice(rj, 1);
				},

	rounds: 	function() {
				
					trivia.display.empty();
					if (!end) {
						setTimeout(trivia.after, 15000);
						trivia.randomI().
						trivia.display.append('<h2 class="question-display">' + questions[trivia.ri].question + '</h2>');
						for (var i = 0; i < questions[trivia.question].answers.length; i++) {
							trivia.randomJ();
							trivia.display.append('<p class="answers" value="' + trivia.value + '">' +
													questions[trivia.question].answers[trivia.answer] +
													'</p>');
						}

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
					trivia.round++;
					if (trivia.round == questions.length) {
						trivia.end = true;
					};
				},
				
	results: 	function() {
				trivia.display.empty()
				}


	// started random generators for questions and answers still need a value generator and a flag for correct answers

	// try to use parameters more and keep the codes simple

	// game must have timed intervals to advance the game or player answers to advance the game

	// game must display status of answers between question congrad u correct, times up, u wrong the answer is

	// game must display report after the game has ended, number of correct answers, number of wrong answers, option to restart



}
// when the doc is ready run the start function
$(document).ready(trivia.initial);