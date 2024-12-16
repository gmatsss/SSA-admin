import React from "react";
import "./Knowledgebase.css";
import videoSource from "../videos/8.SupportandResources.mp4"; // Correct video source

const Support = () => {
  return (
    <div className="knowledgebase-container">
      <div className="knowledgebase-header">
        <h1 className="title">Support and Resources</h1>
        <p className="subtitle">Find support and resources for SSA.</p>
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

export default Support;
