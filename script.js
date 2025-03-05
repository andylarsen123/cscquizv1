document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const questions = [
    // Your questions here (same as before)
  ];

  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const startOverBtn = document.getElementById("start-over-btn"); // Start Over button

  let currentQuestion = 0;

  function loadQuestion() {
    const questionData = questions[currentQuestion];
    if (!questionData) {
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
    startOverBtn.style.display = "none"; // Hide the Start Over button during quiz
  }

  function handleAnswer(answer) {
    if (answer.result) {
      showResult(answer.result);
    } else if (answer.followUp) {
      currentQuestion++;
      loadQuestion();
    }
  }

  function showResult(result) {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultText.innerHTML = result;
    startOverBtn.style.display = "block"; // Show Start Over button after result
  }

  // Start Over function
  function startOver() {
    currentQuestion = 0; // Reset to the first question
    loadQuestion(); // Reload the first question
    startOverBtn.style.display = "none"; // Hide Start Over button again during quiz
  }

  startOverBtn.addEventListener("click", startOver);

  loadQuestion(); // Start the quiz when the page loads
});
