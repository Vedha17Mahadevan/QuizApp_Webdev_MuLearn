const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Machine Language", correct: false },
            { text: "Hyperlink Type Markup Logic", correct: false },
            { text: "Home Text Making Links", correct: false }
        ]
    },
    {
        question: "Which language runs inside the browser?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "What does CSS control?",
        answers: [
            { text: "Structure", correct: false },
            { text: "Design / Style", correct: true },
            { text: "Database", correct: false },
            { text: "Networking", correct: false }
        ]
    },
    {
        question: "Which tag is used to link CSS in HTML?",
        answers: [
            { text: "<link>", correct: true },
            { text: "<style>", correct: false },
            { text: "<script>", correct: false },
            { text: "<css>", correct: false }
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Mapping", correct: false },
            { text: "Digital Organization Model", correct: false },
            { text: "Document Order Machine", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const summaryList = document.getElementById("summary-list");
const scoreText = document.getElementById("score-text");

let currentQuestionIndex = 0;
let score = 0;
let summaryData = [];

startQuiz();

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    summaryData = [];
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    summaryData.push({
        question: questions[currentQuestionIndex].question,
        selected: selectedBtn.innerText,
        correct: isCorrect
    });

    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") btn.classList.add("correct");
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    scoreText.innerText = `You scored ${score} out of ${questions.length}`;

    summaryList.innerHTML = "";

    summaryData.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("summary-card");

        const left = document.createElement("div");
        left.classList.add("summary-left");

        const q = document.createElement("strong");
        q.textContent = item.question;     

        const ans = document.createElement("p");
        ans.textContent = `Your Answer: ${item.selected}`;

        left.appendChild(q);
        left.appendChild(ans);
        
        const status = document.createElement("div");
        status.classList.add("summary-status", item.correct ? "correct" : "wrong");
        status.textContent = item.correct ? "✓" : "✗";

        li.appendChild(left);
        li.appendChild(status);
        summaryList.appendChild(li);
    });
}
