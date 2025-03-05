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
const resultContainer = document.getElementById("result");
const resultText = document.getElementById("result-text");

function loadQuestion() {
    const questionData = questions[currentQuestion];
    questionEl.textContent = questionData.question;
    answersEl.innerHTML = "";  // Clear previous answers

    questionData.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.onclick = () => handleAnswer(answer);
        answersEl.appendChild(btn);
    });

    resultContainer.style.display = "none";  // Hide result section
}

function handleAnswer(answer) {
    if (answer.result) {
        showResult(answer.result);
    } else if (answer.followUp) {
        currentQuestion++;  // Move to the next question
        loadQuestion();
    }
}

function showResult(result) {
    document.getElementById("quiz-container").style.display = "none";
    resultContainer.style.display = "block";
    resultText.innerHTML = result;  // Use innerHTML to display formatted text
}

loadQuestion();
