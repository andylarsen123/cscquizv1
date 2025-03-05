const questions = [
    {
        question: "What's built there right now?",
        answers: [
            { text: "Residential", 
    result: ` 
        <strong>Overlay Zone:</strong><br>
        Overlay zones are an additional zoning district layered on an existing zoning district. They are typically used to introduce an additional standard or regulation over specific areas.<br><br>
        
        <em>“Think of a transparent plastic sheet laid on top of the zoning map, showing an additional boundary, to illustrate the overlay district.”</em> – MSU Extension<br><br>

        <strong>Why it supports resilience:</strong><br>
        For a similar reason as shoreline districts, overlay zones enable communities to enforce stricter regulations to protect shorelines. However, an overlay zone allows communities to minimize disruption to overall land use patterns already in place.<br><br>

        <strong>How it is used:</strong><br>
        Local governments can create overlay zones through zoning ordinances. Applications such as floodplain overlays can require stricter construction standards that reduce vulnerability to flooding, erosion, and sea level rise.<br><br>

        <strong>Possible obstacles to implementation:</strong><br>
        - Pushback against additional regulations<br>
        - Challenges with administration and enforcement of standards within the overlay district<br><br>

        <strong>Example: City of Grand Haven’s Sensitive Areas (SA) Overlay District (Sec. 40-442)</strong><br>
        Along with a Beach Overlay District, the City of Grand Haven has an overlay district that covers floodplains, wetlands/streams, dunes/Lake Michigan shoreline, vegetation/habitat, species of concern, and slopes. Land development within a SA Overlay District requires compliance with strict conditions set to protect areas of environmental significance.
    ` 
}

            
            { text: "Commercial", result: "Shoreline District" },
            { text: "Infrastructure", followUp: true }
        ]
    },
    {
        question: "Are there runoff concerns?",
        answers: [
            { text: "Yes", result: "B" },
            { text: "No", result: "A" }
        ]
    }
];

let currentQuestion = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const resultText = document.getElementById("result-text");

function loadQuestion() {
    const questionData = questions[currentQuestion];
    questionEl.textContent = questionData.question;
    answersEl.innerHTML = "";

    questionData.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.onclick = () => handleAnswer(answer);
        answersEl.appendChild(btn);
    });

    nextBtn.style.display = "none";
}

function handleAnswer(answer) {
    if (answer.result) {
        showResult(answer.result);
    } else if (answer.followUp) {
        currentQuestion++; // Move to the next question
        loadQuestion();
    }
}

function showResult(result) {
    document.getElementById("quiz-container").style.display = "none";
    resultContainer.style.display = "block";
    resultContainer.querySelector("h2").textContent = "Possible Solution(s):"; // Update heading
    resultText.textContent = result;
}

loadQuestion();
