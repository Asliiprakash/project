const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { Text: "Shark", correct: false },
            { Text: "Blue Whale", correct: true },
            { Text: "Elephant", correct: false },
            { Text: "Giraffe", correct: false },
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
            { Text: "India", correct: false },
            { Text: "USA", correct: false },
            { Text: "Bhutan", correct: true },
            { Text: "Nepal", correct: false },
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
            { Text: "jana gana", correct: false },
            { Text: "bande mataram", correct: true },
            { Text: "oo mur aounar dekh", correct: false },
            { Text: "none of these", correct: false },
        ]
    },
    {
        question: "who is the cheif minister of ASSAM?",
        answers: [
            { Text: "Narendra modi", correct: false },
            { Text: "himanta bishwa sarma", correct: true },
            { Text: "Kejriwal", correct: false },
            { Text: "tarun gogoi", correct: false },
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
