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

  // Ensure results section is hidden initially
  resultsDiv.classList.add("hidden");

  function startQuiz() {
    answers = [];
    questionHistory = [];
    currentQuestionIndex = 0;
    // Show quiz controls, hide results
    yesBtn.style.display = "inline-block";
    noBtn.style.display = "inline-block";
    backBtn.style.display = "none";
    resultsDiv.classList.add("hidden");
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
      backBtn.style.display = "none";
    } else {
      yesBtn.textContent = "Yes";
      noBtn.textContent = "No";
      backBtn.style.display = "inline-block";
    }
  }

  yesBtn.addEventListener("click", () => {
    let qData = quizData[currentQuestionIndex];
    if (qData.answersIfYes) {
      answers.push(...qData.answersIfYes);
    }
    if (qData.nextQuestionIndex !== null) {
      questionHistory.push(currentQuestionIndex); // Save history
      currentQuestionIndex = qData.nextQuestionIndex;
      showQuestion();
    } else {
      displayResults();
    }
  });

  noBtn.addEventListener("click", () => {
    let qData = quizData[currentQuestionIndex];
    if (qData.linkIfNo) {
      window.open(qData.linkIfNo, "_blank"); // Open in a new tab
      resetQuiz();
      return;
    }
    if (qData.nextQuestionIndex !== null) {
      questionHistory.push(currentQuestionIndex); // Save history
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
    questionText.textContent = "Quiz Complete!";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    backBtn.style.display = "none";
    resultsDiv.classList.remove("hidden"); // Show results section
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
  }

  // Start the quiz initially
  startQuiz();
});


