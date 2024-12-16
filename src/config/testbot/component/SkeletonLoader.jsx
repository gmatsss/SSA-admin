import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-info">
        <div className="skeleton-line skeleton-line-short"></div>
        <div className="skeleton-line skeleton-line-long"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
