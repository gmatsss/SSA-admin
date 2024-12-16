import React, { useState } from "react";
import { fetchData } from "../../api/FetchData";
import "./DomainNameInput.css"; // Assuming you will style using a CSS file
import { toast } from "react-toastify";

const DomainNameInput = ({ domainName, setDomainName }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDomainChange = (e) => {
    const value = e.target.value;
    setDomainName(value);

    // Simple domain name validation
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9]+\.[a-zA-Z0-9]{2,})$/;
    setError(!domainRegex.test(value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = { domainName };

      // Make the POST request to the server
      const response = await fetchData("Admin/updatedomainname", "POST", data);

      // Handle the response
      toast.success(response.message);
      // Add any additional submit logic here
    } catch (error) {
      console.error("Error updating domain name:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="domain-container">
      <div className="domain-header">
        <h2>Domain</h2>
      </div>
      <div className="domain-box">
        <h3>Connect Your Domain</h3>
        <p>
          Enter your domain name below to configure the DNS settings. This will
          ensure that your domain is properly connected to our services.
        </p>
        <input
          type="text"
          value={domainName}
          onChange={handleDomainChange}
          placeholder="Type your domain name..."
          className={`domain-input ${error ? "input-error" : ""}`}
        />
        {error && (
          <small className="error-text">
            Please enter a valid domain name.
          </small>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!domainName || error || loading}
          className="Domainsubmits-button"
        >
          {loading ? "Submitting..." : "Submit Domain"}
        </button>
      </div>
    </div>
  );
};

export default DomainNameInput;
