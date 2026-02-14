import { useState, useRef, useEffect } from "react";

const QUESTION_POOL = [
  ["Document limiting the power of the king of England", 1215],
["Fall of the Byzantine capital to the Ottoman Empire", 1453],
["Christopher Columbus reaches the Americas", 1492],
["Martin Luther publishes his 95 Theses", 1517],
["Start of the Thirty Years' War in Europe", 1618],
["Beginning of the English Civil War", 1642],
["Declaration of Independence of the United States", 1776],
["Start of the French Revolution", 1789],
["Battle that ended Napoleon's rule in Europe", 1815],
["Beginning of the American Civil War", 1861],
["Start of the Russian Revolution", 1917],
["End of World War I", 1918],
["Signing of the Treaty of Versailles", 1919],
["Start of World War II in Europe", 1939],
["Allied D-Day invasion of Normandy", 1944],
["End of World War II", 1945],
["First successful manned moon landing by Apollo 11", 1969],
["Destruction of the Berlin Wall in Germany", 1989],
["Terrorist attacks on the World Trade Center and Pentagon", 2001],
["Global pandemic declared by the WHO", 2020],
["Invention of the movable type printing press", 1440],
["Norse explorer Leif Erikson reaches North America", 1000],
["First printed Gutenberg Bible", 1455],
["Coronation of Charlemagne as Holy Roman Emperor", 800],
["Cultural movement starting in Italy that revived art and learning", 1300],
["Beginning of the Industrial Revolution", 1760],
["Start of the American Revolutionary War", 1775],
["United States purchases the Louisiana Territory from France", 1803],
["Albert Einstein publishes the theory of Special Relativity", 1905],
["Wall Street stock market crash triggering the Great Depression", 1929],
["Independence of India from British rule", 1947],
["Formation of NATO (North Atlantic Treaty Organization)", 1949],
["Start of the Korean War", 1950],
["Civil Rights Act passed in the United States", 1964],
["End of the Vietnam War", 1975],
["Nuclear disaster at Chernobyl in Ukraine", 1986],
["Nelson Mandela released from prison in South Africa", 1990],
["Introduction of the Euro as official currency in Europe", 1999],
["Hurricane Katrina devastates New Orleans", 2005],
["Global financial crisis begins in the United States", 2008]
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

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, submitted]);

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
    else if (totalScore <= 100) message = "Insane work!";
    else if (totalScore <= 250) message = "Great job!";
    else if (totalScore <= 500) message = "Decent!";
    else if (totalScore <= 700) message = "Good effort!";
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
    autoFocus
    ref={inputRef}
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
