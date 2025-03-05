document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Define the questions and answers
  const questions = [
    {
      question: "What's built there right now?",
      answers: [
        { text: "Residential", followUp: true }, // Trigger the "What is the main concern?" question
        { text: "Commercial", result: "Shoreline District" }, // Immediate result for Commercial
        { text: "Infrastructure", followUp: true }  // Trigger the "Are there runoff concerns?" question
      ]
    },
    {
      question: "What is the main concern?", // Follow-up question for Residential
      answers: [
        { text: "Environmental Protection", result: "Environmental protection is key in maintaining the health of the shoreline." },
        { text: "New Development", result: "New development can introduce risks and challenges for shoreline resilience." },
        { text: "Zoning", result: "Zoning regulations can help manage shoreline development and protect resources." }
      ]
    },
    {
      question: "Are there runoff concerns?", // Follow-up question for Infrastructure
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

  let currentQuestion = 0;

  // Load the first question
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
      btn.classList.add("answer-btn"); // Add styling class
      btn.onclick = () => handleAnswer(answer);
      answersEl.appendChild(btn);
    });

    // Ensure the quiz container is visible and result is hidden
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
  }

  // Handle the selected answer
  function handleAnswer(answer) {
    console.log("Button clicked:", answer.text);
    if (answer.result) {
      showResult(answer.result); // Show the result if available
    } else if (answer.followUp) {
      // Handle follow-up questions
      if (answer.text === "Residential") {
        currentQuestion = 1; // Move to "What is the main concern?" question
      } else if (answer.text === "Infrastructure") {
        currentQuestion = 2; // Move to "Are there runoff concerns?" question
      }
      loadQuestion(); // Load the appropriate follow-up question
    }
  }

  // Display the result
  function showResult(result) {
    quizContainer.style.display = "none"; // Hide the quiz container
    resultContainer.style.display = "block"; // Show the result container
    resultText.innerHTML = result; // Display the result
  }

  // Start the quiz
  loadQuestion();
});
