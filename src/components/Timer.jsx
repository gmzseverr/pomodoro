import React, { useEffect, useState } from "react";
import BreakButtons from "./BreakButtons";
import InputTask from "./InputTask";

function Timer() {
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [cycleCount, setCycleCount] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [currentTask, setCurrentTask] = useState("");

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

  const handleTaskSubmit = (task) => {
    setCurrentTask(task);
    setShowInput(false);
  };

  return (
    <div className="timer-section">
      <h2 className="mode">
        {mode === "focus"
          ? "Focus"
          : mode === "short"
          ? "Short Break"
          : "Long Break"}
      </h2>
      {currentTask && <div className="task">{currentTask}</div>}
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
      <div style={{ marginTop: "1rem", cursor: "pointer" }}>
        <svg
          onClick={() => setShowInput(!showInput)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="30"
          fill="#d94f4f"
        >
          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
        </svg>
      </div>

      <InputTask visible={showInput} onTaskSubmit={handleTaskSubmit} />
    </div>
  );
}

export default Timer;
