import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar/Sidebar";
import UserContext from "./Context/UserContext";
import Posticket from "./tickets/postticket/ticketpost";
import RetuneChat from "./retune/RetuneChat";
import Panel from "./panel/panel";
import "./Admin.css";
import useProduktlyScript from "./api/useProduktlyScript";

import ThankYouComponent from "./thankyou/ThankYouComponent";
import HeaderSmall from "./header/HeaderSmall";
import AnnouncementModal from "./Announcement/AnnouncementModal";
import Todo from "./Todo/Todo";
import Board from "./Dashboards/Board";
import Roadmap from "./roadmap/roadmap";
import Notice from "./notice/notice";
import Playai from "./playai/playai";
import ApiKeyForm from "./config/apiform/ApiKeyForm";
import DnsSetupForm from "./config/dnsform/DnsSetupForm";
import Testbot from "./config/testbot/testbot";
import VoiceAgents from "./config/voiceagents/voiceagents";
import { fetchData } from "./api/FetchData";
import Billings from "./Billings/Billings";
import Lifetime from "./Billings/lifetime/lifetime";

// Knowledgebase components imports
import Introductions from "./knowledge/Introductions";
import Features from "./knowledge/Features";
import GettingStarted from "./knowledge/GettingStarted";
import Industries from "./knowledge/Industries";
import BestPractices from "./knowledge/BestPractices";
import Troubleshooting from "./knowledge/Troubleshooting";
import Security from "./knowledge/Security";
import Support from "./knowledge/Support";

const Admin = () => {
  const { user, isLoggedIn, isLoading, reloadUser, botsWithLifetimeAccess } =
    useContext(UserContext);
  const [showChat, setShowChat] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  // Using useProduktlyScript
  useProduktlyScript(user && user.role === "user");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, isLoading, navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetchData("User/logoutuser", "POST");
      if (response.message) {
        toast.success(response.message);
        reloadUser();
        if (window.Tawk_API) window.Tawk_API.hideWidget();
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during logout.");
    }
  };

  if (isLoading) return null;

  return (
    <div>
      <AnnouncementModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        botsWithLifetimeAccess={botsWithLifetimeAccess}
      />

      <div className="admin-container">
        <Sidebar handleLogout={handleLogout} />
        <div className="main-content">
          <HeaderSmall
            user={user}
            botsWithLifetimeAccess={botsWithLifetimeAccess}
            handleOpenModal={() => setOpenModal(true)}
          />
          {user && user.role === "user" && (
            <>
              <div
                className={`chat-toggle-button ${showChat ? "chat-open" : ""}`}
                onClick={() => setShowChat((prev) => !prev)}
              ></div>
              {showChat && (
                <RetuneChat
                  email={user.email}
                  onClose={() => setShowChat(false)}
                />
              )}
            </>
          )}
          <Routes>
            {user && user.role === "Admin" && (
              <>
                <Route path="/" element={<Board />} />
                <Route path="/Todo" element={<Todo />} />
                <Route path="/Roadmap" element={<Roadmap />} />
                <Route path="/Notice" element={<Notice />} />
                <Route path="/Playai" element={<Playai />} />
              </>
            )}
            {user && user.role === "user" && (
              <>
                <Route path="/" element={<Panel />} />
                <Route path="/Billing" element={<Billings />} />
                <Route path="/submitticket" element={<Posticket />} />
                <Route path="/thankyou" element={<ThankYouComponent />} />
                <Route path="/Lifetime" element={<Lifetime />} />
                <Route path="/configs" element={<Testbot />} />
                <Route path="/voiceagents" element={<VoiceAgents />} />
                <Route path="/apikey" element={<ApiKeyForm />} />
                <Route path="/dnssetup" element={<DnsSetupForm />} />

                {/* Knowledgebase Routes */}
                <Route path="/introduction" element={<Introductions />} />
                <Route path="/features" element={<Features />} />
                <Route path="/gettingstarted" element={<GettingStarted />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/bestpractices" element={<BestPractices />} />
                <Route path="/troubleshooting" element={<Troubleshooting />} />
                <Route path="/security" element={<Security />} />
                <Route path="/support" element={<Support />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
