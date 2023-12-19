// various variables for elements or classes to be selected
let startButton = document.getElementById("start");


// various listener functions
startButton.addEventListener("click", function () {
    menuDisappear("menu");
    startGame();
    questionAppear("question1");
});



//functions
function menuDisappear(id) {
    let erase = document.getElementById(id);
    erase.style.display = "none";
}

function questionAppear(id) {
    let show = document.getElementById(id);
    show.style.display = "inline";
}

function startGame() {

}