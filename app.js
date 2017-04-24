var state = {
	questions : ['In which of the following Hawaiian Islands is the Hawaii Volcanoes National Park located?',
				'Which of the following national parks is NOT in Utah?',
				'The Yellowstone National Park is spread across 3 US states. Which of the following is not among them?',
				'Which National Park is the first National Park of the US?',
				'Which of the following national parks is the most visited one?'],
	answers : ['Big Island', 'Grand Canyon', 'Nevada', 'Yellowstone', 'Great Smoky Mountains'],
	answerOptions : [['Oahu', 'Maui', 'Big Island', 'Kauai'], 
					['Bryce Canyon', 'Arches', 'Zion', 'Grand Canyon'], 
					['Nevada', 'Wyoming', 'Montana', 'Idaho'],
					['Yellowstone', 'Grand Canyon', 'Grand Teton', 'Great Smoky Mountains'],
					['Great Smoky Mountains', 'Grand Canyon', 'Rocky Mountains', 'Yellowstone']],
	currentQuestionNum : 0,
	currentScore : 0,
	answerStatus : ""
};

var updateQuestionNum = function(state) {
	state.currentQuestionNum += 1;
};

var updateAnswerStatus = function(state, value) {
	if (state.answers[state.currentQuestionNum-1] == value) {
		state.answerStatus = "Correct Answer!";
		state.currentScore += 1;
	}
	else {
		state.answerStatus = "Wrong Answer! The correct answer is " + state.answers[state.currentQuestionNum-1] + ".";
	}
};

var resetState = function(state) {
	state.currentQuestionNum = 0;
	state.currentScore = 0;
	state.answerStatus = "";
};

var renderQuestionContainer = function(status) {
	$('.js-start-container').addClass("hidden");
	$('.js-question-container').removeClass("hidden");
	$('.js-result-container').addClass("hidden");
};

var renderQuestion = function(state) {
	$(".js-current-question").text("Question " + state.currentQuestionNum + " of 5");
	$(".js-current-score").text("Status: " + state.currentScore + " correct, " + (state.currentQuestionNum-state.currentScore-1) + " incorrect");
	$('.js-question').text(state.questions[state.currentQuestionNum-1]);
	var choices = state.answerOptions[state.currentQuestionNum-1];
	for( var i = 1; i <= 4; i++ ) {
		$("#option"+i).val(choices[i-1]);
		$("#option"+i).next("label").text(choices[i-1]);
	}
};

var renderComments = function(state, element) {
	$(".js-comments").removeClass("hidden");
	$(".js-comments").text(state.answerStatus);
	if (state.currentQuestionNum != 5){
		element.find("button").text("Next Question >>");
	}
	else {
		element.find("button").text("Get My Score");
	}
};

var removeComments = function(element){
	element.find("button").text("Submit Answer");
	$(".js-comments").addClass("hidden");
};

var renderResultContainer = function(state) {
	$('.js-question-container').addClass("hidden");
	$('.js-result-container').removeClass("hidden");
	$('.js-result-container').find(".js-score").text("Your current score is " + state.currentScore+".");
};

$('.js-start-button').click(function(event) {
	updateQuestionNum(state);
	renderQuestionContainer();
	renderQuestion(state);
});

$('.js-question-container').submit(function(event) {
	event.preventDefault();
	if($(this).find("button").text() == "Submit Answer") {
		var answer = $(this).find("input[name=options]:checked").val();
		updateAnswerStatus(state, answer);
		renderComments(state,$(this));
	}
	else if ($(this).find("button").text() == "Get My Score") {
		removeComments($(this));
		renderResultContainer(state);
	}
	else {
		updateQuestionNum(state);
		renderQuestion(state);
		removeComments($(this));
	}
});

$('.js-retake-button').click(function(event) {
	resetState(state);
	updateQuestionNum(state);
	renderQuestionContainer();
	renderQuestion(state);
});