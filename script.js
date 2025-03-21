document.addEventListener("DOMContentLoaded", function () {
  const quizData = [
    {
      question: "<strong>Coastal Solutions Compendium:</strong><br>Choose an option",
      yesText: "Interactive Tool",
      noText: "View full list of tools (Section C)",
      nextQuestionIndex: 1,
      linkIfNo: "https://example.com/full-tool-list", // Replace with actual link
    },
    {
      question: "Physical Characteristics:<br>Is the shoreline <strong>elevated (bluffs, banks)?</strong>",
      answersIfYes: [
        "Natural Features Setbacks",
        "Natural Features Overlay",
        "Bluff Protection",
      ],
      nextQuestionIndex: 2,
    },
    {
      question: "Physical Characteristics:<br>Are there <strong>bluffs</strong> along the shoreline?",
      answersIfYes: [
        "Natural Features Setbacks", 
        "Natural Features Overlay", 
        "Bluff Protection", 
        "Dynamic Zoning",
      ],
      nextQuestionIndex: 3,
    },
    {
      question: "Physical Characteristics:<br>Is the shoreline <strong>sandy</strong>?",
      answersIfYes: [
        "Shoreline Setbacks", 
        "Dynamic Zoning",
        "Armoring Prohibition",
      ],
      nextQuestionIndex: 4,
    },
    {
      question: "Physical Characteristics:<br>Are there dunes <strong>along the shoreline?</strong>",
      answersIfYes: [
        "Natural Features Setbacks", 
        "Natural Features Overlay", 
        "Dune Protection", 
        "Shoreline Setbacks", 
        "Dynamic Zoning",
        "Armoring Prohibition",
      ],
      nextQuestionIndex: 5,
    },
    {
      question: "Physical Characteristics:<br>Are there <strong>coarse sediment beaches</strong> along the shoreline?",
      answersIfYes: [
        "Shoreline Setbacks", 
        "Armoring Prohibition",
      ],
      nextQuestionIndex: 6,
    },
    {
      question: "Physical Characteristics:<br>Is there <strong>bedrock</strong> along the shoreline?",
      answersIfYes: [
        "Shoreline Setbacks",         
      ],
      nextQuestionIndex: 7,
    },
    {
      question: "Physical Characteristics:<br>Are there <strong>wetlands</strong> along the shoreline?",
      answersIfYes: [
        "Natural Features Setbacks",
        "Natural Features Overlay",
        "Wetlands Protection",
        "Shoreline Setbacks",   
        "Armoring Prohibition",
        "Natural Shoreline Requirements",
        "Stormwater Management Requirements / Green Infrastructure",
      ],
      nextQuestionIndex: 8,
    },
    {
      question: "Physical Characteristics:<br>Is the shoreline <strong>armored (seawalls, riprap, etc.)?</strong>",
      answersIfYes: [
        "Armoring Prohibition",
        "Retreat / Building Moving",
        "Impervious Surface Standards",
      ],
      nextQuestionIndex: 9,
    },
    {
      question: "Physical Characteristics:<br>Are there <strong>sensitive environmental areas</strong> along the shoreline?",
      answersIfYes: [
        "Natural Features Setbacks",
        "Natural Features Overlay",
        "Sensitive Environmental Areas",
        "Shoreline Setbacks",
        "Armoring Prohibition",
        "Temporary Shoreline Protections (Sandbags, Geotubes)",
        "Natural Shoreline Requirements",
        "Retreat / Building Moving",
        "Impervious Surface Standards",
      ],
      nextQuestionIndex: 10,
    },
    {
      question: "Physical Characteristics:<br>Are there <strong>high risk erosion areas</strong> along the shoreline?",
      answersIfYes: [
        "Natural Features Setbacks",
        "Natural Features Overlay",
        "High Risk Erosion Area Protection",
        "Shoreline Setbacks",
        "Dynamic Zoning",
        "Armoring Prohibition",
        "Temporary Shoreline Protections (Sandbags, Geotubes)",
        "Natural Shoreline Requirements",
        "Retreat / Building Moving",
        "Impervious Surface Standards",
      ],
      nextQuestionIndex: 11,
    },
    {
      question: "Physical Characteristics:<br>Are there <strong>designated floodplains</strong> along the shoreline?",
      answersIfYes: [
        "Natural Features Setbacks",
        "Natural Features Overlay",
        "Floodplain Overlay District",
        "Shoreline Setbacks",
        "Armoring Prohibition",
        "Temporary Shoreline Protections (Sandbags, Geotubes)",
        "Natural Shoreline Requirements",
        "Retreat / Building Moving",
        "Impervious Surface Standards",
        "Stormwater Management Requirements / Green Infrastructure",
      ],
      nextQuestionIndex: 12,
    },
    {
      question: "Physical Characteristics:<br>Is the <strong>character of the shoreline</strong> similar across your community?",
      answersIfYes: [
        "Shoreline Setbacks",
        "Shoreline District",
        "Natural Shoreline Requirements",
        "Impervious Surface Standards",
        "Stormwater Management Requirements / Green Infrastructure",
      ],
      nextQuestionIndex: 13,
    },
    {
      question: "Development:<br>Does development <strong>already exist</strong> within 50ft of the shoreline?",
      answersIfYes: [
        "Nonconformities and Variance Standards",
        "Armoring Prohibition",
        "Temporary Shoreline Protections (Sandbags, Geotubes)",
        "Retreat / Building Moving",
        
      ],
      nextQuestionIndex: 14,
    },
    {
      question: "Development:<br>Do you <strong>anticipate new development or redevelopment</strong> within 50 feet of your shoreline?",
      answersIfYes: [
        "Shoreline Setbacks",
        "Site Condos",
        "Armoring Prohibition",
        "Retreat / Building Moving",
      ],
      nextQuestionIndex: 15,
    },
    {
      question: "Development:<br>Is there shoreline property which is experiencing <strong>erosion</strong>?",
      answersIfYes: [
        "Shoreline Setbacks",
        "Dynamic Zoning",
        "Land Division Regulations",
        "Long Lots",
        "Armoring Prohibition",
        "Temporary Shoreline Protections (Sandbags, Geotubes)",
        "Natural Shoreline Requirements",
        "Retreat / Building Moving",
      ],
      nextQuestionIndex: 16,
    },
    {
      question: "Development:<br>Is there shoreline property which is experiencing <strong>flooding</strong>?",
      answersIfYes: [
        "Shoreline Setbacks",
        "Land Division Regulations",
        "Long Lots",
        "Armoring Prohibition",
        "Temporary Shoreline Protections (Sandbags, Geotubes)",
        "Natural Shoreline Requirements",
        "Retreat / Building Moving",
        "Impervious Surface Standards",
        "Stormwater Management Requirements / Green Infrastructure",
        "Open Space Requirements",
      ],
      nextQuestionIndex: 17,
    },
    {
      question: "Development:<br>Are there <strong>existing or desired shoreline-specific uses</strong>, such as marinas?",
      answersIfYes: [
        "Shoreline Setbacks",
        "Land Division Regulations",
        "Long Lots",
        "Armoring Prohibition",
        "Temporary Shoreline Protections (Sandbags, Geotubes)",
        "Natural Shoreline Requirements",
        "Retreat / Building Moving",
        "Impervious Surface Standards",
        "Stormwater Management Requirements / Green Infrastructure",
        "Open Space Requirements",
      ],
      nextQuestionIndex: 18,
    },
    {
      question: "Priorities:<br>Is your community concerned about <strong>invasive plant or animal species</strong>",
      answersIfYes: [
        "Invasive Species Prohibition",
      ],
      nextQuestionIndex: 19,
    },
    {
      question: "Priorities:<br>Is your community concerned about <strong>water quality?</strong>",
      answersIfYes: [
        "Natural Shoreline Requirements",
        "Impervious Surface Standards",
        "Stormwater Management Requirements / Green Infrastructure",
      ],
      nextQuestionIndex: 20,
    },
    {
      question: "Priorities:<br>Is it a priority for your community to <strong>preserve or create access to the shoreline?</strong>",
      answersIfYes: [
        "Shoreline Setbacks", 
        "Land Division Regulations",
        "Long Lots",
        "Armoring Prohibition",
        "Temporary Shoreline Protections (Sandbags, Geotubes)",
        "Stormwater Management Requirements / Green Infrastructure",
        "Open Space Requirements",
      ],
      nextQuestionIndex: null,
    },
  ];

  let answers = new Set(); // Use a Set to store unique answers
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
    answers = new Set(); // Reset the answers Set
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
    questionText.innerHTML = qData.question;

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
      qData.answersIfYes.forEach(answer => answers.add(answer)); // Add answers uniquely
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
    answersList.innerHTML = answers.size
      ? Array.from(answers).map(answer => `<li>${answer}</li>`).join("")
      : "<li>No recommendations.</li>";
    restartBtn.style.display = "inline-block";
  }

  restartBtn.addEventListener("click", startQuiz);

  // Start the quiz initially
  startQuiz();
});

