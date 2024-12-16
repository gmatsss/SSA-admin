import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserProfile from "./components/userprofile/userprofile";
import { FaSearch, FaBell } from "react-icons/fa";
import useravatar from "../img/useravatar.webp";
import "./header.css";
import "./responsiveheader.css";

const HeaderSmall = ({ user, handleOpenModal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("Dashboard");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Define available endpoints
  const endpoints = [
    { name: "Dashboard", path: "/Admin/" },
    { name: "Billing", path: "/Admin/Billing" },
    { name: "Submit Ticket", path: "/Admin/submitticket" },
    { name: "Configuration", path: "/Admin/configs" },
    { name: "Information", path: "/Admin/introduction" },
  ];

  useEffect(() => {
    const currentEndpoint = endpoints.find(
      (endpoint) => endpoint.path === location.pathname
    );
    if (currentEndpoint) {
      setCurrentTitle(currentEndpoint.name);
    }
  }, [location.pathname, endpoints]);

  // Update window width state on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle user profile visibility and close dropdown
  const toggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
    setDropdownOpen(false);
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  // Close the user profile
  const handleUserProfileClose = () => {
    setShowUserProfile(false);
  };

  // Handle input change and provide suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = endpoints.filter((endpoint) =>
        endpoint.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (path) => {
    navigate(path);
    setSearchTerm("");
    setSuggestions([]);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      navigate(suggestions[0].path);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  return (
    <div className="header_small">
      {windowWidth > 1024 && (
        <div className="header_left">
          <h1 className="dashboard_title">{currentTitle}</h1>
        </div>
      )}
      <div className="header_center">
        <div className="search_input_wrapper">
          <FaSearch className="search_icon" />
          <input
            type="text"
            className="search_input"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          {suggestions.length > 0 && (
            <div className="suggestions_dropdown">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion_item"
                  onClick={() => handleSuggestionClick(suggestion.path)}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="header_right" ref={dropdownRef}>
        <div>
          {windowWidth <= 1024 && (
            <h1 className="dashboard_title">{currentTitle}</h1>
          )}
        </div>
        <div className="notifcontainer">
          <div className="notification_bell_wrapper">
            <button className="notification_bell" onClick={handleOpenModal}>
              <FaBell className="bell_icon" />
              <span className="notification_badge"></span>
            </button>
          </div>
          <div className="user_details" onClick={toggleDropdown}>
            <img src={useravatar} alt="User" className="user_avatar" />

            <div className="user_name_cont">
              <p className="user_name">{user?.fullname}</p>
            </div>

            {dropdownOpen && (
              <div className="custom_dropdown">
                <div onClick={toggleUserProfile}>User profile</div>
                <div onClick={handleOpenModal}>Announcement</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showUserProfile && <UserProfile onClose={handleUserProfileClose} />}
    </div>
  );
};

export default HeaderSmall;
