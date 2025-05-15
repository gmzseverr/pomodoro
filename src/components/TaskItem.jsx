// components/TaskItem.js
import React, { useState } from "react";
import {
  faTrash,
  faCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TaskItem({ task, onDelete, onUpdate, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  return (
    <li className={`task-list ${task.completed ? "completed" : ""}`}>
      <span className="checkbox-icon" onClick={onToggleComplete}>
        <FontAwesomeIcon icon={task.completed ? faCircleCheck : faCircle} />
      </span>

      {isEditing ? (
        <input
          className="edit-input"
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleBlur();
          }}
          autoFocus
        />
      ) : (
        <span className="task-text" onClick={handleEdit}>
          {task.text}
        </span>
      )}

      <span className="delete-icon" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </li>
  );
}

export default TaskItem;
