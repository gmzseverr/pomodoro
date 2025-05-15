import React, { useState } from "react";

function InputTask({ visible, onTaskSubmit }) {
  const [task, setTask] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && task.trim() !== "") {
      onTaskSubmit(task); // Task'ı üst bileşene gönder
      setTask(""); // Input'u temizle
    }
  };

  if (!visible) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <input
        type="text"
        placeholder="Görevini yaz ve Enter'a bas..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      />
    </div>
  );
}

export default InputTask;
