import React, { useEffect, useState } from "react";
import BreakButtons from "./BreakButtons";

function Timer() {
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [cycleCount, setCycleCount] = useState(0);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setInitialTime(25 * 60);
    setMode("focus");
    setCycleCount(0); // Reset the cycle count when reset
  };

  useEffect(() => {
    let interval;

    if (isRunning && initialTime > 0) {
      interval = setInterval(() => {
        setInitialTime((prev) => prev - 1);
      }, 1000);
    }

    if (initialTime === 0) {
      if (mode === "focus") {
        setCycleCount((prev) => prev + 1);
        if ((cycleCount + 1) % 4 === 0) {
          setMode("long");
          setInitialTime(15 * 60); // Long break
        } else {
          setMode("short");
          setInitialTime(5 * 60); // Short break
        }
      } else {
        setMode("focus");
        setInitialTime(25 * 60); // Focus time
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, initialTime, mode, cycleCount]);

  return (
    <div className="timer-section">
      <h2 className="mode">
        {mode === "focus"
          ? "Focus"
          : mode === "short"
          ? "Short Break"
          : "Long Break"}
      </h2>

      <div className="timer-container">
        <div className="timer-time">{formatTime(initialTime)}</div>
      </div>

      <BreakButtons
        setInitialTime={setInitialTime}
        setIsRunning={setIsRunning}
        setMode={setMode}
      />
      <div className="circle">
        {!isRunning ? (
          <svg
            onClick={handleStart}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
          </svg>
        ) : (
          <svg
            onClick={handlePause}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default Timer;
