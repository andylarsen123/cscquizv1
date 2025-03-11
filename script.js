document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  const questions = [
    {
      question: "What are the areas of concern?", // NOT A FOLLOWUP
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
      question: "Residential Development: What's the main hazard?", // this is followup 1
      answers: [
        { text: "Diminishing public trust access", followUp: 3 },
        { text: "Coastal flooding", followUp: 4 },  // This already points to "What's the main concern?"
        { text: "Erosion", followUp: 5 },
        { text: "Natural features protection", followUp: 5 },
        { text: "Bluff stability", followUp: 5 },
        { text: "Building/Infrastructure protection", followUp: 5 },
        { text: "Urban heat", followUp: 5 }
      ]
    },
    {
      question: "Are you familiar with floodplains?", // this is follow up 2
      answers: [
        { text: "Yes", followUp: 1 },  // Corrected to follow the "Does your community lack any of the following tools?" question (index 3)
        { text: "No", result: "<strong>Acknowledging Floodplains:</strong><br>Floodplains are low-lying areas prone to flooding. This flooding may result from rainfall, storm surges, or other causes.<br><br><strong>Why it supports resilience:</strong><br>Floodplain maps, created by FEMA, help identify areas at risk of flooding and can be used as a tool for creating overlay districts. According to EGLE, of the 1,776 communities in Michigan (including cities, villages, and townships), about 1,004 currently have FEMA-developed floodplain maps.<br><br><strong>How it is used:</strong><br>Local governments can use floodplain maps to establish flood zones and regulate where and how development can occur in those areas. To view flood maps specific to your community, visit <a href='https://www.fema.gov/flood-maps' target='_blank'>fema.gov/flood-maps</a><br><br><strong>Possible obstacles to implementation:</strong><br>Maps may become inaccurate due to frequently changing climate patterns and accelerated climate change.<br>Communities may face pushback when enforcing restrictions.<br><br><strong>Example:</strong><br> Chikaming Township’s Ordinance No. 35:<br>The ordinance regulates buildings and structures in Chikaming Township’s floodplain district, based on a study that identified floodplains." },
      ]
    },
    {
      question: "Public trust access: Does your community lack any of the following tools?", // this is follow up 3
      answers: [
        { text: "Shoreline setbacks", result: "<strong>Shoreline setbacks:</strong><br><br>Shoreline setbacks require new development to be a certain distance away from the shoreline, typically measured from the ordinary high-water mark or a reference point.<br><be><strong>How it is used:</strong><br>Shoreline setbacks can be established by a local community through zoning and/or ordinances.<br><br>“The cheapest coastal protection is the one that you don’t need to build, because the building has a proper setback.” – Urban Land Institute<br><br><strong>Possible obstacles to implementation:</strong><br>-Setbacks may be viewed as restrictions on development potential<br>-Setback distances need to be adjusted in the future to reflect changes in sea levels and erosion<br><br><strong>Example:<br></strong> Saugatuck Township’s Development Prohibition (Sec. 18-30):<br>“All development shall be prohibited within Areas of Special Flood Hazard established in section 18-28.”" },
        { text: "Shoreline overlay district", result: "<strong>Overlay zone:</strong><br>Overlay zones are an additional zoning district layered on an existing zoning district. They are typically used to introduce an additional standard or regulation over specific areas. “Think of a transparent plastic sheet laid on top of the zoning map, showing an additional boundary, to illustrate the overlay district.” – MSU Extension<br><br><strong>Why it supports resilience:</strong><br>For a similar reason as shoreline districts, overlay zones enable communities to enforce stricter regulations to protect shorelines. However, an overlay zone allows communities to minimize disruption to overall land use patterns already in place.<br><br><strong>How it is used:</strong><br>Local governments can create overlay zones through zoning ordinances. Applications such as floodplain overlays can require stricter construction standards that reduce vulnerability to flooding, erosion, and sea level rise.<br><br><strong>Possible obstacles to implementation:</strong><br>-Pushback against additional regulations.<br>-Challenges with administration and enforcement of standards within the overlay district.<br><br><strong>Example:<br></strong> City of Grand Haven’s Sensitive Areas (SA) Overlay District (Sec. 40-442):<br>Along with a Beach Overlay District, the City of Grand Haven has an overlay district that covers floodplains, wetlands/streams, dunes/Lake Michigan shoreline, vegetation/habitat, species of concern, and slopes. Land development within a SA Overlay District requires compliance with strict conditions set to protect areas of environmental significance." },
        { text: "Shoreline district", result: "<strong>Shoreline districts:</strong><br>Shoreline districts are a type of zoning district, such as the common residential or commercial zoning, that regulates land use and development along coastlines. [But it’s not necessarily always to protect shorelines, some places have it as whatever]<br><br><strong>Why it supports resilience:</strong><br>By creating a shoreline district, communities can require accommodation for the unique needs of shoreline protection. By controlling development, communities can better adapt to rising sea levels and extreme weather.<br><br><strong>How it is used:</strong><br>Local governments establish shoreline districts through zoning ordinances and planning. Specifically, shoreline districts may include (but are not limited to) requirements regarding setbacks, permits, and restrictions on shoreline hardening.<br><br><strong>Possible obstacles to implementation:</strong><br>-Feedback from restricting development and challenges with monitoring compliance.<br>-Climate conditions shifting faster than regulations can be updated.<br><br><strong>Example:<br></strong> Standards in the City of Grand Haven’s WF-2 Waterfront 2 district (Sec. 40-417):<br>“New development within the WF-2 district will require designs that provide special consideration for public site lines. While recognizing the desire of those owning property to capitalize on its value, especially property near or on the waterfront, this article also seeks to assure that the uses of such property and the size, quality, character, dimensions, of the structures built on that property positively enhance the essential character of the community.”" },
        { text: "Armoring prohibition", result: 'Placeholder' },
        { text: "Policy around land acquisition", result: 'placeholder' }
      ]
    },
    {
      question: "Coastal flooding: Does your community lack any of the following tools?", // this is followup 4
      answers: [
        { text: "Shoreline setbacks", result: "<strong>Design Standards:</strong><br>The Michigan Zoning Enabling Act provides broad zoning authority that allows communities to regulate the appearance, form, and site layout of buildings. The act enables communities to establish design standards along with a design review process.<br><br><strong>Why it supports resilience:</strong><br>They create space that allows for the natural coastal processes to occur while protecting water quality.<br><br><strong>How it is used:</strong><br>Some design standards may include requirements related to landscaping, home designs, and home locations. Landscaping requirements could include preserving and utilizing native vegetation, minimizing impervious surfaces, and prohibiting the clearing or alteration of dunes. Home design standards may encourage reusing existing foundations, avoiding multi-lane or paved driveways, and minimizing erosion by dispersing runoff rather than using a single point of discharge. Additionally, home placement standards may include recommendations to situate homes in areas with lower tree density, build away from the crest of the dune, and orient structures so that their long axis runs across the slope.<br><br><strong>Possible obstacles to implementation:</strong><br>-Striking a balance between development and preservation can be challenging, as these additional requirements can increase development costs.<br>-Enforcing design standards can be challenging, leading to inconsistencies in application.<br><br><strong>Example:<br></strong>City of Manistee's General Provisions: Water Protection (Sec. 505)<br>With the exception of walkways, docks, launches, and boathouses, setback distances are increased to between 20 and 100 feet from the ordinary high water mark, depending on the district.”" },
        { text: "Shoreline overlay district", result: "<strong>Overlay zone:</strong><br>Overlay zones are an additional zoning district layered on an existing zoning district. They are typically used to introduce an additional standard or regulation over specific areas. “Think of a transparent plastic sheet laid on top of the zoning map, showing an additional boundary, to illustrate the overlay district.” – MSU Extension<br><br><strong>Why it supports resilience:</strong><br>For a similar reason as shoreline districts, overlay zones enable communities to enforce stricter regulations to protect shorelines. However, an overlay zone allows communities to minimize disruption to overall land use patterns already in place.<br><br><strong>How it is used:</strong><br>Local governments can create overlay zones through zoning ordinances. Applications such as floodplain overlays can require stricter construction standards that reduce vulnerability to flooding, erosion, and sea level rise.<br><br><strong>Possible obstacles to implementation:</strong><br>-Pushback against additional regulations.<br>-Challenges with administration and enforcement of standards within the overlay district.<br><br><strong>Example:<br></strong> City of Grand Haven’s Sensitive Areas (SA) Overlay District (Sec. 40-442):<br>Along with a Beach Overlay District, the City of Grand Haven has an overlay district that covers floodplains, wetlands/streams, dunes/Lake Michigan shoreline, vegetation/habitat, species of concern, and slopes. Land development within a SA Overlay District requires compliance with strict conditions set to protect areas of environmental significance." },
        { text: "Shoreline district", result: "<strong>Shoreline districts:</strong><br>Shoreline districts are a type of zoning district, such as the common residential or commercial zoning, that regulates land use and development along coastlines. [But it’s not necessarily always to protect shorelines, some places have it as whatever]<br><br><strong>Why it supports resilience:</strong><br>By creating a shoreline district, communities can require accommodation for the unique needs of shoreline protection. By controlling development, communities can better adapt to rising sea levels and extreme weather.<br><br><strong>How it is used:</strong><br>Local governments establish shoreline districts through zoning ordinances and planning. Specifically, shoreline districts may include (but are not limited to) requirements regarding setbacks, permits, and restrictions on shoreline hardening.<br><br><strong>Possible obstacles to implementation:</strong><br>-Feedback from restricting development and challenges with monitoring compliance.<br>-Climate conditions shifting faster than regulations can be updated.<br><br><strong>Example:<br></strong> Standards in the City of Grand Haven’s WF-2 Waterfront 2 district (Sec. 40-417):<br>“New development within the WF-2 district will require designs that provide special consideration for public site lines. While recognizing the desire of those owning property to capitalize on its value, especially property near or on the waterfront, this article also seeks to assure that the uses of such property and the size, quality, character, dimensions, of the structures built on that property positively enhance the essential character of the community.”" },
        { text: "Floodplain overlay district", result: 'Placeholder' },
        { text: "Policy around land acquisition", result: 'placeholder' }
      ]
    },
    {
      question: "Placeholder question", // this is followup 5
      answers: [
        { text: "A", result: "A" },
        { text: "B", result: "B" }
      ]
    },
  ];

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
