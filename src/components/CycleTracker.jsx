import React from "react";

function CycleTracker({ cycleCount }) {
  function renderDots(cycleCount) {
    const totalCycles = 4;
    const dots = [];

    for (let i = 0; i < totalCycles; i++) {
      dots.push(
        <div
          key={i}
          className={`tracker-dot ${i < cycleCount % 4 ? "filled" : ""}`}
        ></div>
      );
    }
    return dots;
  }

  return <div className="cycle-tracker">{renderDots(cycleCount)}</div>;
}

export default CycleTracker;
