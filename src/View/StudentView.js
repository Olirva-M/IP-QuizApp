import React, { useEffect, useState } from 'react';

const StudentView = ({ qbank, updateScore }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20); // Timer set to 10 seconds

  const handleOptionChange = (optionKey) => {
    setSelectedOption(optionKey);
  };

  const handleNextQuestion = () => {
    clearInterval(timer); // Clear interval correctly
    if (!selectedOption && timer !== 0) {
      console.log('Please select an option'); // Provide user-friendly message
      return;
    }

    if (currentQuestion && qbank[currentQuestionIndex].Answer === selectedOption){
      console.log('Correct');
      setScore(prev => prev + 1);
    } else {
      console.log('Wrong');
    }

    setSelectedOption(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    } else {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup function to clear interval
    }
  }, [timer]);

  useEffect(() => {
    if (!qbank[currentQuestionIndex]) {
      console.log(score);
      updateScore(score);
    } else {
      setTimer(20); // Reset timer for each new question
    }
  }, [currentQuestionIndex, qbank, score]);

  const currentQuestion = qbank[currentQuestionIndex];

  return (
    <div>
      {currentQuestion && (
        <div>
          <h2>{currentQuestion.Question}</h2>
          <div style={{ 
    backgroundColor: timer >= 10 ? "#00FF00" : "#FF0000", // Green if timer >= 10, red otherwise
    borderRadius: "10px", 
    padding: "10px", 
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
    display: "inline-block" 
}}>
  <p style={{ 
      fontFamily: "Arial, sans-serif", 
      fontSize: "16px", 
      color: "#333", 
      margin: 0 
  }}>
    Time remaining: {timer} seconds
  </p>
</div>


          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {Object.keys(currentQuestion)
              .filter((key) => key !== 'Question' && key !== 'Answer' && key !== '_id')
              .map((optionKey) => (
                <li key={optionKey}>
                  <input
                    type="radio"
                    id={optionKey}
                    name="option"
                    value={optionKey}
                    onChange={() => handleOptionChange(optionKey)}
                    checked={selectedOption === optionKey}
                  />
                  <label htmlFor={optionKey}>{currentQuestion[optionKey]}</label>
                </li>
              ))}
          </ul>
          <button onClick={handleNextQuestion}>Next</button>
        </div>
      )}
      {!currentQuestion && (
        <div>
          <h2>Total Score</h2>
          <div style={{ backgroundColor: score > 4 ? 'green' : 'red', padding: '10px', borderRadius: '5px', color: 'white' }}>
            {score}/10
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentView;
