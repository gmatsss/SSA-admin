import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Device } from "twilio-client";
import { fetchData } from "../../api/FetchData";

export const fetchVoiceAgents = async () => {
  try {
    const response = await fetchData("bot/getAllVAgentsByUser", "GET");

    if (response.agents) {
      return {
        agents: response.agents,
        devices: Array(response.agents.length).fill(null),
        connections: Array(response.agents.length).fill(null),
        isTalking: Array(response.agents.length).fill(false),
      };
    }
  } catch (error) {
    console.error("Error fetching VA agents:", error);
    return {
      agents: [],
      devices: [],
      connections: [],
      isTalking: [],
    };
  }
};

export const initiateCall = async (
  index,
  agents,
  devices,
  setDevices,
  setConnections,
  setIsTalking,
  setActiveBotIndex,
  connections,
  isTalking,
  setAgents
) => {
  const currentDevice = devices[index];
  const agentId = agents[index]._id;

  try {
    const checkLimitResponse = await fetchData(
      `bot/checkMinutesLimit/${agentId}`,
      "GET"
    );

    if (checkLimitResponse.message !== "Call can be initiated.") {
      console.error("Cannot initiate call: Minutes limit reached.");
      return;
    }
  } catch (error) {
    console.error("Error checking minutes limit:", error);
    return;
  }

  if (isTalking[index]) {
    connections[index]?.disconnect();
  } else {
    const rawPhoneNumber = agents[index].phoneNumber;
    const phoneNumber = parsePhoneNumberFromString(rawPhoneNumber);

    if (!phoneNumber || !phoneNumber.isValid()) {
      console.error("Invalid phone number");
      return;
    }

    const formattedPhoneNumber = phoneNumber.format("E.164");

    if (!currentDevice) {
      const url = `${process.env.REACT_APP_API_ENDPOINT}twilio/generateVoiceToken`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        const newDevice = new Device(data.token, {
          debug: true,
          closeProtection: true,
        });

        newDevice.on("ready", () => {
          setDevices((prevDevices) => {
            const updatedDevices = [...prevDevices];
            updatedDevices[index] = newDevice;
            return updatedDevices;
          });

          initiateTwilioCall(
            newDevice,
            formattedPhoneNumber,
            index,
            agents,
            setAgents, // Pass setAgents here
            setConnections,
            setIsTalking,
            setActiveBotIndex
          );
        });

        newDevice.on("error", (error) => {
          console.error(`Twilio Device Error: ${error.message}`);
        });
      } catch (error) {
        console.error("Error fetching Twilio token:", error);
      }
    } else {
      initiateTwilioCall(
        currentDevice,
        formattedPhoneNumber,
        index,
        agents,
        setAgents, // Pass setAgents here
        setConnections,
        setIsTalking,
        setActiveBotIndex
      );
    }
  }
};

const initiateTwilioCall = (
  device,
  phoneNumber,
  index,
  agents,
  setAgents,
  setConnections,
  setIsTalking,
  setActiveBotIndex
) => {
  let callStartTime = null;

  try {
    const conn = device.connect({
      url: `${process.env.REACT_APP_API_ENDPOINT}twilio/voice`,
      method: "POST",
      params: JSON.stringify({ To: phoneNumber }),
    });

    conn.on("accept", () => {
      callStartTime = new Date(); // Capture the current time when the call is accepted
      console.log("Call accepted, call start time:", callStartTime);
    });

    // Event listener when the call is disconnected
    conn.on("disconnect", async () => {
      if (!callStartTime) {
        console.error(
          "Call start time was not set. Skipping duration calculation."
        );
        return;
      }

      const callEndTime = new Date();
      const callDurationInSeconds = Math.round(
        (callEndTime - callStartTime) / 1000
      ); // Calculate duration in seconds

      if (callDurationInSeconds < 0 || isNaN(callDurationInSeconds)) {
        console.error("Invalid call duration, skipping update.");
        return;
      }

      const callDurationInMinutes = Math.ceil(callDurationInSeconds / 60); // Convert to minutes and round up

      console.log(
        `Call ended. Duration: ${callDurationInSeconds} seconds (${callDurationInMinutes} minutes)`
      );

      try {
        // Update the minutes used in the database
        await fetchData(`bot/updateCallDuration/${agents[index]._id}`, "POST", {
          callDurationInMinutes,
        });

        // Update the state to reflect the new inbound minutes used
        setAgents((prevAgents) => {
          const updatedAgents = [...prevAgents];
          updatedAgents[index].inboundMinutesUsed += callDurationInMinutes;
          return updatedAgents;
        });

        console.log(`Updated call duration: ${callDurationInMinutes} minutes`);
      } catch (error) {
        console.error("Error updating call duration:", error);
      }

      // Reset state
      setIsTalking((talking) => {
        const newTalking = [...talking];
        newTalking[index] = false;
        return newTalking;
      });

      setConnections((conns) => {
        const newConns = [...conns];
        newConns[index] = null;
        return newConns;
      });

      setActiveBotIndex(null);
    });

    conn.on("error", (error) => {
      console.error("Call error", error);
      if (error.code === 31003) {
        console.error("Error: Invalid phone number format");
      } else {
        console.error(`Error: ${error.message}`);
      }
    });

    // Set connection and isTalking state
    setConnections((conns) => {
      const newConns = [...conns];
      newConns[index] = conn;
      return newConns;
    });

    setIsTalking((talking) => {
      const newTalking = [...talking];
      newTalking[index] = true;
      return newTalking;
    });

    setActiveBotIndex(index);
  } catch (error) {
    console.error("Connection error", error);
    if (error.code === 31003) {
      console.error("Error: Invalid phone number format");
    } else {
      console.error(`Error: ${error.message}`);
    }
  }
};
