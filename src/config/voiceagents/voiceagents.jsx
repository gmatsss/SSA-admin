import React, { useState, useEffect } from "react";
import TalkIcon from "@mui/icons-material/Phone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import VAImage from "../../img/13botchat.png";
import { fetchVoiceAgents, initiateCall } from "./voiceAgentUtils";
import StopIcon from "./StopIcon";
import { toast } from "react-toastify";
import "./voiceagents.css";
import "./responsivevoiceagents.css";

const VoiceAgents = () => {
  const [agents, setAgents] = useState([]);
  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isTalking, setIsTalking] = useState([]);
  const [activeBotIndex, setActiveBotIndex] = useState(null);
  const [openMenuIndexes, setOpenMenuIndexes] = useState({});

  useEffect(() => {
    const initializeAgents = async () => {
      const { agents, devices, connections, isTalking } =
        await fetchVoiceAgents();
      setAgents(agents);
      setDevices(devices);
      setConnections(connections);
      setIsTalking(isTalking);
    };

    initializeAgents();
  }, []);

  const handleTalkClick = (index) => {
    if (agents[index].botStatus === "canceled") {
      toast.warning("This voice agent is canceled and cannot be called.");
      return;
    }

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

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Phone number copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy phone number.");
      });
  };

  console.log(agents);

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
                  <strong>Phone Number:</strong>{" "}
                  <span
                    onClick={() => copyToClipboard(agent.phoneNumber)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {agent.phoneNumber}
                  </span>
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
