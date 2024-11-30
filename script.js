// Welcome message
console.log("🌸 Welcome to the Relationships & Emotions Quiz! 🌸");
console.log("Type your answers (e.g., 'A', 'B', or 'true') in the console when prompted.");
console.log("Let's explore your emotional wisdom!\n");

// Questions array
const questions = [
  {
    question: "What’s the most important quality in a healthy relationship?",
    choices: ["A. Trust", "B. Passion", "C. Shared Interests", "D. Communication"],
    answer: "A"
  },
  {
    question: "True or False: Conflict is always bad for a relationship.",
    choices: [],
    answer: "false"
  },
  {
    question: "How do you usually handle emotional stress?",
    choices: ["A. Talk to a friend", "B. Journal or reflect", "C. Distract yourself", "D. Ignore it"],
    answer: "B" // Example preferred answer
  }
];

// Variables to track score
let score = 0;

// Loop through each question
questions.forEach((q, index) => {
  console.log(`${index + 1}. ${q.question}`);
  if (q.choices.length) {
    q.choices.forEach(choice => console.log(choice));
  }

  // Get user's answer
  let userAnswer = prompt("Your answer: ").trim();

  // Check the answer
  if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
    console.log("✅ Correct!\n");
    score++;
  } else {
    console.log(`❌ Oops! The correct answer is: ${q.answer}\n`);
  }
});

// Final Score
console.log(`🌟 You scored ${score} out of ${questions.length}! 🌟`);
if (score === questions.length) {
  console.log("Amazing! You’re emotionally attuned. 💖");
} else if (score > 0) {
  console.log("Good effort! Keep exploring and learning. 💡");
} else {
  console.log("Don't worry, this is just the start of your emotional journey! 🌱");
}
