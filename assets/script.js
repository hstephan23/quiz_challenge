//timer start amount
let time = 100;
let questionCount = 1;
let score = 0;
// various variables for elements or classes to be selected
let startButton = document.getElementById("start");
let answers = document.getElementsByClassName("item");

// various listener functions
startButton.addEventListener("click", function (event) {
    event.preventDefault();
    menuDisappear("menu");
    startGame();
    questionAppear(questionCount);
});

//iterating over the array of classes
for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", function (event) {
        questionDisappear(questionCount);
        questionCount++
        event.preventDefault();
        if (answers[i].value === "true") {
            score++;
            questionAppear(questionCount);
            console.log(score);
        } else {
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

function questionDisappear(id) {
    let disappear = document.getElementById(id);
    disappear.style.display = "none";
}

function startGame() {
    time = 100;
}