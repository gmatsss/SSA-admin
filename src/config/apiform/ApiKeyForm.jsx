import React, { useState, useEffect } from "react";
import { fetchData } from "../../api/FetchData";
import "./ApiKeyForm.css";
import { toast } from "react-toastify";

const ApiKeyForm = () => {
  const [apiKeys, setApiKeys] = useState({
    openAI: "",
    claude: "",
    openRouter: "",
  });
  const [openAPIKey, setOpenAPIKey] = useState({});
  const [userinfo, setUserinfo] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const bots = await fetchData("admin/get_bots");
        setUserinfo(bots);
        setOpenAPIKey(bots.onboardingDetails?.openAPIKey || {});
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e, key) => {
    setApiKeys({ ...apiKeys, [key]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!apiKeys.openAI && !apiKeys.claude && !apiKeys.openRouter) {
      toast.info("Please provide at least one API key.");
      return;
    }

    const dataToSend = {
      openAI: apiKeys.openAI,
      claude: apiKeys.claude,
      openRouter: apiKeys.openRouter,
    };

    try {
      const response = await fetchData(
        "Admin/updateapikey",
        "POST",
        dataToSend
      );
      if (response) {
        toast.success("API keys updated successfully!");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while updating the API keys."
      );
    }
  };

  return (
    <form className="api-key-form-container">
      <div className="api-key-form">
        <div className="form-header">
          <h4>API Key Setup</h4>
          <p>
            To ensure a seamless experience, please provide one of your API keys
            below.
          </p>
        </div>
        <div className="form-body">
          <div className="form-group">
            <label htmlFor="openAI">OpenAI API Key</label>
            <input
              type="text"
              id="openAI"
              value={apiKeys.openAI || openAPIKey?.OpenAI || ""}
              onChange={(e) => handleInputChange(e, "openAI")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="claude">Claude API Key</label>
            <input
              type="text"
              id="claude"
              value={apiKeys.claude || openAPIKey?.Claude || ""}
              onChange={(e) => handleInputChange(e, "claude")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="openRouter">OpenRouter API Key</label>
            <input
              type="text"
              id="openRouter"
              value={apiKeys.openRouter || openAPIKey?.OpenRouter || ""}
              onChange={(e) => handleInputChange(e, "openRouter")}
            />
          </div>
        </div>
        <div className="form-footer">
          <button type="button" className="save-button" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default ApiKeyForm;
