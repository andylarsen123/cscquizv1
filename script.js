document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const questions = [
    {
      question: "What's built there right now?",
      answers: [
        { text: "Residential", result: `
          <strong>Overlay Zone:</strong><br>
          Overlay zones are an additional zoning district layered on an existing zoning district. They introduce an additional standard or regulation over specific areas.<br><br>
          <em>“Think of a transparent plastic sheet laid on top of the zoning map, showing an additional boundary, to illustrate the overlay district.”</em> – MSU Extension<br><br>
          <strong>Why it supports resilience:</strong><br>
          Overlay zones enable communities to enforce stricter regulations to protect shorelines while minimizing disruption to land use patterns.<br><br>
          <strong>How it is used:</strong><br>
          Local governments create overlay zones through zoning ordinances. Floodplain overlays, for example, require stricter construction standards.<br><br>
          <strong>Possible obstacles to implementation:</strong><br>
          - Pushback against additional regulations<br>
          - Challenges with enforcement<br><br>
          <strong>Example: City of Grand Haven’s Sensitive Areas (SA) Overlay District (Sec. 40-442)</strong><br>
          This overlay district covers floodplains, wetlands, dunes, vegetation, species of concern, and slopes.
        `},
        { text: "Commercial", result: "Shoreline District" },
        { text: "Infrastructure", followUp: true }  // This should just lead to the "Are there runoff concerns?" question directly
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
      showResult(answer.result);
    } else if (answer.followUp) {
      // Check if we need to show the "What is the main concern?" question for Residential or "Are there runoff concerns?" for Infrastructure
      if (answer.text === "Infrastructure") {
        currentQuestion = 2; // Move to the "Are there runoff concerns?" question
      } else if (answer.text === "Residential") {
        currentQuestion = 1; // Move to the "What is the main concern?" question
      }
      loadQuestion();
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
