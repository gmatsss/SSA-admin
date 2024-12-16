import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./CheckoutCard.css";

const CheckoutCard = ({
  botsWithLifetimeAccess,
  selectedBots,
  handleSelectionChange,
  handleViewDetails,
  onProceedToCheckout,
  botSubscriptions,
}) => {
  const [visibleDetails, setVisibleDetails] = useState({});

  const maxSelections = 4;
  const isMaxSelected = selectedBots.length >= maxSelections;

  const handleCheckboxChange = (agentId) => {
    if (selectedBots.includes(agentId) || !isMaxSelected) {
      handleSelectionChange(agentId);
    }
  };

  const toggleDetailsVisibility = (agentId) => {
    setVisibleDetails((prevState) => ({
      ...prevState,
      [agentId]: !prevState[agentId],
    }));
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    selectedBots.forEach((agentId) => {
      const bot = botsWithLifetimeAccess.find((bot) => bot.agentId === agentId);
      const subscriptionType = botSubscriptions[bot._id];
      if (subscriptionType === "Yearly") {
        totalCost += 1440;
      } else if (subscriptionType === "Monthly") {
        totalCost += 1995;
      }
    });
    return totalCost;
  };

  return (
    <div className="maincard-container">
      <div className="checkout-card-container">
        <div className="checkout-card-header">Your Selection</div>
        <div className="checkout-card-body">
          {botsWithLifetimeAccess.map((bot) => (
            <div key={bot.agentId} className="checkout-bot-selection">
              <div className="checkout-bot-header">
                <div className="checkout-bot-input-label">
                  <div className="checkout-bot-checkbox-container">
                    <input
                      type="checkbox"
                      id={bot.agentId}
                      name="bot"
                      value={bot.agentId}
                      checked={selectedBots.includes(bot.agentId)}
                      onChange={() => handleCheckboxChange(bot.agentId)}
                      disabled={
                        !selectedBots.includes(bot.agentId) && isMaxSelected
                      }
                      className="checkout-bot-checkbox"
                    />
                  </div>
                  <div className="checkout-bot-label-container">
                    <label htmlFor={bot.agentId} className="checkout-bot-label">
                      {bot.agentType}
                    </label>
                  </div>
                </div>

                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => toggleDetailsVisibility(bot.agentId)}
                  className="checkout-view-details-icon"
                />
              </div>

              {visibleDetails[bot.agentId] && (
                <div className="checkout-bot-details">
                  <div className="checkout-bot-detail-row">
                    <div className="checkout-bot-detail-labels">
                      <div className="checkout-detail-label">
                        Tone of Voice:
                      </div>
                      <div className="checkout-detail-label">
                        Service Industry:
                      </div>
                      <div className="checkout-detail-label">Agent Type:</div>
                    </div>
                    <div className="checkout-bot-detail-values">
                      <div className="checkout-detail-text">
                        {bot.toneOfVoice}
                      </div>
                      <div className="checkout-detail-text">
                        {bot.serviceIndustry}
                      </div>
                      <div className="checkout-detail-text">
                        {bot.agentType}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="checkout-card-footer">
          <div className="checkout-total-cost">
            Total cost with Lifetime Access:{" "}
            <span className="checkout-cost-amount">
              ${calculateTotalCost()}
            </span>
          </div>
          <button className="checkout-button" onClick={onProceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
