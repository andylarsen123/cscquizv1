document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const questions = [
    {
      question: "What's built there right now?",
      answers: [
        { text: "Residential", followUp: 1 },
        { text: "Commercial", followUp: 3 },  // No change
        { text: "Infrastructure", followUp: 4 }
      ]
    },
    {
      question: "What's the main concern?",
      answers: [
        { text: "Extreme Weather Events", followUp: 2 },
        { text: "New Development", followUp: 5 },  // Redirect to the same main concern question
        { text: "Zoning", followUp: 4 }
      ]
    },
    {
      question: "Are you familiar with floodplains?",
      answers: [
        { text: "Yes", followUp: 6 },  // Updated to lead to "Does your community lack any of the following tools?"
        { text: "No", result: `<strong>Floodplains</strong><br>Floodplains are low-lying areas prone to flooding...</strong>` }
      ]
    },
    {
      question: "Does your community lack any of the following tools?",
      answers: [
        { text: "Design standards", result: `<strong>Design Standards:</strong><br>The Michigan Zoning Enabling Act...` },
        { text: "Building moving standards", result: "Placeholder for Building Moving Standards" },
        { text: "Non-Conformities/Variance standards", result: "Placeholder for Non-Conformities/Variance standards" }
      ]
    },
    {
      question: "What's the main concern?",
      answers: [
        { text: "A", result: "A" },
        { text: "B", result: "B" }
      ]
    },
    {
      question: "What's the main concern?",
      answers: [
        { text: "C", result: "C" },
        { text: "D", result: "D" }
      ]
    }
  ]; // <-- Closing the array properly

  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const backBtn = document.getElementById("back-btn");
  const startOverBtn = document.getElementById("start-over-btn");

  let currentQuestionIndex = 0;
  let history = [];

  function loadQuestion() {
    console.log("Loading question:", currentQuestionIndex);
    const questionData = questions[currentQuestionIndex];
    if (!questionData) {
      console.error("No question found at index", currentQuestionIndex);
      return;
    }

    questionEl.textContent = questionData.question;
    answersEl.innerHTML = "";

    questionData.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer.text;
      btn.classList.add("answer-btn");
      btn.onclick = () => handleAnswer(answer);
      answersEl.appendChild(btn);
    });

    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    backBtn.style.display = history.length > 0 ? "block" : "none";
    startOverBtn.style.display = "none";  // Hide Start Over button initially
  }

  function handleAnswer(answer) {
    console.log("Button clicked:", answer.text);
    history.push(currentQuestionIndex);

    if (answer.result) {
      showResult(answer.result);
    } else if (answer.followUp !== undefined) {
      console.log("Follow-up question, moving to index:", answer.followUp);
      currentQuestionIndex = answer.followUp;
      loadQuestion();
    }
  }

  function showResult(result) {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultText.innerHTML = result;
    backBtn.style.display = "block";
    startOverBtn.style.display = "block";  // Show Start Over button when result is shown
  }

  backBtn.addEventListener("click", function () {
    if (history.length > 0) {
      currentQuestionIndex = history.pop();
      loadQuestion();
    }
  });

  startOverBtn.addEventListener("click", function () {
    history = [];
    currentQuestionIndex = 0;
    loadQuestion();
  });

  loadQuestion();
});
