import React from "react";
import "./Knowledgebase.css";
import videoSource from "../videos/7.Security&Privacy.mp4"; // Correct video source

const Security = () => {
  return (
    <div className="knowledgebase-container">
      <div className="knowledgebase-header">
        <h1 className="title">Security & Privacy</h1>
        <p className="subtitle">
          Understand security and privacy considerations for SSA.
        </p>
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

export default Security;
