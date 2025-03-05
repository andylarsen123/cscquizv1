const questions = [
    {
        question: "What's built there right now?",
        answers: [
            { text: "Residential", result: "Overlay Zone" },
            { text: "Commercial", result: "Shoreline District" },
            { text: "Infrastructure", followUp: true }
        ]
    },
    {
        question: "Are there runoff concerns?",
        answers: [
            { text: "Yes", result: "B" },
            { text: "No", result: "A" }
        ]
    }
];

let currentQuestion = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const resultText = document.getElementById("result-text");

function loadQuestion() {
    const questionData = questions[currentQuestion];
    questionEl.textContent = questionData.question;
    answersEl.innerHTML = "";

    questionData.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.onclick = () => handleAnswer(answer);
        answersEl.appendChild(btn);
    });

    nextBtn.style.display = "none";
}

function handleAnswer(answer) {
    if (answer.result) {
        showResult(answer.result);
    } else if (answer.followUp) {
        currentQuestion++; // Move to the next question
        loadQuestion();
    }
}

function showResult(result) {
    document.getElementById("quiz-container").style.display = "none";
    resultContainer.style.display = "block";
    resultContainer.querySelector("h2").textContent = "Possible Solution(s):"; // Update heading
    resultText.textContent = result;
}

loadQuestion();
