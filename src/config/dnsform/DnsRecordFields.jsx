import React from "react";
import { toast } from "react-toastify";
import "./DnsRecordFields.css";
import { FaRegCopy } from "react-icons/fa";

const RecordField = ({ label, value, onCopy }) => (
  <div className="record-field">
    <div className="input-container">
      <input type="text" value={value || ""} readOnly placeholder={label} />
      <span className="copy-icon" onClick={() => onCopy(value, label)}>
        <FaRegCopy />
      </span>
    </div>
  </div>
);

const DnsRecordFields = ({
  title,
  instructions,
  recordType,
  recordName,
  recordValue,
}) => {
  const copyToClipboard = (text, label) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.info(`${label} copied to clipboard`);
      })
      .catch((err) => {
        toast.error("Failed to copy");
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="dns-record">
      <div className="record-header">
        <h6>{title}</h6>
        <div className="tooltip-container">
          <button className="help-buttons">?</button>
          <span className="tooltip-text">{instructions}</span>
        </div>
      </div>
      <div className="record-fields">
        <RecordField label="Type" value={recordType} onCopy={copyToClipboard} />
        <RecordField label="Name" value={recordName} onCopy={copyToClipboard} />
        <RecordField
          label="Value"
          value={recordValue}
          onCopy={copyToClipboard}
        />
      </div>
    </div>
  );
};

export default DnsRecordFields;
