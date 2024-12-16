import React from "react";
import "./AdditionalCharge.css";

const AdditionalCharge = ({ botChannelValue }) => {
  const totalCost = botChannelValue * 19;

  return (
    <div className="billingvechannel-container">
      <div className="billingvechannel-header">
        <h2 className="billingvechannel-title">Expand Your Bot's Reach</h2>
        <p className="billingvechannel-description">
          Enhance your bot's capabilities by integrating with multiple channels.
          Each channel offers unique advantages and caters to different user
          preferences.
        </p>
      </div>

      <div className="billingvechannel-cost-info">
        <div className="billingvechannel-cost-detail">
          <span className="billingvechannel-cost-title">
            Total Channels Selected:
          </span>
          <span className="billingvechannel-cost-value">{botChannelValue}</span>
        </div>
        <div className="billingvechannel-cost-detail">
          <span className="billingvechannel-cost-title">Cost Per Channel:</span>
          <span className="billingvechannel-cost-value">$19.00</span>
        </div>
        <div className="billingvechannel-cost-detail">
          <span className="billingvechannel-cost-title">
            Total Additional Cost:
          </span>
          <span className="billingvechannel-cost-value">${totalCost}.00</span>
        </div>
      </div>

      <div className="billingvechannel-benefits">
        <h3 className="billingvechannel-benefits-title">Additional Channels</h3>
        <ul className="billingvechannel-benefits-list">
          <p>
            Investing in additional channels is a strategic move towards better
            user engagement and wider reach. As you grow, these channels will
            play a crucial role in maintaining effective communication and
            delivering exceptional user experiences.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default AdditionalCharge;
