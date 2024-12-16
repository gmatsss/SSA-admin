import React from "react";
import "./Knowledgebase.css";
import videoSource from "../videos/1.IntroductiontoSSA.mp4"; // Actual video source

const Introductions = () => {
  return (
    <div className="knowledgebase-container">
      <div className="knowledgebase-header">
        <h1 className="title">Introduction to SSA</h1>
        <p className="subtitle">
          An introductory guide to SSA and its core concepts.
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

export default Introductions;
