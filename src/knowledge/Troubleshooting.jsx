import React from "react";
import "./Knowledgebase.css";
import videoSource from "../videos/6.Troubleshooting.mp4"; // Correct video source

const Troubleshooting = () => {
  return (
    <div className="knowledgebase-container">
      <div className="knowledgebase-header">
        <h1 className="title">Troubleshooting</h1>
        <p className="subtitle">Learn how to troubleshoot common SSA issues.</p>
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

export default Troubleshooting;
