document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const questions = [
    {
      question: "What are the areas of concern?",
      answers: [
        { text: "Residential Development", followUp: 2 },
        { text: "Commercial Development", followUp: 2 },  
        { text: "Industrial Development", followUp: 2 },
        { text: "Public Open Space", followUp: 2 },
        { text: "Infrastructure/Institutions", followUp: 2 },
        { text: "Historic Resources", followUp: 2 },
        { text: "Tourism/Economic Development", followUp: 2 }
      ]
    },
    {
      question: "Residential Development: What's the main hazard?",  // this is followup 1
      answers: [
        { text: "Public trust access", followUp: 2 },
        { text: "Coastal flooding", followUp: 1 },  // This already points to "What's the main concern?"
        { text: "Erosion", followUp: 1 },
        { text: "Natural features protection", followUp: 2 },
        { text: "Bluff stability", followUp: 1 },
        { text: "Building/Infrastructure protection", followUp: 2 },
        { text: "Urban heat", followUp: 2 }
      ]
    },
    {
      question: "Are you familiar with floodplains?", // this is follow up 2
      answers: [
        { text: "Yes", followUp: 3 },  // Corrected to follow the "Does your community lack any of the following tools?" question (index 3)
        { text: "No", result: `<strong>Floodplains</strong><br>Floodplains are low-lying areas prone to flooding...</strong>` }
      ]
    },
    {
      question: "Residential Development: Does your community lack any of the following tools?", // this is follow up 3
      answers: [
        { text: "Shoreline setbacks", result: '<strong>Design Standards:</strong><br>' },
        { text: "Shoreline overlay district", result: 'Placeholder for Building Moving Standards' },
        { text: "Shoreline district", result: 'Placeholder for Non-Conformities/Variance standards' },
        { text: "Armoring prohibition", result: 'Placeholder' },
        { text: "Policy around land acquisition", result: 'placeholder' }
      ]
    },
    {
      question: "Commercial: What's the main concern?",
      answers: [
        { text: "A", result: "A" },
        { text: "B", result: "B" }
      ]
    },
    {
      question: "Industrial: What's the main concern?",
      answers: [
        { text: "C", result: "C" },
        { text: "D", result: "D" }
      ]
    }
  ]; // <-- Closing the array properly

  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const backBtn = document.getElementById("back-btn");
  const startOverBtn = document.getElementById("start-over-btn");

  let currentQuestionIndex = 0;
  let history = [];

  function loadQuestion() {
    console.log("Loading question:", currentQuestionIndex);
    const questionData = questions[currentQuestionIndex];
    if (!questionData) {
      console.error("No question found at index", currentQuestionIndex);
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
    backBtn.style.display = history.length > 0 ? "block" : "none";
    startOverBtn.style.display = "none";  // Hide Start Over button initially
  }

  function handleAnswer(answer) {
    console.log("Button clicked:", answer.text);
    history.push(currentQuestionIndex);

    if (answer.result) {
      showResult(answer.result);
    } else if (answer.followUp !== undefined) {
      console.log("Follow-up question, moving to index:", answer.followUp);
      currentQuestionIndex = answer.followUp;
      loadQuestion();
    }
  }

  function showResult(result) {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultText.innerHTML = result;
    backBtn.style.display = "block";
    startOverBtn.style.display = "block";  // Show Start Over button when result is shown
  }

  backBtn.addEventListener("click", function () {
    if (history.length > 0) {
      currentQuestionIndex = history.pop();
      loadQuestion();
    }
  });

  startOverBtn.addEventListener("click", function () {
    history = [];
    currentQuestionIndex = 0;
    loadQuestion();
  });

  loadQuestion();
});
