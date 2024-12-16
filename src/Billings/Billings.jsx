import React, { useState, useEffect } from "react";
import BillingTable from "./components/BillingTable";
import BuyBots from "./components/BuyBots";
import Monthly from "./moonclerkforms/Monthly/Monthly";
import MonthlyPlanDiscount2 from "./moonclerkforms/Monthly/MonthlyPlanDiscount2";
import MonthlyPlanDiscount3 from "./moonclerkforms/Monthly/MonthlyPlanDiscount3";
import MonthlyPlanDiscount4 from "./moonclerkforms/Monthly/MonthlyPlanDiscount4";
import Yearly from "./moonclerkforms/Yearly/Yearly";
import YearlyDiscount1 from "./moonclerkforms/Yearly/YearlyDiscount1";
import YearlyDiscount2 from "./moonclerkforms/Yearly/YearlyDiscount2";
import YearlyDiscount3 from "./moonclerkforms/Yearly/YearlyDiscount3";
import ChannelOne from "./moonclerkforms/Channel/ChannelOne";
import ChannelTwo from "./moonclerkforms/Channel/ChannelTwo";
import ChannelThree from "./moonclerkforms/Channel/ChannelThree";
import ChannelFour from "./moonclerkforms/Channel/ChannelFour";
import ChannelFive from "./moonclerkforms/Channel/ChannelFive";
import ChannelSix from "./moonclerkforms/Channel/ChannelSix";
import { toast } from "react-toastify";
import "./Billings.css";
import Monthlyplan from "./components/Monthlyplan";
import YearlyPlan from "./components/Yearlyplan";
import { fetchData } from "../api/FetchData";
import { useNavigate } from "react-router-dom";
import EditForm from "./formmodal/EditForm";
import AdditionalCharge from "./components/AdditionalCharge";

