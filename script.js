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
      question: "Are you familiar with Floodplains?", // Follow-up for Environmental Protection
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

  let currentQuestionIndex = 0;  // Track which question is currently active

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
      btn.textContent = answe
