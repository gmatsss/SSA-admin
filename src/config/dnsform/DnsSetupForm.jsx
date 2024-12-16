import React, { useEffect, useState } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DomainNameInput from "./DomainNameInput";
import DnsRecordFields from "./DnsRecordFields"; // Import the merged component
import { toast } from "react-toastify";
import { fetchData } from "../../api/FetchData";
import "./DnsSetupForm.css";

const DnsSetupForm = () => {
  const [domainName, setDomainName] = useState("");
  const [dnsRecords, setDnsRecords] = useState({
    aRecordType: "",
    aRecordName: "",
    aRecordValue: "",
    txtRecordType: "",
    txtRecordName: "",
    txtRecordValue: "",
    cnameRecordType: "",
    cnameRecordName: "",
    cnameRecordValue: "",
  });

  // Fetch the DNS records and domain name on component mount
  useEffect(() => {
    const fetchDnsData = async () => {
      try {
        const data = await fetchData("admin/get_bots"); // Adjust endpoint as necessary
        const onboardingDetails = data.onboardingDetails;

        setDomainName(onboardingDetails.domainName || "");
        setDnsRecords(onboardingDetails.dnsRecords || {});
      } catch (error) {
        console.error("Error fetching DNS data:", error);
        toast.error("Failed to load DNS data.");
      }
    };

    fetchDnsData();
  }, []);

  return (
    <div className="dns-setup-wrapper">
      <DomainNameInput domainName={domainName} setDomainName={setDomainName} />

      <div className="dns-container">
        <div className="title-holder">
          <h1 className="title">Dns Setup</h1>
          <div class="tooltips-container">
            <button class="helps-button">?</button>
            <span class="tooltips-text">
              <ul>
                <li>
                  Sign in to Your Domain Registrar: Visit the website of the
                  company where you registered your domain (such as GoDaddy or
                  Namecheap). Enter your login credentials to access your
                  account.
                </li>
                <li>
                  Access Domain Management: In your account dashboard, look for
                  a section called 'My Domains', 'Domain Management', or
                  similar. Select the domain you want to configure.
                </li>
                <li>
                  Modify DNS Records: Find the 'DNS Settings', 'Name Server
                  Management', or similar section. Enter the DNS records
                  provided below.
                </li>
                <li>
                  Save Changes: After entering all the DNS records, make sure to
                  save your changes.
                </li>
                <li>
                  Wait for Propagation: DNS changes can take up to 48 hours to
                  propagate throughout the Internet.
                </li>
                <li>
                  Verification: Once DNS settings have propagated, the
                  'Unverified' status on your dashboard will change to
                  'Verified'. If the status does not change after 48 hours,
                  ensure the DNS records are entered correctly and if errors
                  persist, contact us.
                </li>
              </ul>
            </span>
          </div>
        </div>

        <DnsRecordFields
          title="A Record"
          instructions="A Record Setup Instructions"
          recordType={dnsRecords.aRecordType}
          recordName={dnsRecords.aRecordName}
          recordValue={dnsRecords.aRecordValue}
        />
        <DnsRecordFields
          title="TXT Record"
          instructions="TXT Record Setup Instructions"
          recordType={dnsRecords.txtRecordType}
          recordName={dnsRecords.txtRecordName}
          recordValue={dnsRecords.txtRecordValue}
        />
        <DnsRecordFields
          title="CNAME Record"
          instructions="CNAME Record Setup Instructions"
          recordType={dnsRecords.cnameRecordType}
          recordName={dnsRecords.cnameRecordName}
          recordValue={dnsRecords.cnameRecordValue}
        />
      </div>
    </div>
  );
};

export default DnsSetupForm;
