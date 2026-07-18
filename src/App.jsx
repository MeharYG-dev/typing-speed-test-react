import { useEffect, useState } from "react";
import "./App.css";

const texts = [
  "Despite the overwhelming noise of the city streets below, Jonathan remained focused on the glowing screen in front of him, his fingers dancing over the keyboard with purpose.",

  "The morning sun slowly spread across the quiet village, while birds sang from the trees and people began their daily routines.",

  "Learning to code requires patience, practice, and consistency. Every small project helps you understand programming concepts better.",

  "Technology continues to change the way people work, communicate, and solve problems in their everyday lives.",

  "A successful developer does not need to know everything. The most important skill is knowing how to learn and solve problems."
];

function App() {
  const [text, setText] = useState(texts[0]);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  };

  useEffect(() => {
    let timer;

    if (isStarted && timeLeft > 0 && !isFinished) {
      timer = setInterval(() => {
        setTimeLeft((previousTime) => previousTime - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsFinished(true);
    }

    return () => clearInterval(timer);
  }, [isStarted, timeLeft, isFinished]);

  const startTest = () => {
    setText(getRandomText());
    setUserInput("");
    setTimeLeft(60);
    setIsStarted(true);
    setIsFinished(false);
  };

  const handleTyping = (event) => {
    if (!isStarted || isFinished) return;

    const value = event.target.value;
    setUserInput(value);

    if (value.length === text.length) {
      setIsFinished(true);
    }
  };

  const calculateWPM = () => {
    const typedWords = userInput.trim().split(/\s+/).length;
    const timeUsed = 60 - timeLeft;

    if (timeUsed === 0 || userInput.length === 0) {
      return 0;
    }

    return Math.round((typedWords / timeUsed) * 60);
  };

  const calculateAccuracy = () => {
    if (userInput.length === 0) return 0;

    let correctCharacters = 0;

    userInput.split("").forEach((character, index) => {
      if (character === text[index]) {
        correctCharacters++;
      }
    });

    return Math.round(
      (correctCharacters / userInput.length) * 100
    );
  };

  const restartTest = () => {
    setText(getRandomText());
    setUserInput("");
    setTimeLeft(60);
    setIsStarted(true);
    setIsFinished(false);
  };

  return (
    <div className="app">
      <div className="typing-card">

        <div className="header">
          <h1>Typing Speed Test</h1>

          <div className="timer">
            {String(timeLeft).padStart(2, "0")}:00
          </div>
        </div>

        <div className="text-display">
          {text.split("").map((character, index) => {
            let className = "";

            if (index < userInput.length) {
              className =
                userInput[index] === character
                  ? "correct"
                  : "incorrect";
            }

            return (
              <span className={className} key={index}>
                {character}
              </span>
            );
          })}
        </div>

        <textarea
          value={userInput}
          onChange={handleTyping}
          disabled={!isStarted || isFinished}
          placeholder={
            isStarted
              ? "Start typing here..."
              : "Click Start to begin typing"
          }
        />

        <div className="results">
          <div>
            <h3>WPM</h3>
            <p>{calculateWPM()}</p>
          </div>

          <div>
            <h3>Accuracy</h3>
            <p>{calculateAccuracy()}%</p>
          </div>
        </div>

        {!isStarted ? (
          <button className="start-btn" onClick={startTest}>
            Start
          </button>
        ) : (
          <button className="restart-btn" onClick={restartTest}>
            Restart
          </button>
        )}

      </div>
    </div>
  );
}

export default App;
