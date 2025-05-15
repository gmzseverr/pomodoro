import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function MusicBox() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-box">
      <button className="play-btn" onClick={handlePlay}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>

      {isPlaying && (
        <iframe
          width="0"
          height="0"
          src="https://www.youtube.com/embed/nKOecvbrAKw?autoplay=1"
          allow="autoplay"
          style={{ display: "none" }}
          title="music-player"
        />
      )}
    </div>
  );
}

export default MusicBox;
