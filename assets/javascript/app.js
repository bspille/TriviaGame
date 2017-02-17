var trivia = {
	// questions array hold objects with a question string property and a answers array property 
	// correct answers are at index 0

	// div where the game will show on the screen
	display: $("#game-zone"),
	// logs correct answers
	correct: 0,
	// logs wrong answers
	wrong: 0,
	// array of index numbers for the questions array objects
	indexI: [],
	// array of index numbers for the answers array in each questions object
	indexJ: [],
	// question load point
	question: [],
	// answer load point
	answer: [],
	// selection
	choice: 'time',
	// counts the rounds
	round: 0,
	// round time
	roundTime: [],
	// ends the cycles
	end: false,
	// lock in a single choice
	lockedIn: false,

	initial: 		function() {
						// displays initial text and start button
						trivia.display.append("<h1 class='rmText'>Test Your coding knowedge</h1>");
						trivia.display.append("<button class='btn btn-default start'><p>Begin</p></button>");
						trivia.display.append('<h2 class="instr">Instructions</h2>' +
												'<ol class="instr">' + 
												'<li>You have 15 seconds for each multiple choice question.</li>' +
												'<li>There are 10 question and answer sets that are displayed in random order.</li>' +
												'<li>Click on the most correct answer to the question.</li>' +
												'<li>The game will automatically continue to the next question if no answer is given in the alloted time</li>' +
												"<li>This game counts correct and wrong answers and display's a report at the end.</li>" + '</ol>');
						$('.instr').css({'color': 'orange', 'padding-left': '40px'});
						trivia.start();			
					},

	start: 			function() {
						// clears empty values
						trivia.correct = 0;
						trivia.wrong = 0;
						trivia.indexI = [];
						trivia.indexJ = [];
						trivia.question = [];
						trivia.round = 0;
						trivia.end = false;
						// sets initial values to index arrays
						for (var i = 0; i < questions.length; i++) {
							trivia.indexI.push(i);
						};
						// console.log(trivia.indexI);
						$('.start').click(trivia.rounds); 
					},

	randomI: 	function() {
					// random selection of questions from questions array with no repeats
					var al = trivia.indexI.length - 1;
					var ri = Math.round(Math.random() * al);
					trivia.question = trivia.indexI[ri];
					trivia.indexI.splice(ri, 1);
					// set value for indexJ array
					for (var i = 0; i < questions[trivia.question].answers.length; i++) {
						trivia.indexJ.push(i);
					};
					// console.log(trivia.indexI);
					// console.log(trivia.indexJ);
				},

	randomJ:  	function() {
					// randomly selects answers with no repeats
					var al = trivia.indexJ.length - 1;
					var rj = Math.round(Math.random() * al);
					trivia.answer  = trivia.indexJ[rj];
					trivia.indexJ.splice(rj, 1);
					// console.log(trivia.indexJ);
					},

	rounds: 	function() {
					// displays the selected question and multiple choice answers until the pool is exhausted the runs results
					trivia.lockedIn = false;
					trivia.choice = 'time';
					trivia.display.empty();
					if (!trivia.end) {
						trivia.roundTime = setTimeout(trivia.after, 15000);
						trivia.randomI();
						trivia.display.append('<h2 class="question-display">' + questions[trivia.question].question + '</h2>');
						trivia.display.append('<ol class="answers" type="A"></ol>')
						// loops through the answers array for the selected questions and writes them in a random order
						for (var i = 0; i < questions[trivia.question].answers.length; i++) {
							trivia.randomJ();							
							var newAnswer = $('<li class="answer"><button class="btn btn-default"><p>' +
											questions[trivia.question].answers[trivia.answer] +
											'</p></button></li>');
							// adds value to the correct answers
							if (trivia.answer == 0) {
								newAnswer.attr('correct', "true");
							}
							else {
								newAnswer.attr('correct', "false")
							}
							$('.answers').append(newAnswer);
							$('.answer').click(trivia.selection);
						}

					}
					else {
						trivia.results();
					};
				},

	selection: 	function() {
					if (!trivia.lockedIn) {
						clearTimeout(trivia.roundTime);
						trivia.choice = ($(this).attr('correct'));
						trivia.lockedIn = true;
						trivia.after()
					};
					// test the output of this for the event for scope issues
					// console.log(trivia.choice);
				},

	after: 		function() {
					console.log(trivia.choice);
				trivia.display.empty();
					if (!trivia.end) {
						setTimeout(trivia.rounds, 5000);
						
						// switch after display for the condition
						switch (trivia.choice) {
							case 'true': 
								trivia.display.append('<h1 class="winner">Congratulations!</h1>');
								trivia.display.append('<h2 class="winner">You are correct</h2>')
								trivia.correct++;		
							break;
							case 'false':
								trivia.display.append('<h1 class="loser">Wrong answer!</h1>');
								trivia.display.append('<h2 class="correction">The correct answer was:')
								trivia.display.append('<h2 class="correction">' + questions[trivia.question].answers[0] + '</h2>');
								trivia.wrong++;
							break;
							case 'time':
								trivia.display.append('<h1 class="timesUp">Times Up!</h1>');
								trivia.display.append('<h2 class="correction">The correct answer was:')
								trivia.display.append('<h2 class="correction">' + questions[trivia.question].answers[0] + '</h2>');
							break;
						
						};
					};
					trivia.round++;
					if (trivia.round == questions.length) {
						trivia.end = true;
					};
				},
				
	results: 	function() {
				trivia.display.empty()
				trivia.display.append('<h1 class="report">Results</h1>');
				trivia.display.append('<h2 class="stat">Correct answers: ' + trivia.correct + '</h2>');
				trivia.display.append('<h2 class="stat">Wrong answers: ' + trivia.wrong + '</h2');
				trivia.display.append('<button class="btn btn-default start"><p>Restart</p></button>');
				trivia.start()
				}


} // end of trivia object
	
	//when the doc is ready run the start function
$(document).ready(trivia.initial);