document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

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
            question: "Are you familiar with floodplains?",
            answers: [
                { text: "Yes", result: "A" },
                { text: "No", result: "B" }
            ]
        },
        {
            question: "Are there design standards in place?",
            answers: [
                { text: "Yes", result: "A" },
                { text: "No", result: "B" }
            ]
        },
        {
            question: "Has the shoreline moved considerably in the past few years?",
            answers: [
                { text: "Yes", result: "Dynamic Zoning" },
                { text: "No", result: "Shoreline District" }
            ]
        }
    ];

    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result");
    const resultText = document.getElementById("result-text");
    const startOverBtn = document.getElementById("start-over-btn");

    let currentQuestion = 0;

    // Function to load the current question and answers
    function loadQuestion() {
        const questionData = questions[currentQuestion];
        if (!questionData) {
            return;
        }
        questionEl.textContent = questionData.question;
        answersEl.innerHTML = ""; // Clear previous answers

        // Create a button for each answer option
        questionData.answers.forEach(answer => {
            const btn = document.createElement("button");
            btn.textContent = answer.text;
            btn.classList.add("answer-btn");
            btn.onclick = () => handleAnswer(answer);
            answersEl.appendChild(btn);
        });

        quizContainer.style.display = "block";
        resultContainer.style.display = "none";
        startOverBtn.style.display = "none"; // Hide Start Over button during the quiz
    }

    // Function to handle the answer selection
    function handleAnswer(answer) {
        if (answer.result) {
            showResult(answer.result); // Show result if available
        } else if (answer.followUp) {
            currentQuestion++; // Move to next question for follow-up
            loadQuestion();
        }
    }

    // Function to display the result
    function showResult(result) {
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
        resultText.innerHTML = result;
        startOverBtn.style.display = "block"; // Show Start Over button after result
    }

    // Function to restart the quiz
    function startOver() {
        currentQuestion = 0; // Reset to the first question
        loadQuestion(); // Reload the first question
        startOverBtn.style.display = "none"; // Hide Start Over button during quiz
    }

    startOverBtn.addEventListener("click", startOver);

    // Start the quiz when the page loads
    loadQuestion();
});
