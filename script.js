document.addEventListener("DOMContentLoaded", function () {
  const quizData = [
    {
      question:
        "Would you like to use the interactive tool or view the full tool list?",
      yesText: "Interactive Tool",
      noText: "View full list of tools (Section C)",
      nextQuestionIndex: 1,
      linkIfNo: "https://example.com/full-tool-list", // Replace with actual link
    },
    {
      question: "Is the shoreline elevated?",
      answersIfYes: [
        "Natural Features Setbacks",
        "Natural Overlays Features",
        "Bluff Protection",
      ],
      nextQuestionIndex: 2,
    },
    {
      question: "Is there bedrock along the shoreline?",
      answersIfYes: ["Shoreline Setback"],
      nextQuestionIndex: 3,
    },
    {
      question: "Is the area prone to erosion?",
      answersIfYes: ["Erosion Hazard Zone", "Additional Setback"],
      nextQuestionIndex: null, // End of quiz
    },
  ];

  let answers = [];
  let currentQuestionIndex = 0;
  let questionHistory = []; // Track previous questions

  const questionText = document.getElementById("question-text");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const backBtn = document.getElementById("back-btn");
  const resultsDiv = document.getElementById("results");
  const answersList = document.getElementById("answers-list");
  const restartBtn = document.getElementById("restart-btn");
  const controlButtons = document.getElementById("control-buttons"); // Container for control buttons

  // Hide results and control buttons on page load
  resultsDiv.classList.add("hidden");
  backBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");
  controlButtons.classList.add("hidden");

  function startQuiz() {
    answers = [];
    questionHistory = [];
    currentQuestionIndex = 0;
    yesBtn.style.display = "inline-block";
    noBtn.style.display = "inline-block";
    // For the first question, hide both buttons:
    backBtn.classList.add("hidden");
    restartBtn.classList.add("hidden");
    controlButtons.classList.add("hidden");
    resultsDiv.classList.add("hidden");
    questionText.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    let qData = quizData[currentQuestionIndex];
    if (!qData) {
      displayResults();
      return;
    }
    questionText.textContent = qData.question;
    if (currentQuestionIndex === 0) {
      yesBtn.textContent = qData.yesText;
      noBtn.textContent = qData.noText;
      backBtn.classList.add("hidden");
      restartBtn.classList.add("hidden");
      controlButtons.classList.add("hidden");
    } else {
      yesBtn.textContent = "Yes";
      noBtn.textContent = "No";
      // Always show back button when we're past the first question:
      backBtn.classList.remove("hidden");
      // Show restart button as well:
      restartBtn.classList.remove("hidden");
      controlButtons.classList.remove("hidden");
    }
  }

  yesBtn.addEventListener("click", () => {
    let qData = quizData[currentQuestionIndex];
    if (qData.answersIfYes) {
      answers.push(...qData.answersIfYes);
    }
    if (qData.nextQuestionIndex !== null) {
      questionHistory.push(currentQuestionIndex);
      currentQuestionIndex = qData.nextQuestionIndex;
      showQuestion();
    } else {
      displayResults();
    }
  });

  noBtn.addEventListener("click", () => {
    let qData = quizData[currentQuestionIndex];
    if (qData.linkIfNo) {
      window.open(qData.linkIfNo, "_blank");
      resetQuiz();
      return;
    }
    if (qData.nextQuestionIndex !== null) {
      questionHistory.push(currentQuestionIndex);
      currentQuestionIndex = qData.nextQuestionIndex;
      showQuestion();
    } else {
      displayResults();
    }
  });

  backBtn.addEventListener("click", () => {
    if (questionHistory.length > 0) {
      currentQuestionIndex = questionHistory.pop();
      showQuestion();
    }
  });

  function displayResults() {
    // Hide question text and yes/no buttons at the end
    questionText.classList.add("hidden");
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    // Hide back button at the end; only show restart button
    backBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    controlButtons.classList.remove("hidden");
    resultsDiv.classList.remove("hidden");
    answersList.innerHTML = answers.length
      ? answers.map((answer) => `<li>${answer}</li>`).join("")
      : "<li>No recommendations.</li>";
  }

  restartBtn.addEventListener("click", startQuiz);

  function resetQuiz() {
    questionText.textContent =
      "Quiz canceled. Refresh the page or restart to try again.";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    backBtn.classList.add("hidden");
    resultsDiv.classList.add("hidden");
    controlButtons.classList.add("hidden");
    restartBtn.classList.remove("hidden");
  }

  // Start the quiz initially
  startQuiz();
});



