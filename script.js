const quizData = [
    {
        question: "Would you like to use the interactive tool or view the full tool list?",
        yesText: "Interactive Tool",
        noText: "View full list of tools (Section C)",
        nextQuestionIndex: 1, 
        linkIfNo: "https://example.com/full-tool-list" // Replace with actual link
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
    resultsDiv.classList.add("hidden");
    yesBtn.style.display = "inline-block";
    noBtn.style.display = "inline-block";
    showQuestion();
}

function showQuestion() {
    let questionData = quizData[currentQuestionIndex];

    if (!questionData) {
        displayResults();
        return;
    }

    questionText.textContent = questionData.question;

    // Custom button text for the first question
    if (currentQuestionIndex === 0) {
        yesBtn.textContent = questionData.yesText;
        noBtn.textContent = questionData.noText;
    } else {
        yesBtn.textContent = "Yes";
        noBtn.textContent = "No";
    }
}

yesBtn.addEventListener("click", () => {
    let questionData = quizData[currentQuestionIndex];

    // If "Yes" should add answers, do it
    if (questionData.answersIfYes) {
        answers.push(...questionData.answersIfYes);
    }

    // Move to the next question or display results
    if (questionData.nextQuestionIndex !== null) {
        currentQuestionIndex = questionData.nextQuestionIndex;
        showQuestion();
    } else {
        displayResults();
    }
});

noBtn.addEventListener("click", () => {
    let questionData = quizData[currentQuestionIndex];

    // Handle special link for "No" on the first question
    if (questionData.linkIfNo) {
        window.open(questionData.linkIfNo, "_blank"); // Opens in a new tab
        resetQuiz();
        return;
    }

    // Move to the next question or display results
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

function resetQuiz() {
    questionText.textContent = "Quiz canceled. Refresh the page or restart to try again.";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    resultsDiv.classList.remove("hidden");
}

// Start the quiz initially
startQuiz();



