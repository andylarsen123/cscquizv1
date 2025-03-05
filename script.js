document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const questions = [
    {
      question: "What's built there right now?",
      answers: [
        { text: "Residential", followUp: 1 }, // Points to "What is the main concern?"
        { text: "Commercial", result: "Shoreline District" }, // Direct result for Commercial
        { text: "Infrastructure", followUp: 5 } // Points to "Are there runoff concerns?"
      ]
    },
    {
      question: "What is the main concern?", // Follow-up for Residential
      answers: [
        { text: "Environmental Protection", followUp: 2 }, // Follow-up to "Are you familiar with Floodplains?"
        { text: "New Development", followUp: 3 }, // Follow-up to "Are there design standards in place?"
        { text: "Zoning", followUp: 4 } // Follow-up to "Has the shoreline moved considerably?"
      ]
    },
    {
      question: "Are you familiar with floodplains?", // Follow-up for Environmental Protection
      answers: [
        { text: "Yes", result: "A" },
        { text: "No", result: "B" }
      ]
    },
    {
      question: "Are there design standards in place?", // Follow-up for New Development
      answers: [
        { text: "Yes", result: "A" },
        { text: "No", result: "B" }
      ]
    },
    {
      question: "Has the shoreline moved considerably in the past few years?", // Follow-up for Zoning
      answers: [
        { text: "Yes", result: "Dynamic Zoning" },
        { text: "No", result: "Shoreline District" }
      ]
    },
    {
      question: "Are there runoff concerns?", // Follow-up for Infrastructure
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
  const backBtn = document.getElementById("back-btn"); // Back button element

  let currentQuestionIndex = 0;  // Track which question is currently active
  let questionHistory = []; // Track question history for "Back" functionality

  // Load the question and its possible answers
  function loadQuestion() {
    console.log("Loading question:", currentQuestionIndex); // Debug: Check current question index
    const questionData = questions[currentQuestionIndex];
    if (!questionData) {
      console.error("No question found at index", currentQuestionIndex);
      return;
    }

    // Display the question and reset answers
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

    // Ensure quiz container is visible and result is hidden
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    backBtn.style.display = questionHistory.length > 0 ? "block" : "none"; // Show back button only if there's a history
  }

  // Handle the user's answer selection
  function handleAnswer(answer) {
    console.log("Button clicked:", answer.text);

    if (answer.result) {
      showResult(answer.result); // Show result if available
    } else if (answer.followUp !== undefined) {
      console.log("Follow-up question, moving to index:", answer.followUp); // Debugging follow-up
      questionHistory.push(currentQuestionIndex); // Save current question index for the "Back" button
      currentQuestionIndex = answer.followUp; // Move to the follow-up question
      loadQuestion(); // Load the next question
    }
  }

  // Show the result after answering
  function showResult(result) {
    quizContainer.style.display = "none"; // Hide the quiz
    resultContainer.style.display = "block"; // Show the result container
    resultText.innerHTML = result; // Display the result
    backBtn.style.display = "none"; // Hide the back button on result page
  }

  // Back button functionality
  backBtn.addEventListener("click", function () {
    if (questionHistory.length > 0) {
      currentQuestionIndex = questionHistory.pop(); // Go back to the previous question in history
      loadQuestion(); // Load the previous question
    }
  });

  // Start the quiz by loading the first question
  loadQuestion();
});

