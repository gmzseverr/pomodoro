import React, { useState, useRef } from "react";
import "../styles/header.css";
import TaskItem from "./TaskItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faFilePen } from "@fortawesome/free-solid-svg-icons";
import MusicBox from "./MusicBox";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false); // ✅ input'u göster/gizle
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask("");
      setShowInput(false); //
    }
  };

  const handleUpdateTask = (index, updatedText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = updatedText;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleShowInput = () => {
    setShowInput((prev) => {
      const next = !prev;

      if (next) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }

      return next;
    });
  };

  return (
    <>
      <div
        className="side-menu"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      ></div>

      {isOpen && (
        <>
          <div className="overlay" onClick={() => setIsOpen(false)}></div>

          <div
            className="side-menu open"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="edit-trigger" onClick={handleShowInput}>
              <FontAwesomeIcon icon={faFilePen} />
            </div>

            <ul>
              {tasks.length === 0 ? (
                <li></li>
              ) : (
                tasks.map((task, idx) => (
                  <TaskItem
                    key={idx}
                    task={task}
                    onDelete={() => handleDeleteTask(idx)}
                    onUpdate={(text) => handleUpdateTask(idx, text)}
                    onToggleComplete={() => handleToggleComplete(idx)}
                  />
                ))
              )}
            </ul>

            {showInput && (
              <div className="new-task">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Add new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                />
                <FontAwesomeIcon
                  onClick={handleAddTask}
                  size="2x"
                  icon={faCircleRight}
                />
              </div>
            )}
          </div>
        </>
      )}
      <MusicBox
        isVisible={isOpen}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </>
  );
}

export default Header;
