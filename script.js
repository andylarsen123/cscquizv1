document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const questions = [
    {
      question: "What's built there right now?",
      answers: [
        { text: "Residential", followUp: 1 }, // Points to the "What is the main concern?" question
        { text: "Commercial", result: "Shoreline District" }, // Direct result for Commercial
        { text: "Infrastructure", followUp: 2 } // Points to the "Are there runoff concerns?" question
      ]
    },
    {
      question: "What is the main concern?", // Follow-up question for Residential
      answers: [
        { text: "Environmental Protection", result: "Environmental protection is key to maintaining the health of the shoreline." },
        { text: "New Development", result: "New development can introduce risks and challenges for shoreline resilience." },
        { text: "Zoning", result: "Zoning regulations help manage shoreline development and protect resources." }
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

  let currentQuestionIndex = 0;  // Track which question is currently active

  // Load the question and its possible answers
  function loadQuestion() {
    console.log("Loading question:", currentQuestionIndex);
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

    // Hide quiz and show result
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
  }

  // Handle the user's answer selection
  function handleAnswer(answer) {
    console.log("Button clicked:", answer.text);

    if (answer.result) {
      showResult(answer.result); // Show result if available
    } else if (answer.followUp !== undefined) {
      // Move to the follow-up question based on the followUp index
      currentQuestionIndex = answer.followUp;
      loadQuestion(); // Load the next question
    }
  }

  // Show the result after answering
  function showResult(result) {
    quizContainer.style.display = "none"; // Hide the quiz
    resultContainer.style.display = "block"; // Show the result container
    resultText.innerHTML = result; // Display the result
  }

  // Start the quiz by loading the first question
  loadQuestion();
});
