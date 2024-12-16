import React, { useState, useEffect } from "react";
import "./VoiceAgent.css";

const VoiceAgent = ({ voiceAgentsSSA }) => {
  console.log(voiceAgentsSSA);
  const [editMode, setEditMode] = useState(false);
  const [editedAgents, setEditedAgents] = useState(
    voiceAgentsSSA?.agents ? voiceAgentsSSA : { agents: [] }
  );

  useEffect(() => {
    if (voiceAgentsSSA?.agents) {
      setEditedAgents(voiceAgentsSSA);
    } else {
      setEditedAgents({ agents: [] }); // Reset state if no agents are available
    }
  }, [voiceAgentsSSA]);

  const handleInputChange = (agentIndex, field, value) => {
    const updatedAgents = { ...editedAgents };
    updatedAgents.agents[agentIndex][field] = value;
    setEditedAgents(updatedAgents);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (!editedAgents.agents.length) {
    return <div className="no-data">No Voice Agent Data Available</div>;
  }

  return (
    <div className="voice-agents-container">
      <h3 className="voice-agents-title">Voice Agents</h3>
      <div className="minutes-summary">
        <p>
          <strong>Total Minutes Limit:</strong> {editedAgents.totalMinutesLimit}
        </p>
        <p>
          <strong>Total Minutes Used:</strong> {editedAgents.totalMinutesUsed}
        </p>
      </div>
      <button className="edit-button" onClick={toggleEditMode}>
        {editMode ? "Save" : "Edit"}
      </button>
      {editedAgents.agents.map((agent, agentIndex) => (
        <div key={agent._id} className="voice-agent-group">
          <ul className="agent-list">
            <li className="agent-item">
              <div className="agent-detail-grid">
                <div className="agent-detail">
                  <strong>Agent Greeting:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      value={agent.agentGreeting}
                      onChange={(e) =>
                        handleInputChange(
                          agentIndex,
                          "agentGreeting",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{agent.agentGreeting}</p>
                  )}
                </div>
                <div className="agent-detail">
                  <strong>Agent Prompt:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      value={agent.agentPrompt}
                      onChange={(e) =>
                        handleInputChange(
                          agentIndex,
                          "agentPrompt",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{agent.agentPrompt}</p>
                  )}
                </div>
                <div className="agent-detail">
                  <strong>Limitations:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      value={agent.limitations}
                      onChange={(e) =>
                        handleInputChange(
                          agentIndex,
                          "limitations",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{agent.limitations}</p>
                  )}
                </div>
                <div className="agent-detail">
                  <strong>Voice of the Agent:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      value={agent.voiceOfTheAgent}
                      onChange={(e) =>
                        handleInputChange(
                          agentIndex,
                          "voiceOfTheAgent",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{agent.voiceOfTheAgent}</p>
                  )}
                </div>

                <div className="agent-detail">
                  <strong>Bot Status:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      value={agent.botStatus}
                      onChange={(e) =>
                        handleInputChange(
                          agentIndex,
                          "botStatus",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{agent.botStatus}</p>
                  )}
                </div>
                <div className="agent-detail">
                  <strong>Phone Number:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      value={agent.phoneNumber}
                      onChange={(e) =>
                        handleInputChange(
                          agentIndex,
                          "phoneNumber",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{agent.phoneNumber}</p>
                  )}
                </div>
                <div className="agent-detail">
                  <strong>Agent Behavior:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      value={agent.agentBehavior}
                      onChange={(e) =>
                        handleInputChange(
                          agentIndex,
                          "agentBehavior",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{agent.agentBehavior}</p>
                  )}
                </div>
                <div className="agent-detail">
                  <strong>Custom Knowledge:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      value={agent.customKnowledge}
                      onChange={(e) =>
                        handleInputChange(
                          agentIndex,
                          "customKnowledge",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{agent.customKnowledge}</p>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default VoiceAgent;
