import React from "react";
import { toast } from "react-toastify";
import "./LifetimeDetails.css";

const LifetimeDetails = ({
  calculateCostPerBot,
  subscriptionTypes,
  verificationCode,
  onValidatePayment,
  isLoading,
}) => {
  const handleVerificationCodeClick = () => {
    verificationCode &&
      navigator.clipboard
        .writeText(verificationCode)
        .then(() => toast.info("Verification code copied to clipboard!"))
        .catch(console.error);
  };

  return (
    <div className="lifetime-details-container">
      <div className="lifetime-details-header">
        <h2>Unlock the Full Potential with Lifetime Access! 🌟🚀</h2>
      </div>

      <div className="lifetime-details-section">
        <h3 className="section-title">One-Time Payment, Endless Benefits:</h3>
        <p className="section-content">
          <span className="bullet-point">-</span>
          <span className="text-wrapper">
            For just{" "}
            <span className="highlighted-cost">
              ${calculateCostPerBot(subscriptionTypes[0])} PER BOT (FOR
              {subscriptionTypes[0]} SUBSCRIPTION),
            </span>
            switch to Lifetime Access and embrace a world of convenience. Say
            goodbye to the hassle of recurring payments and enjoy uninterrupted,
            premium service forever!
          </span>
        </p>
      </div>

      <div className="lifetime-details-section">
        <h3 className="section-title">Your Current Plan:</h3>
        <p className="section-content">
          <span className="bullet-point">-</span> You're currently on a{" "}
          {subscriptionTypes.join(", ")} Subscription. Imagine upgrading to a
          plan that grows with your business, without additional costs.
        </p>
      </div>

      <div className="lifetime-details-section">
        <h3 className="section-title">Invest in the Future:</h3>
        <p className="section-content">
          <span className="bullet-point">-</span> Lifetime Access is more than a
          cost-saving option. It's a strategic choice for forward-thinking
          businesses. Benefit from all future updates, enhancements, and
          exclusive features without spending a penny more.
        </p>
      </div>

      <div className="lifetime-details-section">
        <h3 className="section-title">Grow Without Limits:</h3>
        <p className="section-content">
          <span className="bullet-point">-</span> With Lifetime Access, your
          tools evolve as your business does. No more budgeting for subscription
          renewals. Just continuous, uninterrupted growth.
        </p>
      </div>

      <div className="lifetime-details-footer">
        <p className="footer-content">
          Make the smart move today for a stress-free tomorrow. Choose Lifetime
          Access and focus on what truly matters – scaling your business and
          achieving your ambitious goals.
        </p>
      </div>

      {verificationCode && (
        <>
          <p
            onClick={handleVerificationCodeClick}
            className="verification-code"
          >
            <strong>Your Verification Code:</strong> {verificationCode}
          </p>
          <button
            onClick={onValidatePayment}
            disabled={isLoading}
            className="validate-payment-button"
          >
            {isLoading ? "Validating..." : "Validate payment"}
          </button>
        </>
      )}
    </div>
  );
};

export default LifetimeDetails;
