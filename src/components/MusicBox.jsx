import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function MusicBox({ isVisible, isPlaying, setIsPlaying }) {
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="music-box"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <button className="play-btn" onClick={handlePlay}>
        <FontAwesomeIcon size="2x" icon={isPlaying ? faPause : faPlay} />
      </button>

      <iframe
        width="0"
        height="0"
        src={`https://www.youtube.com/embed/nKOecvbrAKw?autoplay=${
          isPlaying ? 1 : 0
        }&loop=1`}
        allow="autoplay"
        style={{ display: "none" }}
        title="music-player"
      />
    </div>
  );
}

export default MusicBox;
