//timer start amount
let time = 100;
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

//sorted object
const sort = Object.fromEntries(
    Object.entries(highScores).sort(([, score1], [, score2]) => score2 - score1)  
    );

// various variables for elements or classes to be selected
const startButton = document.getElementById("start");
const answers = document.getElementsByClassName("item");
const goBack = document.getElementById("goBack");
const submit = document.getElementById("submit");

// various listener functions
if (startButton !== null) {
    startButton.addEventListener("click", function (event) {
        event.preventDefault();
        menuDisappear("menu");
        startGame();
        questionAppear(questionCount);
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
        addToScoreBoard("initials");
    })
};

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

function startGame() {
    time = 100;
};

function inputInitials(finalID) {
    let input = document.getElementById(finalID);
    input.style.display = "inline";
};

//arrow functions
const addToScoreBoard = (inputID) => {
    const input = document.getElementById(inputID).value;
    console.log(input);
    highScores[input] = score;
    console.log(highScores);
 };

 const outputScoreboard = (scoredboardID) => {
    const input = document.getElementById(scoredboardID);
    for (const value in sort) {
        const node = document.createElement("li");
        const textnode = document.createTextNode(`${value} - ${sort[value]}`);
        node.appendChild(textnode);
        input.appendChild(node);
    }
 }
