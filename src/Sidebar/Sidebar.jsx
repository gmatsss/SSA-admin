import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/Sidebar.css";
import "./css/SidebarItem.css";
import "./css/SidebarSubmenu.css";
import "./css/SpecialOffer.css";
import "./css/LogoutButton.css";
import UserContext from "../Context/UserContext";
import logo from "../img/Logo.png";
import SidebarItem from "./components/SidebarItem";
import SidebarSubmenu from "./components/SidebarSubmenu";
import SpecialOffer from "./components/SpecialOffer";

import dashboardIcon from "../img/1dashboard.png";
import configIcon from "../img/2config.png";
import billingIcon from "../img/3billing.png";
import submitTicketIcon from "../img/4submitticket.png";
import affiliateIcon from "../img/5affiliate.png";
import knowledgeIcon from "../img/6knowledge.png";
import logoutIcon from "../img/logout.png";

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();
  const { user, announcements, botsWithLifetimeAccess } =
    useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isDocsSubmenuOpen, setIsDocsSubmenuOpen] = useState(false); // New state for Docs submenu

  // Function to check the availability of lifetime promo and get offer end date
  const hasLifetimePromo =
    botsWithLifetimeAccess && botsWithLifetimeAccess.length > 0;
  const offerEndDate = hasLifetimePromo
    ? botsWithLifetimeAccess[0].offerEndDate
    : null;

  const countIncompleteTodos = () => {
    return announcements.reduce((count, announcement) => {
      return (
        count +
        announcement.todos.reduce((todoCount, todo) => {
          return todoCount + (todo.completed ? 0 : 1);
        }, 0)
      );
    }, 0);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (e) => {
    e.stopPropagation();
    setIsSubmenuOpen(!isSubmenuOpen);
    setIsDocsSubmenuOpen(false); // Close Docs submenu when opening Config
  };

  const toggleDocsSubmenu = (e) => {
    e.stopPropagation();
    setIsDocsSubmenuOpen(!isDocsSubmenuOpen);
    setIsSubmenuOpen(false); // Close Config submenu when opening Docs
  };

  const handleMainItemClick = () => {
    setIsSubmenuOpen(false);
    setIsDocsSubmenuOpen(false);
  };

  const isActive = (path) => {
    const fullPath = `/Admin${path}`;
    return location.pathname === fullPath ||
      location.pathname === fullPath + "/"
      ? "active"
      : "";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      location.pathname.startsWith("/Admin/config1") ||
      location.pathname.startsWith("/Admin/config2") ||
      location.pathname.startsWith("/Admin/bots") ||
      location.pathname.startsWith("/Admin/voiceagents") ||
      location.pathname.startsWith("/Admin/apikey") ||
      location.pathname.startsWith("/Admin/dnssetup")
    ) {
      setIsSubmenuOpen(true);
      setIsDocsSubmenuOpen(false); // Ensure Docs submenu closes
    }
  }, [location.pathname]);

  // Effect to open Knowledge Base submenu when navigating directly to a knowledge base route
  useEffect(() => {
    if (
      location.pathname.startsWith("/Admin/introduction") ||
      location.pathname.startsWith("/Admin/bestpractices") ||
      location.pathname.startsWith("/Admin/features") ||
      location.pathname.startsWith("/Admin/industries") ||
      location.pathname.startsWith("/Admin/troubleshooting") ||
      location.pathname.startsWith("/Admin/security") ||
      location.pathname.startsWith("/Admin/support") ||
      location.pathname.startsWith("/Admin/gettingstarted")
    ) {
      setIsDocsSubmenuOpen(true);
      setIsSubmenuOpen(false); // Ensure Config submenu closes
    }
  }, [location.pathname]);

  return (
    <div className={`sidebar-container ${isOpen ? "expanded" : "collapsed"}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo-sidebar" />
        </div>
        <div className="sidebar-content">
          {user && user.role === "Admin" && (
            <>
              <SidebarItem
                to="./"
                icon={dashboardIcon}
                text="User list"
                isOpen={isOpen}
                isActive={isActive("/")}
                onClick={handleMainItemClick}
              />

              <SidebarItem
                to="./Todo"
                icon={configIcon}
                text="Todo"
                badgeCount={countIncompleteTodos()}
                isOpen={isOpen}
                isActive={isActive("/Todo")}
                onClick={handleMainItemClick}
              />

              <SidebarItem
                to="./Roadmap"
                icon={billingIcon}
                text="Roadmap"
                isOpen={isOpen}
                isActive={isActive("/Roadmap")}
                onClick={handleMainItemClick}
              />

              <SidebarItem
                to="./Notice"
                icon={submitTicketIcon}
                text="Notice"
                isOpen={isOpen}
                isActive={isActive("/Notice")}
                onClick={handleMainItemClick}
              />
            </>
          )}

          {user && user.role === "user" && (
            <>
              <SidebarItem
                to="./"
                icon={dashboardIcon}
                text="Control Panel"
                isOpen={isOpen}
                isActive={isActive("")}
                onClick={handleMainItemClick}
              />

              <SidebarItem
                to="./configs"
                icon={configIcon}
                text="Configuration"
                isOpen={isOpen}
                isActive={
                  isActive("/configs") ||
                  isActive("/voiceagents") ||
                  isActive("/apikey") ||
                  isActive("/dnssetup")
                }
                onClick={toggleSubmenu}
              />

              {isSubmenuOpen && (
                <SidebarSubmenu
                  items={[
                    {
                      to: "./configs",
                      text: "Bots",
                      isActive: isActive("/configs"),
                    },
                    {
                      to: "./voiceagents",
                      text: "VoiceAgents",
                      isActive: isActive("/voiceagents"),
                    },
                    {
                      to: "./apikey",
                      text: "ApiKey",
                      isActive: isActive("/apikey"),
                    },
                    {
                      to: "./dnssetup",
                      text: "DnsSetup",
                      isActive: isActive("/dnssetup"),
                    },
                  ]}
                  isOpen={isOpen}
                />
              )}

              <SidebarItem
                to="./submitticket"
                icon={submitTicketIcon}
                text="Submit Ticket"
                isOpen={isOpen}
                isActive={isActive("/submitticket")}
                onClick={handleMainItemClick}
              />

              <SidebarItem
                to="./Billing"
                icon={billingIcon}
                text="Billing"
                isOpen={isOpen}
                isActive={isActive("/Billing")}
                onClick={handleMainItemClick}
              />

              <SidebarItem
                href="https://supersmartagents.firstpromoter.com/signup/22054"
                icon={affiliateIcon}
                text="Affiliates"
                isOpen={isOpen}
                external
              />

              {/* Knowledge Base Item with Submenu */}
              <SidebarItem
                to="./introduction"
                icon={knowledgeIcon}
                text="Knowledge Base"
                isOpen={isOpen}
                isActive={
                  isActive("/introduction") ||
                  isActive("/bestpractices") ||
                  isActive("/features") ||
                  isActive("/industries") ||
                  isActive("/troubleshooting") ||
                  isActive("/security") ||
                  isActive("/support") ||
                  isActive("/gettingstarted")
                }
                onClick={toggleDocsSubmenu}
              />

              {isDocsSubmenuOpen && (
                <SidebarSubmenu
                  items={[
                    {
                      to: "./introduction",
                      text: "Introduction to SSA",
                      isActive: isActive("/introduction"),
                    },
                    {
                      to: "./bestpractices",
                      text: "Best Practices",
                      isActive: isActive("/bestpractices"),
                    },
                    {
                      to: "./features",
                      text: "Features and Capabilities",
                      isActive: isActive("/features"),
                    },
                    {
                      to: "./industries",
                      text: "Industries and Use Cases",
                      isActive: isActive("/industries"),
                    },
                    {
                      to: "./troubleshooting",
                      text: "Troubleshooting",
                      isActive: isActive("/troubleshooting"),
                    },
                    {
                      to: "./security",
                      text: "Security & Privacy",
                      isActive: isActive("/security"),
                    },
                    {
                      to: "./support",
                      text: "Support and Resources",
                      isActive: isActive("/support"),
                    },
                    {
                      to: "./gettingstarted",
                      text: "Getting Started",
                      isActive: isActive("/gettingstarted"),
                    },
                  ]}
                  isOpen={isOpen}
                />
              )}
            </>
          )}
        </div>

        {user && user.role === "user" && hasLifetimePromo && (
          <SpecialOffer isOpen={isOpen} offerEndDate={offerEndDate} />
        )}

        <SidebarItem
          to="#"
          icon={logoutIcon}
          text="Logout"
          isOpen={isOpen}
          onClick={handleLogout}
        />

        <button className="sidebar-toggle-button" onClick={toggleSidebar}>
          {isOpen ? "<" : ">"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
