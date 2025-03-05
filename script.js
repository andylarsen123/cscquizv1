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
        { text: "Yes", followUp: 5 },
        { text: "No", result: `<strong>Floodplains</strong><br>
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
      question: "Does your community lack any of the following tools?",
      answers: [
        { text: "Design standards", result: `<strong>Design Standards:</strong><br>
        The Michigan Zoning Enabling Act provides broad zoning authority that allows communities to regulate the appearance, form, and site layout of buildings. The act enables communities to establish design standards along with a design review process.<br><br>
        <strong>Why it supports resilience:</strong><br>
        Clear standards for construction and land use ensure that new developments or renovations are built to withstand coastal hazards and do not reduce a community's overall resilience.<br><br>
        <strong>How it is used:</strong><br>
        Some design standards may include requirements related to landscaping, home designs, and home locations. Landscaping requirements could include preserving and utilizing native vegetation, minimizing impervious surfaces, and prohibiting the clearing or alteration of dunes. Home design standards may encourage reusing existing foundations, avoiding multi-lane or paved driveways, and minimizing erosion by dispersing runoff rather than using a single point of discharge. Additionally, home placement standards may include recommendations to situate homes in areas with lower tree density, build away from the crest of the dune, and orient structures so that their long axis runs across the slope.<br><br>
        <strong>Possible obstacles to implementation:</strong><br>
        Striking a balance between development and preservation can be challenging, as these additional requirements can increase development costs.<br>
        Enforcing design standards can be challenging, leading to inconsistencies in application.<br><br>
        <strong>Example:</strong> Saugatuck Township’s Development Prohibition (Sec. 18-30):<br>
        “All development shall be prohibited within Areas of Special Flood Hazard established in section 18-28.”`
        },
        { text: "Building moving standards", result: `<strong>Building Moving Standards:</strong><br>
        Building moving standards are local regulations or guidelines that govern the relocation of structures at risk due to shoreline erosion or other environmental factors. These standards may require, allow, or provide guidance on moving buildings away from vulnerable areas.<br><br>
        <strong>Why it supports resilience:</strong><br>
        This process typically involves relocating structures away from the shoreline to reduce exposure to hazards like flooding, storm surges, or further erosion.<br><br>
        <strong>How it is used:</strong><br>
        Building moving standards established by local governments facilitate the relocation of buildings from shorelines that are experiencing continuous erosion.<br><br>
        <strong>Possible obstacles to implementation:</strong><br>
        The costs associated with moving an entire structure can be significant.<br>
        Finding suitable space to relocate or establish standards can be difficult, especially if the surrounding area is already developed.<br><br>
        <strong>Example:</strong> Pere Marquette Township’s intentions for their High Risk Erosion Overlay Zone (Sec. 109-19.01):<br>
        “(b) Regulate the density of development of lands in the High Risk Erosion Overlay Zone to ensure the ability to move a readily moveable structure within its lot or building area, to reduce potential problems with obtaining potable well water and properly operating septic systems in light of the conditions in the area and the lack of public water and sewer service, and to be consistent with the general single-family residence character of the vicinity.”`
        },
        { text: "Non-Conformities/Variance standards", result: "Placeholder for Non-Conformities/Variance standards" }
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
