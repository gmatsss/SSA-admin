import React, { useState } from "react";
import "./BuyBots.css";
import industryData from "../data/industry.json";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import Select from "react-select";

const BuyBots = ({ onSubmit }) => {
  const [botCount, setBotCount] = useState(1);
  const [currentBotData, setCurrentBotData] = useState({
    agentType: "",
    serviceIndustry: "",
    toneOfVoice: "",
  });
  const [allBotsData, setAllBotsData] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [planType, setPlanType] = useState("");

  const incrementBotCount = () => {
    if (
      currentBotData.agentType &&
      currentBotData.serviceIndustry &&
      currentBotData.toneOfVoice
    ) {
      setAllBotsData([...allBotsData, { ...currentBotData }]);
      setCurrentBotData({
        agentType: "",
        serviceIndustry: "",
        toneOfVoice: "",
      });
      setBotCount(botCount + 1);
      toast.success("Bot added successfully!");
    } else {
      toast.warning(
        "Please fill out all required bot details before adding a new bot."
      );
    }
  };

  const decrementBotCount = () => {
    if (botCount > 1) {
      setAllBotsData(allBotsData.slice(0, -1));
      setBotCount(botCount - 1);
      toast.success("Bot removed successfully!");
    } else {
      toast.warning("At least one bot is required.");
    }
  };

  const handleFilesAdded = (newFiles) => {
    const selectedFiles = Array.from(newFiles);
    const MAX_FILES = 3;
    const MAX_SIZE_MB = 25;

    if (selectedFiles.length + files.length > MAX_FILES) {
      toast.error(`You can only upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    const oversizedFiles = selectedFiles.filter(
      (file) => file.size / 1024 / 1024 > MAX_SIZE_MB
    );

    if (oversizedFiles.length > 0) {
      toast.error(`Each file must be less than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setFiles([...files, ...selectedFiles]);
    toast.success("Files uploaded successfully!");
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(updatedFiles);
    toast.success("File removed successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBotData({ ...currentBotData, [name]: value });
  };

  const handleChannelChange = (selectedOptions) => {
    const channels = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedChannels(channels);
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      agentType: !currentBotData.agentType ? "Agent Type is required" : "",
      serviceIndustry: !currentBotData.serviceIndustry
        ? "Service Industry is required"
        : "",
      toneOfVoice: !currentBotData.toneOfVoice
        ? "Tone of Voice is required"
        : "",
      planType: !planType ? "Plan type is required" : "",
    };

    const errorMessages = Object.entries(errors)
      .filter(([_, value]) => value !== "")
      .map(([_, value]) => value);

    if (errorMessages.length > 0) {
      toast.warning(errorMessages.join(", "));
      return;
    }

    const submissionData = {
      bots: [...allBotsData, { ...currentBotData }],
      additionalInfo: additionalInfo,
      channels: selectedChannels,
      files,
      planType,
    };

    onSubmit(submissionData);
  };

  const channelOptions = [
    { value: "Twilio", label: "Twilio" },
    { value: "FBMessenger", label: "FB Messenger" },
    { value: "Telegram", label: "Telegram" },
    { value: "WhatsApp", label: "WhatsApp" },
    { value: "WebChat", label: "Web Chat" },
    { value: "CustomAPI", label: "Custom API" },
  ];

  const toneOfVoiceOptions = [
    { value: "Professional", label: "Professional and Formal" },
    { value: "Friendly", label: "Friendly and Casual" },
    { value: "Empathetic", label: "Empathetic and Supportive" },
    { value: "Enthusiastic", label: "Enthusiastic and Energetic" },
    { value: "Concise", label: "Concise and Direct" },
    { value: "Humorous", label: "Humorous and Playful" },
    { value: "Educational", label: "Educational and Informative" },
    { value: "Youthful", label: "Youthful and Trendy" },
    { value: "Calm", label: "Calm and Reassuring" },
    { value: "Neutral", label: "Neutral and Objective" },
  ];

  return (
    <div className="buy-bot-container">
      <h2 className="buy-bot-header">Bot details</h2>
      <div className="buy-bot-subscription">
        <select
          className="buy-bot-select"
          value={planType}
          onChange={(e) => setPlanType(e.target.value)}
        >
          <option value="" disabled>
            Choose Your Subscription
          </option>
          <option value="monthly">Monthly Plan</option>
          <option value="yearly">Yearly Plan</option>
        </select>
      </div>

      <form className="buy-bot-form" onSubmit={handleSubmit}>
        <div className="buy-bot-section">
          <div className="buy-bot-row">
            <div className="buy-bot-group">
              <label className="buy-bot-label">
                Agent Type:
                <span
                  data-tooltip-id="agentTypeTooltip"
                  data-tooltip-content="Select the type of agent for this bot."
                >
                  ❓
                </span>
                <Tooltip id="agentTypeTooltip" place="top" effect="solid" />
              </label>
              <select
                className="buy-bot-input"
                name="agentType"
                value={currentBotData.agentType || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Agent Type
                </option>
                <option value="CustomerService">Customer Service</option>
                <option value="SalesAgents">Sales</option>
              </select>
            </div>
            <div className="buy-bot-group">
              <label className="buy-bot-label">
                Tone of Voice:
                <span
                  data-tooltip-id="toneOfVoiceTooltip"
                  data-tooltip-content="Select the tone of voice for this bot."
                >
                  ❓
                </span>
                <Tooltip id="toneOfVoiceTooltip" place="top" effect="solid" />
              </label>
              <select
                className="buy-bot-input"
                name="toneOfVoice"
                value={currentBotData.toneOfVoice || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Tone of Voice
                </option>{" "}
                {toneOfVoiceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="buy-bot-row">
            <div className="buy-bot-group">
              <label className="buy-bot-label">
                Service Industry:
                <span
                  data-tooltip-id="serviceIndustryTooltip"
                  data-tooltip-content="Select the service industry for this bot."
                >
                  ❓
                </span>
                <Tooltip
                  id="serviceIndustryTooltip"
                  place="top"
                  effect="solid"
                />
              </label>
              <select
                className="buy-bot-input"
                name="serviceIndustry"
                value={currentBotData.serviceIndustry || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select a Service Industry
                </option>
                {industryData.map((category, catIndex) => (
                  <optgroup key={catIndex} label={category.category}>
                    {category.industries.map((industry, indIndex) => (
                      <option key={indIndex} value={industry.industry_name}>
                        {industry.industry_name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="buy-bot-group">
              <label className="buy-bot-label">
                <div className="channeldiv-select">
                  <div>
                    Select Channels:
                    <span
                      data-tooltip-id="channelsTooltip"
                      data-tooltip-content="Select the communication channels."
                    >
                      ❓
                    </span>
                  </div>

                  {selectedChannels.length > 0 && (
                    <div className="buy-bot-warning">
                      Each selected channel adds $19 to your total.
                    </div>
                  )}
                </div>
                <Tooltip id="channelsTooltip" place="top" effect="solid" />
              </label>
              <Select
                isMulti
                name="channels"
                options={channelOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChannelChange}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "none", // Remove the inner border
                    boxShadow: "none", // Remove any shadow
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }),
                }}
              />
            </div>
          </div>
        </div>

        <div className="buy-bot-row">
          <div className="buy-bot-group">
            <label className="buy-bot-label">
              Current Bot Count:
              <span
                data-tooltip-id="botCountTooltip"
                data-tooltip-content="This shows the current number of bots."
              >
                ❓
              </span>
              <Tooltip id="botCountTooltip" place="top" effect="solid" />
            </label>
            <div className="buy-bot-count-container">
              <button
                type="button"
                className="buy-bot-count-button"
                onClick={decrementBotCount}
              >
                -
              </button>
              <span className="buy-bot-count">{botCount}</span>
              <button
                type="button"
                className="buy-bot-count-button"
                onClick={incrementBotCount}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="buy-bot-group">
          <label className="buy-bot-label">
            Additional Information:
            <span
              data-tooltip-id="additionalInfoTooltip"
              data-tooltip-content="Provide any additional information for the bot."
            >
              ❓
            </span>
            <Tooltip id="additionalInfoTooltip" place="top" effect="solid" />
          </label>
          <textarea
            className="buy-bot-textarea"
            placeholder="Message"
            name="additionalInfo"
            value={additionalInfo}
            onChange={handleAdditionalInfoChange}
          ></textarea>
        </div>
        <label className="buy-bot-upload">
          <input
            type="file"
            className="buy-bot-input-file"
            multiple
            onChange={(e) => handleFilesAdded(e.target.files)}
          />
          <p className="buy-bot-upload-text">
            Drag and drop files here or click to select (Max 3 files, 25MB each)
          </p>
        </label>

        <div className="buy-bot-file-list">
          {files.map((file, index) => (
            <div key={index} className="buy-bot-file-item">
              <span>{file.name}</span>
              <button
                type="button"
                className="buy-bot-file-remove"
                onClick={() => handleRemoveFile(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="buy-bot-container-button">
          <button className="buy-bot-submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyBots;
