//timer start amount
let time = 100;
let questionCount = 1;
let score = 0;
// various variables for elements or classes to be selected
let startButton = document.getElementById("start");
let answers = document.getElementsByClassName("item");

// various listener functions
startButton.addEventListener("click", function () {
    menuDisappear("menu");
    startGame();
    questionAppear(questionCount);
});

for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", function () {
        if (answers[i].value === "true") {
            questionDisappaer(questionCount);
            questionCount++; 
            score++;
            questionAppear(questionCount);
            console.log(score);
        } else {
            questionDisappear(questionCount);
            questionCount++;
            time = time - 5;
            questionAppear(questionCount);
        }
    })
}

//functions
function menuDisappear(id) {
    let erase = document.getElementById(id);
    erase.style.display = "none";
}

function questionAppear(id) {
    let show = document.getElementById(id);
    show.style.display = "inline";
}

function questionDisappaer(id) {
    let disappear = document.getElementById(id);
    disappear.style.display = "none";
}

function startGame() {
    time = 100;
}