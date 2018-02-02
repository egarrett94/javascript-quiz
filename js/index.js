/*
* Emily and Anthony
*/

var fullQuiz = []; 
var questionsList = [];
var qLIndex = 0;
var score = 0;
var answers = [];
var randomArr = [];


$.get("https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple", {
}).done(function(data) {
	console.log(data);
	for (var i = 0; i < 10; i++){
		fullQuiz.push(data.results[i]);
	};

	fullQuiz.forEach(function(question) {
		questionsList.push(
		{
			question: question['question'],
			choices: [question['correct_answer'], question['incorrect_answers']]
		})
	});
		
	var answerOne = $('label[for=a1]');
	var answerTwo = $('label[for=a2]');
	var answerThree = $('label[for=a3]');
	var answerFour = $('label[for=a4]'); 
	var quest = $('#questionInput');
	var nextButton = $('#next');
	var questions = $(".questions");
	

	var randomize = function () {
		for (var a = [0, 1, 2], i = a.length; i--; ) {
    		var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    		randomArr.push(random);
		}
	}

	quest.html(questionsList[0]['question']);
	$('label[for=a1]').html(questionsList[0]["choices"][1][0]);

	var lastQuestion = function() {
		if ($('#a1:checked').val() === "on") {
			score++;
		}
		quest.text("Here's your score: " + score);
		questions.css('display', 'none');
	}

	var nextQuestion = function () {
		clearTimeout(fader);
		qLIndex++;

		var fader = setTimeout(function () {
			if ($('#a1:checked').val() === "on") {
				score++;
			} 
			randomize();
			answerOne.text(questionsList[qLIndex]["choices"][0]);
			answerTwo.text(questionsList[qLIndex]["choices"][1][randomArr[0]]);
			answerThree.text(questionsList[qLIndex]["choices"][1][randomArr[1]]);
			answerFour.text(questionsList[qLIndex]["choices"][1][randomArr[2]]);
			
			quest.html(questionsList[qLIndex]['question']);
			randomArr = [];
			$('.container').fadeIn(1500);
			if (qLIndex === 8) {
			nextButton.on('click', lastQuestion);
		}
		},500)
	}

	answerOne.text(questionsList[qLIndex]["choices"][0]);
	answerTwo.text(questionsList[qLIndex]["choices"][1][0]);
	answerThree.text(questionsList[qLIndex]["choices"][1][1]);
	answerFour.text(questionsList[qLIndex]["choices"][1][2]);

	nextButton.on('click', nextQuestion);	

}); //done function end tag

console.log("JS file is linked up!");
