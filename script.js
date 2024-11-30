
const questions = [
  {
    question: "You and your partner have a disagreement about finances. What’s your first step?",
    choices: [
      "Avoid the discussion entirely.",
      "Calmly express your concerns and listen to theirs.",
      "Seek advice from friends or family.",
      "Insist on your point of view."
    ],
    correct: 1,
    feedback: [
      "Avoidance can lead to unresolved issues and resentment.",
      "Correct! Open communication is vital for resolving conflicts constructively.",
      "Seeking advice is helpful but should not replace direct communication.",
      "Insisting on your point of view without compromise can escalate conflicts."
    ]
  },
  {
    question: "Your partner is feeling stressed after work. What’s the best way to show support?",
    choices: [
      "Offer to listen if they want to talk.",
      "Give them space and leave them alone.",
      "Suggest a solution to their problem.",
      "Plan a distraction, like a fun outing."
    ],
    correct: 0,
    feedback: [
      "Correct! Emotional support starts with active listening and understanding their needs.",
      "Sometimes space is good, but it’s better to ask and confirm what they need.",
      "Jumping to solutions may make them feel dismissed.",
      "Distractions are helpful later but may not address immediate emotional needs."
    ]
  },
  {
    question: "Which action most demonstrates the love language of ‘acts of service’?",
    choices: [
      "Giving your partner a thoughtful gift.",
      "Helping with chores when they’re overwhelmed.",
      "Spending quality time together.",
      "Writing them a heartfelt note."
    ],
    correct: 1,
    feedback: [
      "Thoughtful gifts align with the love language of ‘receiving gifts.’",
      "Correct! Acts of service focus on actions that ease your partner’s burdens.",
      "Spending time together represents ‘quality time.’",
      "Heartfelt notes resonate with ‘words of affirmation.’"
    ]
  },
  {
    question: "True or False: Conflict is always bad for a relationship.",
    choices: ["True", "False"],
    correct: 1,
    feedback: [
      "Not quite. Healthy conflict can strengthen relationships by addressing and resolving differences.",
      "Correct! The key is how conflicts are handled—focus on mutual understanding and constructive dialogue."
    ]
  },
  {
    question: "What’s the best way to maintain balance in a relationship?",
    choices: [
      "Spend all your free time with your partner.",
      "Prioritize self-care alongside the relationship.",
      "Focus entirely on your partner’s needs.",
      "Avoid difficult conversations to keep the peace."
    ],
    correct: 1,
    feedback: [
      "Spending all your time together can lead to dependency and burnout.",
      "Correct! A healthy relationship thrives when both partners care for themselves and each other.",
      "Neglecting your own needs can create resentment.",
      "Avoiding issues can lead to long-term damage in trust and communication."
    ]
  }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const feedbackContainer = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  feedbackContainer.textContent = "";
  const current = questions[currentQuestion];
  questionText.textContent = current.question;
  choicesContainer.innerHTML = "";

  current.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.onclick = () => selectAnswer(index);
    choicesContainer.appendChild(button);
  });
}

function selectAnswer(index) {
  const current = questions[currentQuestion];
  feedbackContainer.textContent = current.feedback[index];
  if (index === current.correct) {
    score++;
  }
  nextBtn.style.display = "block";
}

function showResults() {
  questionText.textContent = "Quiz Complete!";
  choicesContainer.innerHTML = "";
  feedbackContainer.innerHTML = `
    <h2>Your Results</h2>
    <p>You scored ${score} out of ${questions.length}.</p>
    <p>${getResultsMessage(score)}</p>
  `;
  nextBtn.style.display = "none";
}

function getResultsMessage(score) {
  if (score === questions.length) {
    return "Amazing! You have excellent emotional intelligence and relationship skills.";
  } else if (score >= questions.length * 0.7) {
    return "Great job! You understand relationships well, but there's room to grow.";
  } else if (score >= questions.length * 0.4) {
    return "You’re on the right track. Keep learning and reflecting on your choices.";
  } else {
    return "Keep practicing. Developing emotional intelligence takes time and effort.";
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showResults();
  }
});

loadQuestion();
