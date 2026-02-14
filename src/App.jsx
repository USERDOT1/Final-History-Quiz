import { useState } from "react";
const QUESTION_POOL = [
  ["Signing of the Magna Carta", 1215, 50],
["Fall of Constantinople", 1453, 50],
["Columbus reaches the Americas", 1492, 50],
["Martin Luther's 95 Theses", 1517, 40],
["Start of the Thirty Years' War", 1618, 50],
["English Civil War begins", 1642, 40],
["American Declaration of Independence", 1776, 30],
["French Revolution begins", 1789, 30],
["Battle of Waterloo", 1815, 20],
["American Civil War begins", 1861, 20],
["Russian Revolution", 1917, 10],
["End of World War I", 1918, 10],
["Treaty of Versailles signed", 1919, 10],
["Start of World War II", 1939, 10],
["D-Day invasion", 1944, 5],
["End of World War II", 1945, 5],
["Moon landing", 1969, 5],
["Fall of the Berlin Wall", 1989, 5],
["September 11 attacks", 2001, 3],
["COVID-19 declared a pandemic", 2020, 2]
];

function getRandomQuestions(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function calculateYearsOff(guess, answer, range) {
  const min = answer - range;
  const max = answer + range;

  if (guess < min || guess > max) {
    return range;
  }

  return Math.abs(guess - answer);
}


function getDateFeedback(guess, answer) {
  if (guess === answer) {
    return "Exact match";
  }

  const difference = Math.abs(guess - answer);
  return `Correct year: ${answer} (${difference} years off)`;
}

function App() {
  const [questions] = useState(() => getRandomQuestions(QUESTION_POOL, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");

  if (currentIndex >= questions.length) {
    return (
      <div>
      <h1>Quiz Finished</h1>
      <p>Final Score: {totalScore}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  function handleSubmit() {
    const yearGuess = parseInt(guess, 10);
    if (isNaN(yearGuess)) {
      return;
    }

    const yearsOff = calculateYearsOff(
      yearGuess,
      currentQuestion[1],
      currentQuestion[2]
    );

    setTotalScore(totalScore + yearsOff);

    setFeedback(getDateFeedback(yearGuess, currentQuestion[1]));
    setSubmitted(true);
  }


  function handleNext() {
    setGuess("");
    setFeedback("");
    setSubmitted(false);
    setCurrentIndex(currentIndex + 1);
  }


  return (
    <div>
    <h2>Question {currentIndex + 1} / {questions.length}</h2>
    <p>{currentQuestion[0]}</p>

    <input
    type="number"
    value={guess}
    onChange={e => setGuess(e.target.value)}
    disabled={submitted}
    />

    {!submitted && (
      <button onClick={handleSubmit}>Submit</button>
    )}

    {submitted && (
      <button onClick={handleNext}>Next</button>
    )}
    {submitted && <p>{feedback}</p>}
    <p>Total Years Off: {totalScore}</p>
    </div>
  );
}

export default App;
