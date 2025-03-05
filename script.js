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
      question: "Are there runoff concerns?",
      answers: [
        { text: "Yes", result: "A" },
        { text: "No", result: "B" }
      ]
    },
    {
      question: "What is the main concern?",
      answers: [
        { text: "Environmental Protection", followUp: true },
        { text: "New Development", followUp: true },
        { text: "Zoning", followUp: true }
      ]
    },
    {
      question: "Are you familiar with Floodplains?",
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

  // Get elements
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const startOverBtn = document.getElementById("start-over-btn");

  let currentQuestion = 0;
  let previousQuestion = null;

  // Load the current question
  function loadQuestion() {
    console.log("Loading question:", currentQuestion);
    const questionData = questions[currentQuestion];
    if (!questionData) {
      console.error("No question found at index", currentQuestion);
      return;
    }

    questionEl.textContent = questionData.question;
    answersEl.innerHTML = ""; // Clear previous answers

    // Create a button for each answer option
    questionData.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer.text;
      btn.classList.add("answer-btn"); // In case we want to add specific styling later
      btn.onclick = () => handleAnswer(answer);
      answersEl.appendChild(btn);
    });

    // Hide the result container and show the quiz container
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";

    // Show the "Start Over" button if this is the last question
    if (currentQuestion === questions.length - 1) {
      startOverBtn.style.display = "inline-block";
    } else {
      startOverBtn.style.display = "none";
    }
  }

  // Handle answer selection
  function handleAnswer(answer) {
    if (answer.result) {
      showResult(answer.result);
    } else if (answer.followUp) {
      previousQuestion = currentQuestion; // Save current question before moving forward
      currentQuestion++; // Move to the next question
      loadQuestion();
    }
  }

  // Show the result
  function showResult(result) {
    quizContainer.style.display = "none"; // Hide quiz
    resultContainer.style.display = "block"; // Show result
    resultText.innerHTML = result; // Show result
  }

  // Start the quiz over
  function startOver() {
    currentQuestion = 0;
    previousQuestion = null;
    loadQuestion();
  }

  // Go back to the previous question
  function goBack() {
    if (previousQuestion !== null) {
      currentQuestion = previousQuestion;
      previousQuestion = null;
      loadQuestion();
    }
  }

  // Attach event listener to the "Start Over" button
  startOverBtn.addEventListener("click", startOver);

  // Attach event listener to the "Back" button (show when needed)
  const backBtn = document.createElement("button");
  backBtn.textContent = "Back";
  backBtn.style.display = "none";
  backBtn.addEventListener("click", goBack);
  document.body.appendChild(backBtn);

  // Start the quiz
  loadQuestion();
});

