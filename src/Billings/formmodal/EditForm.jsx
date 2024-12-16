import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./EditForm.css";
import industryData from "../data/industry.json";

const EditForm = ({
  isOpen,
  onClose,
  formData,
  onSubmit,
  isPaymentVerified,
}) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData); // Sync local state with parent formData when modal opens
  }, [formData]);

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

  const planTypeOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const handleLocalChange = (e, index, field) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => {
      if (index !== null && index !== undefined) {
        // Update bots array if index is provided
        const updatedBots = [...prevData.bots];
        updatedBots[index] = { ...updatedBots[index], [field || name]: value };
        return { ...prevData, bots: updatedBots };
      } else {
        // Otherwise, update general fields like additionalInfo
        return { ...prevData, [field || name]: value };
      }
    });
  };

  const handleLocalChannelChange = (selectedOptions) => {
    const selectedChannels = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setLocalFormData((prevData) => ({
      ...prevData,
      channels: selectedChannels,
    }));
  };

  const handlePlanTypeChange = (selectedOption) => {
    setLocalFormData((prevData) => ({
      ...prevData,
      planType: selectedOption.value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setLocalFormData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...selectedFiles],
    }));
  };

  const handleRemoveFile = (index) => {
    setLocalFormData((prevData) => {
      const updatedFiles = prevData.files.filter((_, i) => i !== index);
      return { ...prevData, files: updatedFiles };
    });
  };

  const handleAddBot = () => {
    if (!isPaymentVerified) {
      setLocalFormData((prevData) => ({
        ...prevData,
        bots: [
          ...prevData.bots,
          { agentType: "", toneOfVoice: "", serviceIndustry: "" },
        ],
      }));
    }
  };

  const handleRemoveBot = (index) => {
    if (!isPaymentVerified) {
      setLocalFormData((prevData) => {
        const updatedBots = prevData.bots.filter((_, i) => i !== index);
        return { ...prevData, bots: updatedBots };
      });
    }
  };

  const handleLocalSubmit = () => {
    onSubmit(localFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="editformpayment-modal-overlay">
      <div className="editformpayment-modal-content">
        <h2>Edit Bot Form</h2>
        <form className="editformpayment-edit-form">
          {localFormData.bots.map((bot, index) => (
            <div key={index} className="editformpayment-bot-section">
              <div className="editformpayment-bot-header">
                <h3>Bot {index + 1}</h3>
                {localFormData.bots.length > 1 && !isPaymentVerified && (
                  <button
                    type="button"
                    className="editformpayment-remove-bot-btn"
                    onClick={() => handleRemoveBot(index)}
                  >
                    Remove Bot
                  </button>
                )}
              </div>

              <div className="editformpayment-form-group">
                <label>Agent Type:</label>
                <select
                  value={bot.agentType}
                  name={`agentType-${index}`}
                  onChange={(e) => handleLocalChange(e, index, "agentType")}
                  disabled={isPaymentVerified}
                >
                  <option value="CustomerService">Customer Service</option>
                  <option value="SalesAgents">Sales</option>
                </select>
              </div>

              <div className="editformpayment-form-group">
                <label>Tone of Voice:</label>
                <select
                  value={bot.toneOfVoice}
                  name={`toneOfVoice-${index}`}
                  onChange={(e) => handleLocalChange(e, index, "toneOfVoice")}
                  disabled={isPaymentVerified}
                >
                  {toneOfVoiceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="editformpayment-form-group">
                <label>Service Industry:</label>
                <select
                  name={`serviceIndustry-${index}`}
                  value={bot.serviceIndustry}
                  onChange={(e) =>
                    handleLocalChange(e, index, "serviceIndustry")
                  }
                  disabled={isPaymentVerified}
                >
                  <option value="" disabled>
                    Select an Industry
                  </option>
                  {industryData.map((category, categoryIndex) => (
                    <optgroup key={categoryIndex} label={category.category}>
                      {category.industries.map((industry, industryIndex) => (
                        <option
                          key={industryIndex}
                          value={industry.industry_name}
                        >
                          {industry.industry_name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {!isPaymentVerified && (
            <button
              type="button"
              className="editformpayment-add-bot-btn"
              onClick={handleAddBot}
            >
              Add Another Bot
            </button>
          )}

          <div className="editformpayment-form-group">
            <label>Select Channels:</label>
            <Select
              isMulti
              value={localFormData.channels.map((channel) => ({
                value: channel,
                label: channel,
              }))}
              name="channels"
              options={channelOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleLocalChannelChange}
            />
          </div>

          <div className="editformpayment-form-group">
            <label>Plan Type:</label>
            <Select
              value={planTypeOptions.find(
                (option) => option.value === localFormData.planType
              )}
              options={planTypeOptions}
              onChange={handlePlanTypeChange}
              isDisabled={isPaymentVerified}
            />
          </div>

          <div className="editformpayment-form-group">
            <label>Additional Information:</label>
            <textarea
              name="additionalInfo"
              value={localFormData.additionalInfo || ""}
              onChange={(e) => handleLocalChange(e, null, "additionalInfo")}
            ></textarea>
          </div>

          <div className="editformpayment-form-group">
            <label>Upload Files:</label>
            <input
              type="file"
              name="files"
              multiple
              onChange={handleFileChange}
            />
            <div className="editformpayment-uploaded-files">
              {localFormData.files.map((file, index) => (
                <div key={index} className="editformpayment-file-item">
                  <span>{file.name}</span>
                  <button type="button" onClick={() => handleRemoveFile(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="editformpayment-form-actions">
            <button type="button" onClick={handleLocalSubmit}>
              Submit Changes
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
