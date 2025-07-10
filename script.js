const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyper Tool Markup Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true }
    ]
  },
  {
    question: "Which is not a JavaScript framework?",
    answers: [
      { text: "Python", correct: true },
      { text: "React", correct: false },
      { text: "Angular", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");
    btn.onclick = () => selectAnswer(answer.correct, btn);
    const li = document.createElement("li");
    li.appendChild(btn);
    answerButtons.appendChild(li);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(isCorrect, selectedButton) {
  const buttons = Array.from(answerButtons.children);

  buttons.forEach(li => {
    const button = li.firstChild;
    button.disabled = true;

    // Always show correct answer in green
    if (button.innerText === getCorrectAnswerText()) {
      button.style.backgroundColor = "green";
      button.style.color = "#fff";
    }

    // If user clicked the wrong answer, highlight it red
    if (button === selectedButton && !isCorrect) {
      button.style.backgroundColor = "red";
      button.style.color = "#fff";
    }
  });

  nextButton.style.display = "inline-block";
}

function getCorrectAnswerText() {
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.answers.find(ans => ans.correct);
  return correctAnswer.text;
}

function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerText = "🎉 You’ve completed the quiz!";
  nextButton.innerText = "Restart";
  nextButton.onclick = restartQuiz;
  nextButton.style.display = "inline-block";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

// Initialize the first question
showQuestion();