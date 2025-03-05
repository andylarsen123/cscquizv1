document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const questions = [
    {
      question: "What's built there right now?",
      answers: [
        { text: "Residential", followUp: true }, // No result immediately, but triggers follow-up question
        { text: "Commercial", result: "Shoreline District" },
        { text: "Infrastructure", followUp: true }  // This leads to "Are there runoff concerns?" question
      ]
    },
    {
      question: "What is the main concern?", // Follow-up question after selecting "Residential"
      answers: [
        { text: "Environmental Protection", result: "Environmental protection is key in maintaining the health of the shoreline." },
        { text: "New Development", result: "New development can introduce risks and challenges for shoreline resilience." },
        { text: "Zoning", result: "Zoning regulations can help manage shoreline development and protect resources." }
      ]
    },
    {
      question: "Are there runoff concerns?", // Follow-up question for "Infrastructure"
      answers: [
        { text: "Yes", result: "B" },
        { text: "No", result: "A" }
      ]
    }
  ];

  // Get elements
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result");
  const resultText = document.getElementById("result-text");

  let currentQuestion = 0;

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

    // Ensure the quiz container is visible and result is hidden
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
  }

  function handleAnswer(answer) {
    console.log("Button clicked:", answer.text);
    if (answer.result) {
      showResult(answer.result); // Show the result directly if there's one
    } else if (answer.followUp) {
      // Check if we need to show the "What is the main concern?" question for Residential or "Are there runoff concerns?" for Infrastructure
      if (answer.text === "Residential") {
        currentQuestion = 1; // Move to the "What is the main concern?" question
      } else if (answer.text === "Infrastructure") {
        currentQuestion = 2; // Move to the "Are there runoff concerns?" question
      }
      loadQuestion(); // Load the appropriate follow-up question
    }
  }

  function showResult(result) {
    quizContainer.style.display = "none"; // Hide quiz
    resultContainer.style.display = "block"; // Show result
    resultText.innerHTML = result; // Use innerHTML for formatting
  }

  // Start the quiz
  loadQuestion();
});
