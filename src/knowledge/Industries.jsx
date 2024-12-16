import React from "react";
import "./Knowledgebase.css";
import videoSource from "../videos/4.IndustriesandUseCases.mp4"; // Correct video source

const Industries = () => {
  return (
    <div className="knowledgebase-container">
      <div className="knowledgebase-header">
        <h1 className="title">Industries and Use Cases</h1>
        <p className="subtitle">Explore industries and use cases for SSA.</p>
      </div>
      <div className="knowledgebase-video">
        <video controls className="video-player">
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Industries;
