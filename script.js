const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { Text: "SHARK", correct: false },
            { Text: "BLUE WHALE", correct: true },
            { Text: "ELEPHANT", correct: false },
            { Text: "GIRAFFE", correct: false },
        ]
    },
    {
        question: "What is the short form of Central Processing Unit?",
        answers: [
            { Text: "GPU", correct: false },
            { Text: "DVD", correct: false },
            { Text: "CPU", correct: true },
            { Text: "ALU", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { Text: "INDIA", correct: false },
            { Text: "USA", correct: false },
            { Text: "BHUTAN", correct: true },
            { Text: "NEPAL", correct: false },
        ]
    },
    {
        question: "Which country has the largest population in the world?",
        answers: [
            { Text: "India", correct: true },
            { Text: "USA", correct: false },
            { Text: "Russia", correct: false },
            { Text: "China", correct: false },
        ]
    },
    {
        question: "what is the national anthem of india?",
        answers: [
            { Text: "JANA GANA", correct: true },
            { Text: "BANDE MATARAM", correct: false },
            { Text: "OO MUR APUNAR DESH", correct: false },
            { Text: "DIL DIYA GALLA", correct: false },
        ]
    },
    {
        question: "who is the cheif minister of ASSAM?",
        answers: [
            { Text: "NARENDRA MODI", correct: false },
            { Text: "HIMANTA BISWA SARMAH", correct: true },
            { Text: "AKHIL GOGOI", correct: false },
            { Text: "TARUN GOGOI", correct: false },
        ]
    },
    {
        question: "which state is also known as the 'fruit bowl' of India?",
        answers: [
            { Text: "JAMMU & KASHMIR", correct: false },
            { Text: "HIMACHAL PRADESH", correct: true },
            { Text: "ASSAM", correct: false },
            { Text: "MEGHALAYA", correct: false },
        ]
    },
    {
        question: "Which place in india is also known as the 'land of rishing sun'?",
        answers: [
            { Text: "SIKKIM", correct: false },
            { Text: "KARNATAKA", correct: false },
            { Text: "ARUNACHAL PRADESH", correct: true },
            { Text: "GUJRAT", correct: false },
        ]
    },
    {
        question: "Who discovered india?",
        answers: [
            { Text: "VASCO-da-GAMA", correct: true },
            { Text: "CHRISTOPER COLUMBUS", correct: false },
            { Text: "JAMES COOK", correct: false },
            { Text: "WILLEM JANSZOON", correct: false },
        ]
    },
   {
        question: "Who is popularly known as the "iron-man" of India ,
        answers: [
            { Text: "LAL BAHADUR SASTRI", correct: false },
            { Text: "SARDAR VALLABH BHAI PATEL", correct: true },
            { Text: "MAHATMA GADHI", correct: false },
            { Text: "DR. B.R. AMBEDKAR", correct: false },
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "TRY AGAIN";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
