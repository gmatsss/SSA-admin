import React from "react";
import { useNavigate } from "react-router-dom";
import arrowspecial from "../../img/arrowspecial.png";
import settingspecial from "../../img/settingspecial.png";

const SpecialOffer = ({ isOpen, offerEndDate }) => {
  const navigate = useNavigate();

  const formattedEndDate = new Date(offerEndDate).toLocaleDateString();

  const handleNavigation = () => {
    navigate("/Admin/Lifetime");
  };

  return (
    <div
      className="sidebar-special-offer-wrapper"
      onClick={handleNavigation}
      style={{ cursor: "pointer" }}
    >
      <img src={settingspecial} alt="Settings Icon" className="settings-icon" />
      <img src={arrowspecial} alt="Arrow Icon" className="arrow-icon" />
      <div className="sidebar-special-offer">
        <div className="offer-details">
          <p className="offer-text">SPECIAL OFFER: Buy Lifetime Access!</p>
          {isOpen && (
            <>
              <p className="offer-date">Offer ends on: {formattedEndDate}</p>
              <button className="offer-button" onClick={handleNavigation}>
                Lifetime Access
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
