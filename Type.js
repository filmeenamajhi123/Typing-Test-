const paragraphs = [
    "The universe is a vast expanse, believed to have originated 13.8 billion years ago with the Big Bang, marking the birth of space, time, matter, and energy. As it expanded, galaxies, stars, and planets formed. The observable universe spans billions of light-years with an estimated 100 billion galaxies. Yet, this is only a fraction of the total universe, which may extend far beyond what we can detect. Phenomena like black holes, dark matter, and dark energy challenge our understanding. The universe symbolizes humanity’s curiosity and quest for knowledge."
];

let timeLeft = 60;
let timer;
let isTyping = false;
let errors = 0;
let correctChars = 0;
let currentParagraph = "";

const btn = document.getElementById("btn");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const speedDisplay = document.getElementById("speed");
const errorDisplay = document.getElementById("error");
const textDisplay = document.getElementById("text");

function startTest() {
    timeLeft = 60;
    errors = 0;
    correctChars = 0;
    isTyping = true;
    input.disabled = false;
    input.value = "";
    input.focus();
    timeDisplay.textContent = `${timeLeft}s`;
    speedDisplay.textContent = "0";
    errorDisplay.textContent = "0";
    currentParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    textDisplay.innerHTML = currentParagraph.split('').map(char => `<span>${char}</span>`).join('');
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.textContent = `${timeLeft}s`;
    } else {
        finishTest();
    }
}

function finishTest() {
    clearInterval(timer);
    isTyping = false;
    input.disabled = true;
    calculateWPM();
}

function calculateWPM() {
    let wordsTyped = correctChars / 5; 
    let timeElapsed = 60 - timeLeft;
    let wpm = timeElapsed > 0 ? Math.floor((wordsTyped / timeElapsed) * 60) : 0;
    speedDisplay.textContent = wpm;
}

input.addEventListener("input", () => {
    if (!isTyping) return;
    let typedText = input.value;
    let spans = textDisplay.querySelectorAll('span');
    
    errors = 0;
    correctChars = 0;

    spans.forEach((span, index) => {
        let char = typedText[index];
        if (!char) {
            span.classList.remove('correct', 'incorrect');
        } else if (char === span.textContent) {
            span.classList.add('correct');
            span.classList.remove('incorrect');
            correctChars++;
        } else {
            span.classList.add('incorrect');
            span.classList.remove('correct');
            errors++;
        }
    });

    errorDisplay.textContent = errors;
    calculateWPM();
});

btn.addEventListener("click", startTest);
