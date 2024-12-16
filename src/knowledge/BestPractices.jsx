import React from "react";
import "./Knowledgebase.css";
import videoSource from "../videos/5.BestPractices.mp4"; // Correct video source

const BestPractices = () => {
  return (
    <div className="knowledgebase-container">
      <div className="knowledgebase-header">
        <h1 className="title">Best Practices</h1>
        <p className="subtitle">A guide to best practices when using SSA.</p>
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

export default BestPractices;
