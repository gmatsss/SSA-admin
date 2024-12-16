import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ssaImage from "../../img/welcome.png"; // Ensure to replace with the correct path
import emailIcon from "../../img/email.png"; // Path to your email icon
import phoneIcon from "../../img/phone.png"; // Path to your phone icon
import "./css/firstcol.css";
import "./css/responsivefirstcol.css";
import "./css/animation.css";

const FirstCol = () => {
  const navigate = useNavigate();

  const handleNavigation = (destination) => {
    navigate(destination);
  };

  return (
    <div className="firstcol">
      <div className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-image">
            <img src={ssaImage} alt="SSA illustration" />
          </div>
          <div className="welcome-text">
            <h1>Welcome to SuperSmartAgent</h1>
            <p>
              Dive into our detailed guide to explore the features and benefits
              we offer. Learn more about the foundation and philosophy behind
              SSA, and discover how we are revolutionizing the way users
              interact with our platform. Whether you're a newbie or a seasoned
              user, our guide is tailored to give you a seamless experience.
              Join us on this journey and uncover the full potential of SSA.
            </p>
            <div className="welcome-buttons">
              <button
                className="start-training-btn"
                onClick={() => handleNavigation("/Admin/configs")}
              >
                Start Training
              </button>
              <button
                className="submit-ticket-btn"
                onClick={() => handleNavigation("/Admin/submitticket")}
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="support-info">
        <h2 className="title-support">Support Information</h2>
        <div className="support-details">
          <div className="support-item">
            <img src={emailIcon} alt="Email" className="support-icon" />
            <span>support@supersmartagents.com</span>
          </div>
          <div className="support-item">
            <img src={phoneIcon} alt="Phone" className="support-icon" />
            <span>888-985-6854</span>
          </div>
        </div>
      </div>

      <div className="quick-start">
        <div className="quick-start-header">
          <p className="quick-start-title">Quick Start</p>
        </div>
        <div className="quick-start-content">
          <div className="quick-start-container">
            <div className="quick-start-item">
              <h3>Introduction to SSA</h3>
              <p>
                Get a comprehensive overview of what SSA offers and how it
                stands out in the industry.
              </p>
              <Link to="/Admin/introduction" className="quick-start-button">
                Watch
              </Link>
            </div>
            <div className="quick-start-item">
              <h3>Best Practices</h3>
              <p>
                Discover the recommended ways to utilize SSA for maximum
                efficiency and results.
              </p>
              <Link to="/Admin/bestpractices" className="quick-start-button">
                Watch
              </Link>
            </div>
            <div className="quick-start-item">
              <h3>Features and Capabilities</h3>
              <p>
                Explore the diverse set of tools and features that SSA brings to
                the table.
              </p>
              <Link to="/Admin/features" className="quick-start-button">
                Watch
              </Link>
            </div>
            <div className="quick-start-item">
              <h3>Industries and Use Cases</h3>
              <p>
                Learn how SSA is used across various sectors and how it caters
                to unique needs.
              </p>
              <Link to="/Admin/industries" className="quick-start-button">
                Watch
              </Link>
            </div>
            <div className="quick-start-item">
              <h3>Troubleshooting</h3>
              <p>Solutions and tips for common issues faced while using SSA.</p>
              <Link to="/Admin/troubleshooting" className="quick-start-button">
                Watch
              </Link>
            </div>
            <div className="quick-start-item">
              <h3>Security & Privacy</h3>
              <p>Understand the security and privacy measures in SSA.</p>
              <Link to="/Admin/security" className="quick-start-button">
                Watch
              </Link>
            </div>
            <div className="quick-start-item">
              <h3>Support and Resources</h3>
              <p>Find resources and support options for SSA.</p>
              <Link to="/Admin/support" className="quick-start-button">
                Watch
              </Link>
            </div>
            <div className="quick-start-item">
              <h3>Getting Started</h3>
              <p>A beginner's guide to getting started with SSA.</p>
              <Link to="/Admin/gettingstarted" className="quick-start-button">
                Watch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstCol;