const Billings = () => {
  const navigate = useNavigate();
  const [botCount, setBotCount] = useState(0);
  const [formData, setFormData] = useState({
    bots: [],
    channels: [],
    additionalInfo: "",
    files: [],
    verificationCode: "",
    planType: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [newVerificationCode, setNewVerificationCode] = useState("");
  const [currentFormId, setCurrentFormId] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [showBuyBots, setShowBuyBots] = useState(true);
  const [isVerificationMatched, setIsVerificationMatched] = useState(false);
  const [currentChannelFormId, setCurrentChannelFormId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [paymentPlanId, setPaymentPlanId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const channelFormIdMapping = {
    1: 475832,
    2: 475833,
    3: 475834,
    4: 475835,
    5: 475836,
    6: 475837,
  };

  console.log(formData);
  const generateVerificationCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 30; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleBotSubmission = (submissionData) => {
    const verificationCode = generateVerificationCode();
    setVerificationCode(verificationCode);
    // setVerificationCode("J8jcyQbmnRKeBGaT502aZNhIzwJpSA"); //monthly 1
    // setVerificationCode("7xVJxzju0KMq94Vj2EJWHeD7N4qzBV"); //yearly 2

    const botCount = submissionData.bots.length;
    const channelCount = submissionData.channels.length;

    // Update the state with the new bot count and channels
    setBotCount(botCount);
    setSelectedChannels(submissionData.channels);
    setFormData(submissionData); // Update the form data

    // Dynamically set the form ID based on the bot count and plan type
    let formId;
    if (submissionData.planType === "monthly") {
      switch (botCount) {
        case 1:
          formId = 474170;
          break;
        case 2:
          formId = 475045;
          break;
        case 3:
          formId = 475046;
          break;
        default:
          formId = 475047;
          break;
      }
    } else {
      switch (botCount) {
        case 1:
          formId = 474438;
          break;
        case 2:
          formId = 475039;
          break;
        case 3:
          formId = 475040;
          break;
        default:
          formId = 475044;
          break;
      }
    }

    setCurrentFormId(formId);

    if (channelCount > 0 && channelFormIdMapping[channelCount]) {
      setCurrentChannelFormId(channelFormIdMapping[channelCount]);
    }

    setShowBuyBots(false);
  };

  const navigateToThankYou = async (customerID, paymentPlanID) => {
    try {
      setLoading(true);

      const onboardingPayload = new FormData();
      onboardingPayload.append("additionalInfo", formData.additionalInfo);

      formData.bots.forEach((bot, index) => {
        onboardingPayload.append(`bots[${index}][agentType]`, bot.agentType);
        onboardingPayload.append(
          `bots[${index}][serviceIndustry]`,
          bot.serviceIndustry
        );
        onboardingPayload.append(
          `bots[${index}][toneOfVoice]`,
          bot.toneOfVoice
        );
      });

      formData.channels.forEach((channel, index) => {
        onboardingPayload.append(`channels[${index}]`, channel);
      });

      onboardingPayload.append("verificationCodebotplan", verificationCode);

      formData.files.forEach((file, index) => {
        onboardingPayload.append(`files[${index}]`, file, file.name);
      });

      if (newVerificationCode) {
        onboardingPayload.append("verifchannelcode", newVerificationCode);
      }

      if (customerID) {
        onboardingPayload.append("customerID", customerID);
      }

      if (paymentPlanID) {
        onboardingPayload.append("paymentPlanID", paymentPlanID);
      }

      const onboardingResponse = await fetchData(
        "bot/addbot",
        "POST",
        onboardingPayload
      );

      if (onboardingResponse.data) {
        toast.success("Payment successful");
        navigate("/Admin/thankyou");
      } else {
        toast.error("Onboarding failed");
      }
    } catch (error) {
      toast.error("An error occurred during onboarding.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      const headers = {
        Authorization: "Token 08bf9295738475d4afc3362ba53678df",
        Accept: "application/vnd.moonclerk+json;version=1",
      };

      const result = await fetchData(
        "moonclerk/api/payments",
        "GET",
        null,
        headers
      );

      const matchingPaymentDataArray = result.payments.filter(
        (payment) => payment.form_id === currentFormId
      );

      const successfulPaymentData = matchingPaymentDataArray.find(
        (paymentData) =>
          paymentData.custom_fields &&
          paymentData.custom_fields.verification_code &&
          paymentData.custom_fields.verification_code.response ===
            verificationCode
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        verificationCode: verificationCode,
      }));

      if (successfulPaymentData) {
        if (selectedChannels.length === 0) {
          navigateToThankYou(successfulPaymentData.customer_id);
        } else {
          if (selectedChannels.length > 0) {
            console.log("in");
            const newVerificationCode = generateVerificationCode();
            // setNewVerificationCode("Bkd6gpHEvFbaqLTsYQsNG8ebCSQbc1");//2channel
            setNewVerificationCode(newVerificationCode);
          }
          setPaymentPlanId(successfulPaymentData.customer_id);
          setLoading(false);
          toast.success("Payment Success");
          setPaymentVerified(true);
          setIsVerificationMatched(true);
        }
      } else {
        setLoading(false);
        toast.warning("Please pay your balance first.");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const checkFormData = async () => {
    try {
      setLoading(true);
      const headers = {
        Authorization: "Token 08bf9295738475d4afc3362ba53678df",
        Accept: "application/vnd.moonclerk+json;version=1",
      };

      const result = await fetchData(
        "moonclerk/api/payments",
        "GET",
        null,
        headers
      );

      const matchingPaymentDataArray = result.payments.filter(
        (payment) => payment.form_id === currentChannelFormId
      );

      const successfulPaymentData = matchingPaymentDataArray.find(
        (paymentData) =>
          paymentData.custom_fields &&
          paymentData.custom_fields.verification_code &&
          paymentData.custom_fields.verification_code.response ===
            (newVerificationCode || formData.verificationCode)
      );

      if (successfulPaymentData) {
        navigateToThankYou(successfulPaymentData.customer_id, paymentPlanId);
      } else {
        setLoading(false);
        toast.warning("Please pay your balance first.");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCopyVerificationCode = () => {
    navigator.clipboard.writeText(verificationCode).then(() => {
      toast.success("Verification code copied!");
    });
  };

  const validatePlanPayment = () => {
    fetchPaymentData();
  };

  const validateChannelPayment = () => {
    checkFormData();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!showBuyBots) {
        e.preventDefault();
        e.returnValue =
          "Closing or reloading the page might disrupt the payment process.";
        toast.warning(
          "Closing or reloading the page might disrupt the payment process."
        );
      }
    };

    if (!showBuyBots) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [showBuyBots]);

  return (
    <div className="billings-container">
      {showBuyBots ? (
        <div>
          <BillingTable />
          <BuyBots onSubmit={handleBotSubmission} />
        </div>
      ) : (
        <div className="paymentform-container">
          <div className="paymentform">
            {!isVerificationMatched || selectedChannels.length === 0 ? (
              <div>
                {formData.planType === "monthly" && (
                  <>
                    {botCount === 1 && <Monthly className="form-maximize" />}
                    {botCount === 2 && (
                      <MonthlyPlanDiscount2 className="form-maximize" />
                    )}
                    {botCount === 3 && (
                      <MonthlyPlanDiscount3 className="form-maximize" />
                    )}
                    {botCount >= 4 && (
                      <MonthlyPlanDiscount4 className="form-maximize" />
                    )}
                  </>
                )}

                {formData.planType === "yearly" && (
                  <>
                    {botCount === 1 && <Yearly className="form-maximize" />}
                    {botCount === 2 && (
                      <YearlyDiscount1 className="form-maximize" />
                    )}
                    {botCount === 3 && (
                      <YearlyDiscount2 className="form-maximize" />
                    )}
                    {botCount >= 4 && (
                      <YearlyDiscount3 className="form-maximize" />
                    )}
                  </>
                )}
              </div>
            ) : null}

            {isVerificationMatched && selectedChannels.length > 0 && (
              <div className="channelform">
                {selectedChannels.length === 1 && (
                  <ChannelOne className="form-maximize" />
                )}
                {selectedChannels.length === 2 && (
                  <ChannelTwo className="form-maximize" />
                )}
                {selectedChannels.length === 3 && (
                  <ChannelThree className="form-maximize" />
                )}
                {selectedChannels.length === 4 && (
                  <ChannelFour className="form-maximize" />
                )}
                {selectedChannels.length === 5 && (
                  <ChannelFive className="form-maximize" />
                )}
                {selectedChannels.length === 6 && (
                  <ChannelSix className="form-maximize" />
                )}
              </div>
            )}
          </div>

          <div className="verification-container">
            <div className="paymenform-edit" onClick={handleOpenModal}>
              <h5>Edit form</h5>
            </div>

            <div className="paymenform-instructions">
              {paymentVerified && selectedChannels.length > 0 ? (
                <AdditionalCharge botChannelValue={selectedChannels.length} />
              ) : formData.planType === "monthly" ? (
                <Monthlyplan numberOfBots={botCount} />
              ) : (
                <YearlyPlan numberOfBots={botCount} />
              )}
            </div>

            {paymentVerified && selectedChannels.length > 0 ? (
              <div className="verification-code">
                Your verification code:{" "}
                <span
                  className="code-text"
                  onClick={handleCopyVerificationCode}
                >
                  {newVerificationCode}
                </span>
              </div>
            ) : (
              <div className="verification-code">
                Your verification code:{" "}
                <span
                  className="code-text"
                  onClick={handleCopyVerificationCode}
                >
                  {verificationCode}
                </span>
              </div>
            )}

            <div className="verification-button-container">
              {paymentVerified && selectedChannels.length > 0 ? (
                <button
                  className="verification-button"
                  onClick={validateChannelPayment}
                  disabled={loading}
                >
                  {loading
                    ? "Validating Channel Payment..."
                    : "Validate Channel Payment"}
                </button>
              ) : (
                <button
                  className="verification-button"
                  onClick={validatePlanPayment}
                  disabled={loading}
                >
                  {loading ? "Validating Payment..." : "Validate Payment"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <EditForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        onSubmit={handleBotSubmission}
        isPaymentVerified={paymentVerified}
      />
    </div>
  );
};

export default Billings;
