document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const questions = [
    {
      question: "What's built there right now?",
      answers: [
        { text: "Residential", followUp: 1 },
        { text: "Commercial", result: "Shoreline District" },
        { text: "Infrastructure", followUp: 5 }
      ]
    },
    {
      question: "What is the main concern?",
      answers: [
        { text: "Environmental Protection", followUp: 2 },
        { text: "New Development", followUp: 3 },
        { text: "Zoning", followUp: 4 }
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
    },
    {
      question: "Are there runoff concerns?",
      answers: [
        { text: "Yes", result: "B" },
        { text: "No", result: "A" }
      ]
    }
  ];

  // Get HTML elements
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const backBtn = document.getElementById("back-btn");
  const startOverBtn = document.getElementById("start-over-btn");

  let currentQuestionIndex = 0;
  let questionHistory = []; 

  // Load a question
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

    backBtn.style.display = questionHistory.length > 0 ? "inline-block" : "none";
    startOverBtn.style.display = "none";
  }

  // Handle answer selection
  function handleAnswer(answer) {
    console.log("Button clicked:", answer.text);

    if (answer.followUp !== undefined) {
      questionHistory.push(currentQuestionIndex);
      currentQuestionIndex = answer.followUp;
      loadQuestion();
    } else if (answer.result) {
      showResult(answer.result);
    }
  }

  // Show result
  function showResult(result) {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultText.innerHTML = result;

    startOverBtn.style.display = "inline-block";
    backBtn.style.display = "none";
  }

  // Go back to the previous question
  function goBack() {
    if (questionHistory.length > 0) {
      currentQuestionIndex = questionHistory.pop();
      loadQuestion();
    }
  }

  // Restart quiz
  function startOver() {
    currentQuestionIndex = 0;
    questionHistory = []; // Clear history
    loadQuestion();
  }

  backBtn.onclick = goBack;
  startOverBtn.onclick = startOver;

  // Start quiz
  loadQuestion();
});
