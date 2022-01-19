var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("start-container");
var containerEndEl = document.getElementById("end-container");
var containerScoreEl = document.getElementById("score-banner");
var formInitials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container");
var viewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
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
    {
        q: 'What does DOM stand for?',
        a: '2. Document Object Model',
        choices: [{ choice: '1. Data Oriented Model' }, { choice: '2. Document Object Model' }, { choice: '3. Data Object Model' }, { choice: '4. Document Oriented Model' }]
    },
    {
        q: 'What syntax would call a function?',
        a: '1. function()',
        choices: [{ choice: '1. function()' }, { choice: '2. function' }, { choice: '3. var function' }, { choice: '4. call function' }]
    },
    {
        q: 'Arrays in Javascript can be used to store ___.',
        a: '4. all of the above',
        choices: [{ choice: '1. booleans' }, { choice: '2. numbers' }, { choice: '3. strings' }, { choice: '4. all of the above' }]
    },
];


// Back Button Function
var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("show")
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

// Timer
var setTime = function () {
    timeleft = 30;

    var timercheck = setInterval(function () {
        timerEl.innerText = timeleft;
        timeleft--

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


// Start Game
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
        btnAnswersEl.appendChild(answerbutton)
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

//Create HighScore Value
var createHighScore = function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("Enter your initials!");
        return;
    }

    formInitials.reset();

    var HighScore = {
        initials: initials,
        score: score
    }


    // Push & Sort Score
    HighScores.push(HighScore);
    HighScores.sort((a, b) => { return b.score - a.score });

    //Clear Visible List
    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }

    //Create Elements in order of HighScores
    for (var i = 0; i < HighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.className = "high-score";
        highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
    }

    saveHighScore();
    displayHighScores();

}

//Save High Score
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
}

//Load Values
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
    if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => { return b.score - a.score })

    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.className = "high-score";
        highscoreEl.HTML = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);

        HighScores.push(LoadedHighScores[i]);
    }
}

//Display HighScore Screen from Link
var displayHighScores = function () {
    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true"

    if (containerEndEl.className = "show") {
        containerEndEl.classList.remove("show");
        containerEndEl.classList.add("hide");
    }

    if (containerStartEl.className = "show") {
        containerStartEl.classList.remove("show");
        containerStartEl.classList.add("hide");
    }

    if (containerQuestionEl.className = "show") {
        containerQuestionEl.classList.remove("show");
        containerQuestionEl.classList.add("hide");
    }

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

//Clear HighScores
var clearScores = function () {
    HighScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    localStorage.clear(HighScores);
}

loadHighScore()






// Add Event Listeners

btnStartEl.addEventListener("click", startGame)

viewHighScoreEl.addEventListener("click", displayHighScores)

btnGoBackEl.addEventListener("click", renderStartPage)

btnClearScoresEl.addEventListener("click", clearScores)

formInitials.addEventListener("submit", createHighScore)