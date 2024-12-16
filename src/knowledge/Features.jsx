import React from "react";
import "./Knowledgebase.css";
import videoSource from "../videos/2.FeaturesandCapabilities.mp4"; // Correct video source

const Features = () => {
  return (
    <div className="knowledgebase-container">
      <div className="knowledgebase-header">
        <h1 className="title">Features and Capabilities</h1>
        <p className="subtitle">
          Learn about the key features and capabilities of SSA.
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

export default Features;
