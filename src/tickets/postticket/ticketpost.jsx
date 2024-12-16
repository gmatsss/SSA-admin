import React from "react";
import "./Posticket.css";

const Posticket = () => {
  return (
    <div className="posticket-container">
      <div className="info-container">
        <h2 className="title-ticket">SuperSmart Ticketing System</h2>
        <div className="instruction">
          <h3 className="instruction-title">1. Submitting a Ticket:</h3>
          <p className="instruction-text">
            Click on the "Submit Ticket" button to raise any issues or queries
            you might have then make sure fill the required field. Our team will
            get back to you promptly.
          </p>
        </div>
        <div className="centered-hr">
          <hr />
        </div>
        <div className="instruction">
          <h3 className="instruction-title">2. Searching for Answers:</h3>
          <p className="instruction-text">
            Use the search bar to find answers to frequently asked questions.
            It's a quick way to get information without waiting.
          </p>
        </div>
      </div>

      <iframe
        src="https://supersmartagents.tawk.help/"
        className="iframe-container"
        title="Tawk Help"
      ></iframe>
    </div>
  );
};

export default Posticket;
