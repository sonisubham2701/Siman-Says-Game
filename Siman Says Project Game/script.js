let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

// Flash for game sequence
function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash for user click
function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Increase level
function levelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

// Check user's answer
function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        console.log("Correct");

        // User completed current sequence
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {

        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start again`;

        document.body.style.backgroundColor = "red";

        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Button click
function btnPress() {

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    console.log(userSeq);

    checkAns(userSeq.length - 1);
}

// Add click listeners
let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}