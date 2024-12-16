import React from "react";
import "./Knowledgebase.css";
import videoSource from "../videos/3.GettingStarted.mp4"; // Correct video source

const GettingStarted = () => {
  return (
    <div className="knowledgebase-container">
      <div className="knowledgebase-header">
        <h1 className="title">Getting Started</h1>
        <p className="subtitle">A guide to getting started with SSA.</p>
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

export default GettingStarted;
