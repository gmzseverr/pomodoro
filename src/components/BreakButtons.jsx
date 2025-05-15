import React from "react";

function BreakButtons({ setIsRunning, setInitialTime, setMode }) {
  const handleShortBreak = () => {
    setMode("short");
    setInitialTime(5 * 60);
    setIsRunning(true);
  };

  const handleLongBreak = () => {
    setMode("long");
    setInitialTime(15 * 60);
    setIsRunning(true);
  };

  return (
    <div>
      <button className="break-btn" onClick={handleShortBreak}>
        Short Break
      </button>
      <button className="break-btn" onClick={handleLongBreak}>
        Long Break
      </button>
    </div>
  );
}

export default BreakButtons;
