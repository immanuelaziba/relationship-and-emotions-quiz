// Quiz data
const quizData = [
  {
    question: "You and your partner have a disagreement about finances. What’s your first step?",
    choices: [
      "A. Avoid the discussion entirely.",
      "B. Calmly express your concerns and listen to theirs.",
      "C. Seek advice from friends or family.",
      "D. Insist on your point of view."
    ],
    answer: "B",
    feedback: {
      A: "Avoidance can lead to unresolved issues and resentment.",
      B: "Correct! Open communication is vital for resolving conflicts constructively.",
      C: "Seeking advice is helpful but should not replace direct communication.",
      D: "Insisting on your point of view without compromise can escalate conflicts."
    }
  },
  {
    question: "True or False: Conflict is always bad for a relationship.",
    choices: ["True", "False"],
    answer: "False",
    feedback: {
      False: "Correct! Healthy conflict allows partners to address and resolve differences constructively.",
      True: "Incorrect. While conflict can be uncomfortable, it’s an opportunity to grow and strengthen your relationship."
    }
  },
  {
    question: "You notice your friend has been unusually quiet during a group outing. How do you approach them?",
    choices: [
      "A. Ask them in private if everything is okay.",
      "B. Bring it up in front of the group.",
      "C. Assume they’re just tired and do nothing.",
      "D. Distract them with light conversation."
    ],
    answer: "A",
    feedback: {
      A: "Correct! Checking in privately shows care and respect for their emotions.",
      B: "Discussing personal matters publicly can make them feel uncomfortable.",
      C: "Ignoring signs of distress might lead to unresolved issues.",
      D: "Distractions can help temporarily but don’t address underlying concerns."
    }
  }
];

// Adaptive question logic
const adaptiveQuestions = (userResponse) => {
  if (userResponse === "A") {
    return {
      question: "What makes you feel safe to address a conflict directly?",
      choices: [
        "A. Knowing the other person won’t judge me.",
        "B. Feeling prepared with what to say.",
        "C. Having support from a friend or mediator.",
        "D. Being in a calm and private setting."
      ],
      answer: "D",
      feedback: {
        A: "This is helpful. Feeling judged can make conflict resolution harder.",
        B: "Preparation helps build confidence to address issues effectively.",
        C: "Support can provide emotional reinforcement when addressing conflicts.",
        D: "Correct! A calm, private setting minimizes distractions and encourages constructive dialogue."
      }
    };
  }
  return null;
};

// DOM elements
const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let adaptiveQuestion = null;

// Initialize quiz
function startQuiz() {
  resultContainer.classList.add("hidden");
  nextButton.classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;
  adaptiveQuestion = null;
  showQuestion();
}

// Show question
function showQuestion() {
  const questionData = adaptiveQuestion || quizData[currentQuestionIndex];
  quizContainer.innerHTML = `
    <h2>${questionData.question}</h2>
    ${questionData.choices
      .map(
        (choice, index) =>
          `<div class="choice" data-index="${index}">${choice}</div>`
      )
      .join("")}
  `;
  document.querySelectorAll(".choice").forEach(choice => {
    choice.addEventListener("click", selectAnswer);
  });
}

// Handle answer selection
function selectAnswer(e) {
  const selectedChoice = e.target;
  const questionData = adaptiveQuestion || quizData[currentQuestionIndex];
  const correctAnswer = questionData.answer;
  const selectedAnswer = selectedChoice.textContent[0];

  // Highlight correct and incorrect choices
  document.querySelectorAll(".choice").forEach(choice => {
    const choiceText = choice.textContent[0];
    choice.classList.add(choiceText === correctAnswer ? "correct" : "wrong");
  });

  // Feedback and scoring
  if (selectedAnswer === correctAnswer) {
    score++;
    alert(questionData.feedback[correctAnswer]);
  } else {
    alert(questionData.feedback[selectedAnswer] || "Incorrect answer.");
  }

  // Adaptive question handling
  if (!adaptiveQuestion && currentQuestionIndex === 0) {
    adaptiveQuestion = adaptiveQuestions(selectedAnswer);
  }

  // Enable "Next" button
  nextButton.disabled = false;
}

// Next question
nextButton.addEventListener("click", () => {
  if (adaptiveQuestion) {
    adaptiveQuestion = null;
  } else {
    currentQuestionIndex++;
  }

  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showResults();
  }
  nextButton.disabled = true;
});

// Show results
function showResults() {
  quizContainer.innerHTML = "";
  resultContainer.classList.remove("hidden");
  nextButton.classList.add("hidden");
  scoreDisplay.textContent = `You scored ${score} out of ${quizData.length + (adaptiveQuestion ? 1 : 0)}!`;
}

// Restart quiz
restartButton.addEventListener("click", startQuiz);

// Start the quiz on load
startQuiz();
