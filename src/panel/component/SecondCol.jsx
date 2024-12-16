import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api/FetchData";
import "./css/secondcol.css";
import "./css/responsivesecondcol.css";
import "./css/animation.css";
import barchart from "../../img/barchart.png";
import user from "../../img/user.png";
import useravatar from "../../img/useravatar.webp";

const SecondCol = () => {
  const navigate = useNavigate();
  const [ssaBotCount, setSsaBotCount] = useState(0);
  const [ssaVACount, setSsaVACount] = useState(0);
  const [userStats, setUserStats] = useState({
    activeUsers: 0,
    newSignUps: 0,
    engagementRate: "0%",
  });

  // Ref to track if counts are animated already
  const isCountAnimated = useRef(false);

  useEffect(() => {
    // Only run if the counts are not animated
    if (!isCountAnimated.current) {
      fetchData("bot/getNumberOfBotsRegistered")
        .then((data) => {
          if (data.success) {
            animateCount(data.numberOfBots, setSsaBotCount);
            animateCount(data.numberOfVoiceAgents, setSsaVACount);
          } else {
            console.error("Failed to fetch bot and VA counts:", data.message);
          }
        })
        .catch((error) =>
          console.error("Failed to fetch bot and VA counts:", error)
        );

      // Fetch user statistics
      fetchData("Admin/getUserStatistics")
        .then((data) => {
          if (data.success && data.data) {
            animateCount(4000, (value) =>
              setUserStats((prev) => ({ ...prev, activeUsers: value }))
            );
            animateCount(data.data.newSignUps || 3000, (value) =>
              setUserStats((prev) => ({ ...prev, newSignUps: value }))
            );
            setUserStats((prev) => ({
              ...prev,
              engagementRate: data.engagementRate || "100%",
            }));
          } else {
            console.error("Failed to fetch user statistics:", data.message);
          }
        })
        .catch((error) =>
          console.error("Failed to fetch user statistics:", error)
        );

      // Mark as animated so it doesn't repeat
      isCountAnimated.current = true;
    }
  }, []);

  const animateCount = (end, setState) => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 50);

    const countUp = () => {
      start += increment;
      if (start < end) {
        setState(Math.floor(start));
        setTimeout(countUp, 50);
      } else {
        setState(end);
      }
    };

    countUp();
  };

  const handleNavigation = (destination) => {
    navigate(destination);
  };

  // Activity Component inside SecondCol
  const Activity = ({ avatar, name, details, time }) => {
    return (
      <div className="activity">
        <div className="activity-avatar">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="activity-content">
          <p className="activity-name">{name}</p>
          <p className="activity-details">{details}</p>
        </div>
        <div className="activity-time">{time}</div>
      </div>
    );
  };

  // Sample activities data
  const activities = [
    {
      avatar: useravatar,
      name: "Janet Williams",
      details: "New ticket submitted\nServer maintenance completed",
      time: "14:21pm",
    },
    {
      avatar: useravatar,
      name: "Janet Williams",
      details: "New ticket submitted\nServer maintenance completed",
      time: "14:21pm",
    },
    {
      avatar: useravatar,
      name: "Janet Williams",
      details: "New ticket submitted\nServer maintenance completed",
      time: "14:21pm",
    },
    {
      avatar: useravatar,
      name: "Janet Williams",
      details: "New ticket submitted\nServer maintenance completed",
      time: "14:21pm",
    },
  ];

  return (
    <div className="main-container secondcol">
      <div className="top-row">
        <div
          className="custom-card"
          onClick={() => handleNavigation("/Admin/configs")}
        >
          <div className="donut-chart">
            <svg className="circle-container">
              <circle
                className="circle-background"
                cx="40"
                cy="40"
                r="35"
              ></circle>
              <circle
                className="circle-foreground red"
                cx="40"
                cy="40"
                r="35"
              ></circle>
            </svg>
            <div className="circle-center">{ssaBotCount}</div>
          </div>
          <div className="chart-label">SSA BOT</div>
        </div>
        <div
          className="custom-card"
          onClick={() => handleNavigation("/Admin/configs?tab=VoiceAgents")}
        >
          <div className="donut-chart">
            <svg className="circle-container">
              <circle
                className="circle-background"
                cx="40"
                cy="40"
                r="35"
              ></circle>
              <circle
                className="circle-foreground blue"
                cx="40"
                cy="40"
                r="35"
              ></circle>
            </svg>
            <div className="circle-center">{ssaVACount}</div>
          </div>
          <div className="chart-label">SSA VA</div>
        </div>
      </div>

      <div className="middle-row">
        <div className="left-column">
          <div className="ssa-users-card">
            <div className="card-content">
              <h4 className="stat-title">SSA Users</h4>
              <p className="stat-value">{userStats.activeUsers}</p>
            </div>
            <div className="chart-icon">
              <img src={barchart} alt="Chart Icon" />
            </div>
          </div>
          <div className="new-signups-card">
            <div className="card-content">
              <h4 className="stat-title">New Sign-ups</h4>
              <p className="stat-value">{userStats.newSignUps}</p>
            </div>
            <div className="chart-icon">
              <img src={user} alt="Chart Icon" />
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="engagement-card">
            <div className="engagement-fully-filled">
              <svg className="circle-container-engagement">
                <circle
                  className="circle-background-engagement"
                  cx="40"
                  cy="40"
                  r="35"
                ></circle>
                <circle
                  className="circle-foreground-engagement navy-blue"
                  cx="40"
                  cy="40"
                  r="35"
                  style={{ strokeDashoffset: "0" }}
                ></circle>
              </svg>
              <div className="circle-center">{userStats.engagementRate}</div>
            </div>
            <h4 className="stat-title">Engagement Rate</h4>
          </div>
        </div>
      </div>

      <div className="bottom-row">
        <div className="card large recent-activities">
          <div className="recent-activities-header">
            <h3 className="recent-activities-title">Recent Activities</h3>
            <span className="notification-badge">6</span>
          </div>
          {activities.map((activity, index) => (
            <Activity
              key={index}
              avatar={activity.avatar}
              name={activity.name}
              details={activity.details}
              time={activity.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondCol;
