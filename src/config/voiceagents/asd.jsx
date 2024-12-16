import React, { useState, useEffect } from "react";
import "./voiceagents.css";
import TalkIcon from "@mui/icons-material/Phone";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import VAImage from "../../img/13botchat.png";
import { fetchVoiceAgents, initiateCall } from "./voiceAgentUtils";
import StopIcon from "./StopIcon";

const VoiceAgents = () => {
  const [agents, setAgents] = useState([]);
  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isTalking, setIsTalking] = useState([]);
  const [activeBotIndex, setActiveBotIndex] = useState(null);
  const [openMenuIndexes, setOpenMenuIndexes] = useState({});

  useEffect(() => {
    const sampleAgents = [
      {
        _id: "1",
        voiceOfTheAgent: "SSA Voice Assistant 1",
        MinutesUsed: "120",
        phoneNumber: "+1234567890",
        botStatus: "Online",
      },
      {
        _id: "2",
        voiceOfTheAgent: "SSA Voice Assistant 2",
        MinutesUsed: "85",
        phoneNumber: "+0987654321",
        botStatus: "Offline",
      },
      {
        _id: "3",
        voiceOfTheAgent: "SSA Voice Assistant 3",
        MinutesUsed: "200",
        phoneNumber: "+1122334455",
        botStatus: "Online",
      },
      {
        _id: "4",
        voiceOfTheAgent: "SSA Voice Assistant 4",
        MinutesUsed: "150",
        phoneNumber: "+2233445566",
        botStatus: "Busy",
      },
      {
        _id: "5",
        voiceOfTheAgent: "SSA Voice Assistant 5",
        MinutesUsed: "300",
        phoneNumber: "+3344556677",
        botStatus: "Online",
      },
      {
        _id: "6",
        voiceOfTheAgent: "SSA Voice Assistant 6",
        MinutesUsed: "50",
        phoneNumber: "+4455667788",
        botStatus: "Offline",
      },
      {
        _id: "7",
        voiceOfTheAgent: "SSA Voice Assistant 7",
        MinutesUsed: "75",
        phoneNumber: "+5566778899",
        botStatus: "Online",
      },
      {
        _id: "8",
        voiceOfTheAgent: "SSA Voice Assistant 8",
        MinutesUsed: "180",
        phoneNumber: "+6677889900",
        botStatus: "Busy",
      },
      {
        _id: "9",
        voiceOfTheAgent: "SSA Voice Assistant 9",
        MinutesUsed: "130",
        phoneNumber: "+7788990011",
        botStatus: "Online",
      },
      {
        _id: "10",
        voiceOfTheAgent: "SSA Voice Assistant 10",
        MinutesUsed: "95",
        phoneNumber: "+8899001122",
        botStatus: "Offline",
      },
      {
        _id: "11",
        voiceOfTheAgent: "SSA Voice Assistant 11",
        MinutesUsed: "220",
        phoneNumber: "+9900112233",
        botStatus: "Online",
      },
      {
        _id: "12",
        voiceOfTheAgent: "SSA Voice Assistant 12",
        MinutesUsed: "170",
        phoneNumber: "+0011223344",
        botStatus: "Busy",
      },
      {
        _id: "13",
        voiceOfTheAgent: "SSA Voice Assistant 13",
        MinutesUsed: "60",
        phoneNumber: "+1122334455",
        botStatus: "Offline",
      },
      {
        _id: "14",
        voiceOfTheAgent: "SSA Voice Assistant 14",
        MinutesUsed: "145",
        phoneNumber: "+2233445566",
        botStatus: "Online",
      },
      {
        _id: "15",
        voiceOfTheAgent: "SSA Voice Assistant 15",
        MinutesUsed: "250",
        phoneNumber: "+3344556677",
        botStatus: "Online",
      },
    ];

    setAgents(sampleAgents);
    setDevices([]); // Assuming no initial devices
    setConnections([]); // Assuming no initial connections
    setIsTalking(Array(sampleAgents.length).fill(false)); // Assuming no agents are talking initially
  }, []);

  const handleTalkClick = (index) => {
    initiateCall(
      index,
      agents,
      devices,
      setDevices,
      setConnections,
      setIsTalking,
      setActiveBotIndex,
      connections,
      isTalking,
      setAgents
    );
  };

  const handleMenuClick = (index) => {
    setOpenMenuIndexes((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the specific bot's menu
    }));
  };

  return (
    <div className="VA-container">
      {agents.map((agent, index) => (
        <div
          key={agent._id}
          className={`VA-bot-card ${isTalking[index] ? "active" : ""} ${
            index % 2 === 0 ? "blue-theme" : "red-theme"
          }`}
        >
          <div className="VA-header">
            <div className="VA-header-left">
              <ArrowBackIcon
                className="VA-back-icon"
                onClick={() => console.log("Back clicked")}
                style={{ cursor: "pointer", fontSize: "33px" }}
              />
            </div>
            <div className="VA-header-right">
              <MenuIcon
                className="VA-menu-icon"
                onClick={() => handleMenuClick(index)}
                style={{ cursor: "pointer", fontSize: "33px" }}
              />
            </div>
            <div className="VA-inner-rounded"></div>
          </div>
          <div className="VA-bot-content">
            {openMenuIndexes[index] ? (
              <div className="VA-menu-content">
                <textarea
                  id={`knowledge-${index}`}
                  placeholder="Enter agent knowledge"
                  className="VA-textarea"
                ></textarea>
                <textarea
                  id={`limitations-${index}`}
                  placeholder="Enter limitations"
                  className="VA-textarea"
                ></textarea>
                <textarea
                  id={`prompt-${index}`}
                  placeholder="Enter agent prompt"
                  className="VA-textarea"
                ></textarea>
                <textarea
                  id={`greeting-${index}`}
                  placeholder="Enter agent greeting"
                  className="VA-textarea"
                ></textarea>
                <textarea
                  id={`behavior-${index}`}
                  placeholder="Select behavior"
                  className="VA-textarea"
                ></textarea>
                <textarea
                  id={`voice-${index}`}
                  placeholder="Select voice"
                  className="VA-textarea"
                ></textarea>
              </div>
            ) : (
              <>
                <img src={VAImage} alt="Voice Agent" className="VA-bot-image" />
                <h4>{agent.voiceOfTheAgent}</h4>
              </>
            )}
          </div>
          <div className="VA-bot-footer">
            {!openMenuIndexes[index] && (
              <div className="VA-agent-info">
                <p>
                  <strong>Minutes Used:</strong> {agent.MinutesUsed}
                </p>
                <p></p>
                <p>
                  <strong>Phone Number:</strong> {agent.phoneNumber}
                </p>
                <p>
                  <strong>Status:</strong> {agent.botStatus}
                </p>
              </div>
            )}
            <div
              className="VA-talk-button"
              onClick={() => handleTalkClick(index)}
              style={{
                display:
                  activeBotIndex === null || activeBotIndex === index
                    ? "flex"
                    : "none",
              }}
            >
              {isTalking[index] ? (
                <StopIcon />
              ) : (
                <TalkIcon className="VA-icon" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoiceAgents;
