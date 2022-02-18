const word_El = document.getElementById("word");
const text_El = document.getElementById("text");
const score_El = document.getElementById("score");
const time_El = document.getElementById("time");
const endGame_El = document.getElementById("end-game-container");
const settingBtn = document.getElementById("setting-btn");
const settings = document.getElementById("setting");
const settingForm = document.getElementById("setting-form");
const difficultySelect = document.getElementById("difficulty");


const words = ["rick", "coderick", "apple", "steer", "eight", "drags", "loving", "java", "time", "more", "cook"];

let randomWord;
let score = 0;
let time = 30;
let difficulty = 
localStorage.getItem("difficulty")  !== null
    ? localStorage.getItem("difficulty")
    : "medium";
    difficultySelect.value = difficulty;

text_El.focus();

const timeInterval = setInterval(updateTime, 1000);


////! GETRANDOMWORD 
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}


////! ADDWORDTODOM
function addWordToDom() {
    randomWord = getRandomWord();
    word_El.innerHTML = randomWord;
}

addWordToDom();


////! UPDATESECORE 
function updateScore() {
    score++;
    score_El.innerHTML = score;
}


////! UPDATETIME 
function updateTime() {
    time--;
    time_El.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}


////! GAMEOVER 
function gameOver() {
    endGame_El.innerHTML = `
    <h1> Time ran out </h1>
    <h4> Your final score is ${score} </h4>
    <button class="btn-grad" onclick="location.reload()"> Restart </button>
    `;

    endGame_El.style.display = "flex";
}


////! TEXR_EL LISTENER 
text_El.addEventListener("input", (e)=> {
    const insetedText = e.target.value;
    if (insetedText === randomWord) {
        addWordToDom();
        updateScore()
    e.target.value = ""
    if (difficulty === "hard") {
        time += 2;
    } else if (difficulty === "medium") {
        time += 3;
    } else {
        time += 4;
    }
    updateTime()
}
});


////! SETTING BTN LISTENER 
settingBtn.addEventListener("click", ()=> settings.classList.toggle("hide"));


////! SETTING FORM LISTENER 
settingForm.addEventListener("change", (e) => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty)
});