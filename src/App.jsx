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


const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  border: "2px solid #1e40af",
  borderRadius: "12px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f3f4f6"
};

const questionStyle = {
  fontSize: "1.3rem",
  marginBottom: "12px"
};

const inputStyle = {
  padding: "8px",
  fontSize: "1rem",
  width: "100px",
  marginRight: "12px",
  borderRadius: "4px",
  border: "1px solid #94a3b8"
};

const buttonStyle = {
  padding: "8px 16px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#1e40af",
  color: "white",
  cursor: "pointer",
  marginRight: "8px"
};

const feedbackStyle = {
  marginTop: "12px",
  fontWeight: "bold",
  color: "#dc2626" // red-ish for visibility
};

const scoreStyle = {
  marginTop: "16px",
  fontWeight: "bold",
  fontSize: "1.1rem"
};



function calculateYearsOff(guess, answer) {
  const difference = Math.abs(guess - answer);
  return Math.min(difference, 100);
}



function getDateFeedback(guess, answer) {
  const difference = Math.abs(guess - answer);
  const cappedDifference = Math.min(difference, 100);

  if (cappedDifference === 0) {
    return "Exact match!";
  } else if (cappedDifference === 100) {
    return `Way off! Correct year: ${answer} (100 years off max penalty)`;
  } else {
    return `Correct year: ${answer} (${cappedDifference} years off)`;
  }
}


function App() {
  const [questions] = useState(() => getRandomQuestions(QUESTION_POOL, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");

  if (currentIndex >= questions.length) {
    const finalContainerStyle = {
      maxWidth: "600px",
      margin: "60px auto",
      padding: "30px",
      border: "2px solid #1e40af",
      borderRadius: "12px",
      backgroundColor: "#fef3c7",
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    };

    const finalScoreStyle = {
      fontSize: "2rem",
      fontWeight: "bold",
      color: totalScore === 0 ? "#16a34a" : "#dc2626", // green if perfect
      margin: "20px 0"
    };

    const messageStyle = {
      fontSize: "1.2rem",
      color: "#1e40af"
    };

    let message = "Not bad!";
    if (totalScore === 0) message = "Perfect score! Incredible!";
    else if (totalScore <= 150) message = "Great job!";
    else if (totalScore <= 250) message = "Good effort!";
    else message = "Better luck next time!";

    return (
      <div style={finalContainerStyle}>
      <h1>Quiz Finished</h1>
      <p style={finalScoreStyle}>{totalScore} total years off</p>
      <p style={messageStyle}>{message}</p>
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
      currentQuestion[1]
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
    <div style={containerStyle}>
    <h2>Question {currentIndex + 1} / {questions.length}</h2>
    <p style={questionStyle}>{currentQuestion[0]}</p>

    <input
    type="number"
    value={guess}
    onChange={e => setGuess(e.target.value)}
    disabled={submitted}
    style={inputStyle}
    />

    {!submitted && (
      <button onClick={handleSubmit} style={buttonStyle}>Submit</button>
    )}

    {submitted && (
      <button onClick={handleNext} style={buttonStyle}>Next</button>
    )}

    {submitted && <p style={feedbackStyle}>{feedback}</p>}

    <p style={scoreStyle}>Total Years Off: {totalScore}</p>
    </div>
  );

}

export default App;
