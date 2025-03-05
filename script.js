document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const questions = [
    {
      question: "What's built there right now?",
      answers: [
        { text: "Residential", followUp: 1 },
        { text: "Commercial", followUp: 3 },
        { text: "Infrastructure", followUp: 4 }
      ]
    },
    {
      question: "What's the main concern?",
      answers: [
        { text: "Extreme Weather Events", followUp: 2 },
        { text: "New Development", followUp: 3 },
        { text: "Zoning", followUp: 4 }
      ]
    },
    {
      question: "Are you familiar with floodplains?",
      answers: [
        { text: "Yes", result: "A" },
        {
          text: "No",
          result: `<strong>Floodplains</strong><br>
          Floodplains are low-lying areas prone to flooding. This flooding may result from rainfall, storm surges, or other causes.<br><br>
          <strong>Why it supports resilience:</strong><br>
          Floodplain maps, created by FEMA, help identify areas at risk of flooding and can be used as a tool for creating overlay districts.
          According to EGLE, of the 1,776 communities in Michigan (including cities, villages, and townships), about 1,004 currently have FEMA-developed floodplain maps.<br><br>
          <strong>How it is used:</strong><br>
          Local governments can use floodplain maps to establish flood zones and regulate where and how development can occur in those areas.
          To view flood maps specific to your community, visit <a href='https://www.fema.gov/flood-maps' target='_blank'>fema.gov/flood-maps</a>.<br><br>
          <strong>Possible obstacles to implementation:</strong><br>
          Maps may become inaccurate due to frequently changing climate patterns and accelerated climate change.<br>
          Communities may face pushback when enforcing restrictions.<br><br>
          <strong>Example:</strong> Chikaming Township’s Ordinance No. 35<br>
          The ordinance regulates buildings and structures in Chikaming Township’s floodplain district, based on a study that identified floodplains.`
        }
      ]
    },
    {
      question: "What's the main concern?",
      answers: [
        { text: "A", result: "A" },
        { text: "B", result: "B" }
      ]
    },
    {
      question: "What's the main concern?",
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
