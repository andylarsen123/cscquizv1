document.addEventListener("DOMContentLoaded", function () {
  const quizData = [
    {
      question: "Coastal Solutions Compendium: Choose an option",
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
  const resultsDiv = document.getElementById("results");
  const answersList = document.getElementById("answers-list");
  const restartBtn = document.getElementById("restart-btn");

  // Hide results and restart button on page load
  resultsDiv.classList.add("hidden");
  restartBtn.style.display = "none";

  function startQuiz() {
    answers = [];
    questionHistory = [];
    currentQuestionIndex = 0;

    // Show the question and option buttons; always hide the restart button during the quiz
    yesBtn.style.display = "inline-block";
    noBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
    resultsDiv.classList.add("hidden");
    questionText.classList.remove("hidden");

    showQuestion();
  }

  function showQuestion() {
    let qData = quizData[currentQuestionIndex];
    if (!qData) {
      // If no question data exists, display results.
      displayResults();
      return;
    }
    questionText.textContent = qData.question;

    // Use custom button text on the first question
    if (currentQuestionIndex === 0) {
      yesBtn.textContent = qData.yesText;
      noBtn.textContent = qData.noText;
    } else {
      yesBtn.textContent = "Yes";
      noBtn.textContent = "No";
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
      // Restart the quiz if an external link is opened.
      startQuiz();
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

  function displayResults() {
    // Hide the question and option buttons
    questionText.classList.add("hidden");
    yesBtn.style.display = "none";
    noBtn.style.display = "none";

    // Show results and the restart button only at the final screen
    resultsDiv.classList.remove("hidden");
    answersList.innerHTML = answers.length
      ? answers.map((answer) => `<li>${answer}</li>`).join("")
      : "<li>No recommendations.</li>";
    restartBtn.style.display = "inline-block";
  }

  restartBtn.addEventListener("click", startQuiz);

  // Start the quiz initially
  startQuiz();
});
