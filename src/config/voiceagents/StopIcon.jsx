import React from "react";
import "./StopIcon.css";

const StopIcon = () => {
  return (
    <div className="stop-icon">
      <div className="sound-wave left medium"></div>
      <div className="sound-wave left large"></div>
      <div className="sound-wave left small"></div>
      <div className="sound-wave left xsmall"></div>
      <div className="stop-symbol"></div>
      <div className="sound-wave right xsmall"></div>
      <div className="sound-wave right small"></div>
      <div className="sound-wave right large"></div>
      <div className="sound-wave right medium"></div>
    </div>
  );
};

export default StopIcon;
