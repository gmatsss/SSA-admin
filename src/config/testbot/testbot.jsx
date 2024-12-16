import React, { useState, useEffect } from "react";
import "./testbot.css";
import "./testbot-responsive.css";
import { FaCopy } from "react-icons/fa";
import { fetchData } from "../../api/FetchData";
import { toast } from "react-toastify";
import SkeletonLoader from "./component/SkeletonLoader";
import agentTypeIcon from "../../img/7agentype.png";
import industryIcon from "../../img/8industry.png";
import toneIcon from "../../img/9tone.png";
import accessIcon from "../../img/10acess.png";
import statusIcon from "../../img/11status.png";
import userChatIcon from "../../img/12userchat.png";
import botChatIcon from "../../img/13botchat.png";
import email from "../../img/email.png";
import phone from "../../img/phone.png";

const Testbot = () => {
  const [selectedBot, setSelectedBot] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [threadId, setThreadId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const retuneApiKey = process.env.REACT_APP_RETUNE_API_KEY;

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const bots = await fetchData("admin/get_bots");
        const flattenedData = bots.onboardingDetails.agents.flatMap(
          (agent) => agent.agents
        );
        setAgents(flattenedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bots:", error);
        setLoading(false);
      }
    };

    fetchBots();
  }, []);

  useEffect(() => {
    if (selectedBot && selectedBot.botStatus.toLowerCase() === "active") {
      createNewThread();
    }
  }, [selectedBot]);

  const createNewThread = async () => {
    if (!selectedBot || !selectedBot.SSAApi) return;
    try {
      const headers = {
        "Content-Type": "application/json",
        "X-Retune-API-Key": retuneApiKey, // Use the environment variable here
      };
      const response = await fetchData(
        "retune/dynamic-api/create-dynamic-thread",
        "POST",
        { chatId: selectedBot.SSAApi },
        headers
      );

      if (response && response.threadId) {
        setThreadId(response.threadId);
      }
    } catch (error) {
      console.error("Failed to create new thread:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !threadId) return;

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputMessage },
    ]);

    const data = {
      threadId: threadId,
      input: inputMessage,
    };

    const headers = {
      "X-Retune-API-Key": retuneApiKey, // Use the environment variable here
    };

    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetchData(
        `retune/api/chat/${selectedBot.SSAApi}/response`,
        "POST",
        data,
        headers
      );

      const messageValue = response?.response?.value;

      if (messageValue) {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: messageValue },
        ]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBotSelection = (bot) => {
    setSelectedBot(bot);
    setChatMessages([]);
    setThreadId(null);
  };

  const handleSendMessage = () => {
    if (!selectedBot) {
      toast.error("Please select a bot first.");
      return;
    }

    const botStatus = selectedBot.botStatus.toLowerCase();

    if (botStatus === "canceled") {
      toast.warning("The selected bot is canceled and cannot send messages.");
      return;
    } else if (botStatus === "in progress") {
      toast.info(
        "The selected bot is currently in progress. and cannot send messages."
      );
      return;
    }

    if (inputMessage.trim()) {
      sendMessage();
    } else {
      toast.warning("Please type a message first");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Support details copied to clipboard!");
  };

  return (
    <div className="bot-container">
      <div className="bot-sidebar">
        <div className="bot-list-container">
          <div className="bot-list-header">
            <h2 className="bot-list-title">Available Bots</h2>
          </div>
          <div className="bot-list">
            {loading
              ? Array.from({ length: 2 }).map((_, index) => (
                  <SkeletonLoader key={index} />
                ))
              : agents &&
                agents
                  .filter((agent) =>
                    ["active", "canceled", "in progress"].includes(
                      agent.botStatus.toLowerCase()
                    )
                  )
                  .map((agent, index) => (
                    <div
                      key={index}
                      className={`bot-list-item ${agent.botStatus
                        .toLowerCase()
                        .replace(" ", "")} ${
                        selectedBot && selectedBot._id === agent._id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleBotSelection(agent)}
                    >
                      <span className="bot-list-icon">
                        <img src={botChatIcon} alt="Bot Icon" />
                      </span>
                      <div className="bot-list-info">
                        <p className="bot-list-status">{agent.botStatus}</p>
                      </div>
                    </div>
                  ))}
          </div>
        </div>

        <div className="bot-info">
          <div className="bot-header">
            <p className="bot-title">Bot details</p>
            {selectedBot && <p className="bot-id">ID: {selectedBot._id}</p>}
          </div>
          <div className="bots-detailss">
            <div className="bot-detail-item">
              <div className="botdetail-title">
                <span className="icon">
                  <img src={agentTypeIcon} alt="Agent Icon" />
                </span>
                <span className="detail-text-title">Agent Type:</span>
              </div>
              <div className="botdetail-info">
                <span className="detail-text agent-type">
                  {selectedBot ? selectedBot.agentType : "N/A"}
                </span>
              </div>
            </div>

            <div className="bot-detail-item">
              <div className="botdetail-title">
                <span className="icon">
                  <img src={industryIcon} alt="Industry Icon" />
                </span>
                <span className="detail-text-title">Industry:</span>
              </div>
              <div className="botdetail-info">
                <span className="detail-text industry">
                  {selectedBot ? selectedBot.serviceIndustry : "N/A"}
                </span>
              </div>
            </div>

            <div className="bot-detail-item">
              <div className="botdetail-title">
                <span className="icon">
                  <img src={toneIcon} alt="Tone Icon" />
                </span>
                <span className="detail-text-title">Tone:</span>
              </div>
              <div className="botdetail-info">
                <span className="detail-text tone">
                  {selectedBot ? selectedBot.toneOfVoice : "N/A"}
                </span>
              </div>
            </div>

            <div className="bot-detail-item">
              <div className="botdetail-title">
                <span className="icon">
                  <img src={accessIcon} alt="Access Icon" />
                </span>
                <span className="detail-text-title">Access:</span>
              </div>
              <div className="botdetail-info">
                <span className="detail-text access">
                  {selectedBot
                    ? selectedBot.lifetimeAccess
                      ? "Lifetime"
                      : "Recurring"
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="bot-detail-item">
              <div className="botdetail-title">
                <span className="icon">
                  <img src={statusIcon} alt="Status Icon" />
                </span>
                <span className="detail-text-title">Status:</span>
              </div>
              <div className="botdetail-info">
                <span className="detail-text status">
                  {selectedBot ? selectedBot.botStatus : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="support-info">
          <p className="support-text">Support Information</p>
          <div className="support-contact">
            <div className="contact-details">
              <span className="icon">
                <img src={email} alt="Envelope Icon" />
              </span>
              <span className="contact-text">support@supersmartagents.com</span>
            </div>
            <FaCopy
              className="copysupport-icon"
              onClick={() => handleCopy("support@supersmartagents.com")}
            />
          </div>
          <div className="support-contact">
            <div className="contact-details">
              <span className="icon">
                <img src={phone} alt="Phone Icon" />
              </span>
              <span className="contact-text">888-985-6854</span>
            </div>
            <FaCopy
              className="copysupport-icon"
              onClick={() => handleCopy("888-985-6854")}
            />
          </div>
        </div>
      </div>

      <div className="bot-chat">
        <div className="chat-header">
          <p className="chat-title">SuperSmartAgent</p>
        </div>
        <div className="chat-messages">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === "bot" ? "bot-message" : "user-message"
              }`}
            >
              <span className="message-icon">
                <img
                  src={msg.sender === "bot" ? botChatIcon : userChatIcon}
                  alt={msg.sender === "bot" ? "Robot" : "User Icon"}
                />
              </span>
              <p className="message-text">{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type messages..."
            className="input-message"
            onKeyPress={handleKeyPress}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            <span className="send-icon">➤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testbot;
