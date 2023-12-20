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

// //sorted object
// const sort = Object.fromEntries(
//     Object.entries(highScores).sort(([, score1], [, score2]) => score2 - score1)  
//     );

// //to store local files
// localStorage.setItem("userData", JSON.stringify(sort));
// const storedData = localStorage.getItem("userData");
// const parsedData = JSON.parse(storedData);

// console.log(parsedData);

// various variables for elements or classes to be selected
const startButton = document.getElementById("start");
const answers = document.getElementsByClassName("item");
const goBack = document.getElementById("goBack");
const submit = document.getElementById("submit");
const numberOfQuestions = document.getElementsByClassName("full-question");

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
        addToScoreBoard("initials");
        const sort = Object.fromEntries(
            Object.entries(highScores).sort(([, score1], [, score2]) => score2 - score1)  
            );
        localStorage.setItem("userData", JSON.stringify(sort));
        const storedData = localStorage.getItem("userData");
        const parsedData = JSON.parse(storedData);
        console.log(parsedData);
        window.location.href = "./assets/scores.html";
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
    const sort = Object.fromEntries(
        Object.entries(highScores).sort(([, score1], [, score2]) => score2 - score1)  
        );    
    for (const value in sort) {
        const node = document.createElement("li");
        const textnode = document.createTextNode(`${value} - ${sort[value]}`);
        node.appendChild(textnode);
        input.appendChild(node);
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
}

//local storage
