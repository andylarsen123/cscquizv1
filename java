const quizData = [
    {
        question: "What’s your favorite color?",
        answers: [
            { text: "Blue", result: "Calm and collected" },
            { text: "Red", result: "Passionate and energetic" },
            { text: "Green", result: "Balanced and nature-loving" }
        ]
    },
    {
        question: "Pick a weekend activity:",
        answers: [
            { text: "Hiking", result: "Adventurous spirit" },
            { text: "Reading", result: "Deep thinker" },
            { text: "Partying", result: "Social butterfly" }
        ]
    }
];

let currentQuestion = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const resultText = document.getElementById("result-text");

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    questionEl.textContent = questionData.question;
    answersEl.innerHTML = "";

    questionData.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.onclick = () => {
            userAnswers.push(answer.result);
            nextBtn.style.display = "block";
        };
        answersEl.appendChild(btn);
    });
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        nextBtn.style.display = "none";
    } else {
        showResult();
    }
};

function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    resultContainer.style.display = "block";
    resultText.textContent = `You are: ${userAnswers.join(", ")}`;
}

loadQuestion();
