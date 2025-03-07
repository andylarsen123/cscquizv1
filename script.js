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
        { text: "No", result: `<strong>Floodplains</strong><br>Floodplains are low-lying areas prone to flooding...
        
        
        
        
        
        
        
        </strong>` }
      ]
    },
    {
      question: "Residential Development: Does your community lack any of the following tools?", // this is follow up 3
      answers: [
        { text: "Shoreline setbacks", result: "<strong>Design Standards:</strong><br>The Michigan Zoning Enabling Act provides broad zoning authority that allows communities to regulate the appearance, form, and site layout of buildings. The act enables communities to establish design standards along with a design review process.<br><br><strong>Why it supports resilience:</strong><br>Clear standards for construction and land use ensure that new developments or renovations are built to withstand coastal hazards and do not reduce a community's overall resilience.<br><br><strong>How it is used:</strong><br>Some design standards may include requirements related to landscaping, home designs, and home locations. Landscaping requirements could include preserving and utilizing native vegetation, minimizing impervious surfaces, and prohibiting the clearing or alteration of dunes. Home design standards may encourage reusing existing foundations, avoiding multi-lane or paved driveways, and minimizing erosion by dispersing runoff rather than using a single point of discharge. Additionally, home placement standards may include recommendations to situate homes in areas with lower tree density, build away from the crest of the dune, and orient structures so that their long axis runs across the slope.<br><br><strong>Possible obstacles to implementation:</strong><br>Striking a balance between development and preservation can be challenging, as these additional requirements can increase development costs.<br>Enforcing design standards can be challenging, leading to inconsistencies in application.<br><br><strong>Example:</strong> Saugatuck Township’s Development Prohibition (Sec. 18-30):<br>“All development shall be prohibited within Areas of Special Flood Hazard established in section 18-28.”" },
        { text: "Shoreline overlay district", result: '"<strong>Overlay zone:</strong><br>Overlay zones are an additional zoning district layered on an existing zoning district. They are typically used to introduce an additional standard or regulation over specific areas. “Think of a transparent plastic sheet laid on top of the zoning map, showing an additional boundary, to illustrate the overlay district.” – MSU Extension<br><br><strong>Why it supports resilience:</strong><br>For a similar reason as shoreline districts, overlay zones enable communities to enforce stricter regulations to protect shorelines. However, an overlay zone allows communities to minimize disruption to overall land use patterns already in place.<br><br><strong>How it is used:</strong><br>Local governments can create overlay zones through zoning ordinances. Applications such as floodplain overlays can require stricter construction standards that reduce vulnerability to flooding, erosion, and sea level rise.<br><br><strong>Possible obstacles to implementation:</strong><br>Pushback against additional regulations.<br>Challenges with administration and enforcement of standards within the overlay district.<br><br><strong>Example:</strong> City of Grand Haven’s Sensitive Areas (SA) Overlay District (Sec. 40-442):<br>Along with a Beach Overlay District, the City of Grand Haven has an overlay district that covers floodplains, wetlands/streams, dunes/Lake Michigan shoreline, vegetation/habitat, species of concern, and slopes. Land development within a SA Overlay District requires compliance with strict conditions set to protect areas of environmental significance."' },
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
