import React, { useEffect, useState } from "react";
import "./BillingTable.css";
import { fetchData } from "../../api/FetchData";

const BillingTable = () => {
  const [billingPlans, setBillingPlans] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch billing plans on component mount
    fetchBillingPlans();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    return date.toLocaleDateString("en-US", options);
  };

  const fetchBillingPlans = async () => {
    try {
      const billingPlansResponse = await fetchData("Admin/getuserpaymentplans");
      const paymentPlanIds = billingPlansResponse.paymentPlanIds;

      if (paymentPlanIds && paymentPlanIds.length > 0) {
        const billingDetails = await Promise.all(
          paymentPlanIds.map(async (id) => {
            try {
              const headers = {
                Authorization: "Token 08bf9295738475d4afc3362ba53678df",
                Accept: "application/vnd.moonclerk+json;version=1",
              };

              const planDetails = await fetchData(
                `moonclerk/api/customers/${id}`,
                "GET",
                null,
                headers
              );

              if (
                planDetails &&
                planDetails.customer &&
                planDetails.customer.form_id
              ) {
                const formId = planDetails.customer.form_id;
                const formDetails = await fetchData(
                  `moonclerk/api/forms/${formId}`,
                  "GET",
                  null,
                  headers
                );

                const subscription = planDetails.customer.subscription;

                return {
                  id: planDetails.customer.id,
                  title: formDetails.form.title,
                  status: subscription.status,
                  start: formatDate(subscription.start),
                  firstPaymentAttempt: formatDate(
                    subscription.first_payment_attempt
                  ),
                  nextPaymentAttempt: formatDate(
                    subscription.next_payment_attempt
                  ),
                  currentPeriodStart: formatDate(
                    subscription.current_period_start
                  ),
                  currentPeriodEnd: formatDate(subscription.current_period_end),
                  managementUrl: planDetails.customer.management_url,
                };
              }
            } catch (error) {
              console.error(
                `Error fetching details for billing plan ID ${id}:`,
                error
              );
              return null; // Return null for errors
            }
          })
        );

        // Filter out any null (error) entries and update the state
        setBillingPlans(billingDetails.filter((plan) => plan !== null));
      } else {
        console.log("No billing plans found.");
      }
    } catch (error) {
      console.error("Error fetching billing plans:", error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  const handleManagePlanClick = (managementUrl) => {
    if (managementUrl) {
      window.open(managementUrl, "_blank"); // Open the management URL in a new tab
    } else {
      alert("Management URL is not available.");
    }
  };

  return (
    <div className="billingv2-table-billings">
      <table className="billingv2-billing-table">
        <thead>
          <tr>
            <th>Plan ID</th>
            <th>Plan Name</th>
            <th>Start</th>
            <th>First Payment</th>
            <th>Next Payment</th>
            <th>Current Period Start</th>
            <th>Current Period End</th>
            <th>Status</th>
            <th>Actions</th> {/* New column for action button */}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Skeleton loader with 3 placeholder rows
            <>
              <tr className="billingv2-skeleton-row">
                <td colSpan="9">
                  <div className="billingv2-skeleton"></div>
                </td>
              </tr>
              <tr className="billingv2-skeleton-row">
                <td colSpan="9">
                  <div className="billingv2-skeleton"></div>
                </td>
              </tr>
            </>
          ) : billingPlans.length === 0 ? (
            <tr>
              <td colSpan="9">No billing plans available</td>
            </tr>
          ) : (
            billingPlans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.id}</td>
                <td>{plan.title}</td>
                <td>{plan.start}</td>
                <td>{plan.firstPaymentAttempt}</td>
                <td>{plan.nextPaymentAttempt}</td>
                <td>{plan.currentPeriodStart}</td>
                <td>{plan.currentPeriodEnd}</td>
                <td className={`billingv2-status-${plan.status.toLowerCase()}`}>
                  {plan.status.toUpperCase()}
                </td>
                <td>
                  <button
                    className="billingv2-action-btn"
                    onClick={() => handleManagePlanClick(plan.managementUrl)}
                  >
                    Manage Plan
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BillingTable;
