//timer start amount
let time = 100;
let displayTime = 99;
let questionCount = 1;
let score = 0;

//The high score list
let highScores = {"HS": 10,
    "AS": 0,
    "IS": 0,
    "MS": 9,
    "TS": 5,
    "ES": 4
};


// various variables for elements or classes to be selected
const startButton = document.getElementById("start");
const answers = document.getElementsByClassName("item");
const goBack = document.getElementById("goBack");
const submit = document.getElementById("submit");
const numberOfQuestions = document.getElementsByClassName("full-question");
const scoreboard = document.getElementById("scoreboard");
const reset = document.getElementById("reset");

const scores = JSON.parse(localStorage.getItem("scores")) || [];
// various listener functions
if (startButton !== null) {
    startButton.addEventListener("click", function (event) {
        event.preventDefault();
        menuDisappear("menu");
        questionAppear(questionCount);
        startTimer();
    });
};

if (goBack !== null) {
    goBack.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "../index.html";
    });
};

//iterating over the array of classes
if (answers !== null) {
    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener("click", function (event) {
            questionDisappear(questionCount);
            questionCount++
            event.preventDefault();
            if (answers[i].value === "true" && questionCount <= 10) {
                score++;
                questionAppear(questionCount);
                console.log(score);
            } else if (answers[i].value === "true" && questionCount > 10) {
                score++;
                inputInitials("scoreRecord");
            } else if (answers[i].value === "false" && questionCount <= 10) {
                time = time - 5;
                displayTime = displayTime -5
                console.log(time);
                questionAppear(questionCount);
            }else {
                inputInitials("scoreRecord");
            }
        })
    }
};

if (submit !== null) {
    submit.addEventListener("click", function (event) {
        event.preventDefault();
        addToScoreBoard();
        console.log(localStorage);
    })
};

if (reset !== null) {
    reset.addEventListener("click", function (event) {
        event.preventDefault();
        clearScoreboard();
    })
}

//functions
function menuDisappear(id) {
    let erase = document.getElementById(id);
    erase.style.display = "none";
};

function questionAppear(id) {
    let show = document.getElementById(id);
    show.style.display = "inline";
};

function questionDisappear(id) {
    let disappear = document.getElementById(id);
    disappear.style.display = "none";
};

function inputInitials(finalID) {
    let input = document.getElementById(finalID);
    input.style.display = "inline";
};

//arrow functions
const addToScoreBoard = () => {
    let initialsInput = document.getElementById("initials").value; 
    let scoreInput = score;
    let newScore = {
        initials: initialsInput,
        scoreDisplayed: scoreInput
    }
    scores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(scores));
    window.location.href = "./assets/scores.html";
 };

 const outputScoreboard = () => {   
    scores.sort((a, b) => b.scoreDisplayed - a.scoreDisplayed);
    for (const value in scores) {
        const node = document.createElement("li");
        const textnode = document.createTextNode(`${scores[value]["scoreDisplayed"]} - ${scores[value]["initials"]}`);
        node.appendChild(textnode);
        scoreboard.append(node);
        console.log(textnode);
    }
 }

let startTimer = () => {
    timerCountdown = setInterval(updateTimer, 1000)
 };

const updateTimer = () => {
    const timer = document.getElementById("timer");
    timer.textContent = `Time: ${displayTime} sec`;
    time -= 1;
    displayTime -= 1;
    console.log(time);
    if (time <= 0 || questionCount > numberOfQuestions.length){
        clearInterval(timerCountdown);
        inputInitials("scoreRecord");
        if (questionCount <= numberOfQuestions.length) {
            questionDisappear(questionCount);
        }
        timer.textContent = `Time: 0 sec`;
    };
};

const popUp = (popUpID) => {
    const showPopUp = document.getElementById(popUpID);
    showPopUp.style.display = "inline";
};

const clearScoreboard = () => {
    scoreboard.textContent = "";
    localStorage.clear();
}

const displayScores = () => {
    scores.forEach(score => {
        addScoreToScoreboard(score);
    })
}
