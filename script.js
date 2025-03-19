const quizData = [
    {
        question: "Would you like to use the interactive tool or view the full tool list?",
        answersIfYes: [], // No answers needed for the interactive tool
        nextQuestionIndex: 1,
        linkIfNo: "https://www.planningmi.org/aws/MAP/pt/sp/cscss"
    },
    {
        question: "Is the shoreline elevated?",
        answersIfYes: ["Natural Features Setbacks", "Natural Overlays Features", "Bluff Protection"],
        nextQuestionIndex: 2
    },
    {
        question: "Is there bedrock along the shoreline?",
        answersIfYes: ["Shoreline Setback"],
        nextQuestionIndex: 3
    },
    {
        question: "Is the area prone to erosion?",
        answersIfYes: ["Erosion Hazard Zone", "Additional Setback"],
        nextQuestionIndex: null // End of quiz
    }
];

let answers = [];
let currentQuestionIndex = 0;

const questionText = document.getElementById("question-text");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const resultsDiv = document.getElementById("results");
const answersList = document.getElementById("answers-list");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
    answers = [];
    currentQuestionIndex = 0;
    resultsDiv.classList.add("hidden"); // Ensure results are hidden
    answersList.innerHTML = ""; // Clear previous answers
    yesBtn.style.display = "inline-block";
    noBtn.style.display = "inline-block";
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex === null) {
        displayResults();
        return;
    }

    let questionData = quizData[currentQuestionIndex];
    questionText.textContent = questionData.question;
    
    // Hide buttons if at the last question
    if (currentQuestionIndex !== 0) {
        yesBtn.textContent = "Yes";
        noBtn.textContent = "No";
    }
}

yesBtn.addEventListener("click", () => {
    let questionData = quizData[currentQuestionIndex];
    answers.push(...(questionData.answersIfYes || []));
    
    if (questionData.nextQuestionIndex !== null) {
        currentQuestionIndex = questionData.nextQuestionIndex;
        showQuestion();
    } else {
        displayResults();
    }
});

noBtn.addEventListener("click", () => {
    let questionData = quizData[currentQuestionIndex];

    if (currentQuestionIndex === 0 && questionData.linkIfNo) {
        window.open(questionData.linkIfNo, "_blank");
        resetQuiz(); // Reset the quiz for another try
        return;
    }

    if (questionData.nextQuestionIndex !== null) {
        currentQuestionIndex = questionData.nextQuestionIndex;
        showQuestion();
    } else {
        displayResults();
    }
});

function displayResults() {
    questionText.textContent = "Quiz Complete!";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    resultsDiv.classList.remove("hidden");

    answersList.innerHTML = answers.length
        ? answers.map(answer => `<li>${answer}</li>`).join("")
        : "<li>No recommendations.</li>";
}

restartBtn.addEventListener("click", startQuiz);

// If they choose to view the full tool list, reset the quiz
function resetQuiz() {
    questionText.textContent = "Quiz canceled. Refresh the page or restart to try again.";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    resultsDiv.classList.remove("hidden");
}

// Start the quiz initially
startQuiz();
