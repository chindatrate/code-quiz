var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("start-container");
var containerEndEl = document.getElementById("end-container");
var containerScoreEl = document.getElementById("score-banner");
var initialsForm = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container");
var viewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoresEl = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
// Buttons
var btnStartEl = document.getElementById("start-game");
var btnGoBackEl = document.getElementById("go-back");
var btnClearScoresEl = document.getElementById("clear-high-scores");
var btnAnswersEl = document.getElementById("answer-buttons");
// Q&A Element
var questionEl = document.getElementById("question");
var timerEl = document.getElementById("timer");
var answerbuttonsEl = document.getElementById("answer-buttons");
var arrayShuffledQuestions;
var timeleft;
var score = 0;
var gameover;
var QuestionIndex = 0;
var HighScores = [];

// Quiz Game Questions
var questions = [
    {
        q: 'Inside which HTML element do we put the JavaScript?',
        a: '3. <script>',
        choices: [{ choice: '1. <js>' }, { choice: '2. <javascript>' }, { choice: '3. <script>' }, { choice: '4. <scripting>' }]
    },
    {
        q: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        a: '2. <script src="xxx.js">',
        choices: [{ choice: '1. <script href="xxx.js">' }, { choice: '2. <script src="xxx.js">' }, { choice: '3. <script name="xxx.js">' }]
    },
    {
        q: 'JavaScript is the same as Java',
        a: '2. False',
        choices: [{ choice: '1. True' }, { choice: '2. False' }]
    },
    {
        q: 'Which operator is used  to assign a value to a variable?',
        a: '3. =',
        choices: [{ choice: '1. *' }, { choice: '2. -' }, { choice: '3. =' }, { choice: '4. x' }]
    },
];

var startGame = function () {
    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('show');
    containerQuestionEl.classList.add('show');
    containerQuestionEl.classList.remove('hide');
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

// Set Next Question
var setQuestion = function () {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

// Reset Answer Buttons
var resetAnswers = function () {
    while (btnAnswersEl.firstChild) {
        btnAnswersEl.removeChild(btnAnswersEl.firstChild)
    };
};

// Display Question
var displayQuestion = function (index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
    }
};

// Display Correct!
var answerCorrect = function () {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
    }
}

// Display Wrong!
var answerWrong = function () {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")
    }
}


// Check for Correct Answer
var answerCheck = function (event) {
    var selectedanswer = event.target
    if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText) {
        answerCorrect()
        score = score + 7
    }

    else {
        answerWrong()
        score = score - 1;
        timeleft = timeleft - 3;
    };


    // Go to Next Question
    QuestionIndex++
    if (arrayShuffledQuestions.length > QuestionIndex + 1) {
        setQuestion()
    }
    else {
        gameover = "true";
        showScore();
    }
}


// Display Score at End of Game
var showScore = function () {
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
}



// Timer
var setTime = function () {
    timeleft = 30;

    var timercheck = setInterval(function () {
        timerEl.innerText = timeleft
        timeleft--;

        if (gameover) {
            clearInterval(timercheck)
        }

        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }
    }, 1000);
}

btnStartEl.addEventListener("click", startGame)
viewHighScoreEl.addEventListener("click", displayHighScores)