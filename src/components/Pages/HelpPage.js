// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you 



import React from "react";
import "./HelpPage.css";
import BackArrow from "../../assets/goBackarrow.svg";
import UserOne from "../../assets/OnboardingCards/IMG_7252.JPG";
import UserTwo from "../../assets/OnboardingCards/IMG_7250.JPG";
import UserThree from "../../assets/OnboardingCards/IMG_7255.JPG";
import Verify from "../../assets/verified.svg";
import BankI from "../../assets/OnboardingCards/bxs-bank.675dee3990c1a772a4dd5872a9005f31.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import { useNavigate } from "react-router-dom";

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="help-page">
      <div style={{ paddingTop: 16 }} className="onboardingBackBTN">
        <button onClick={() => navigate(-1)}>
          <img src={BackArrow} alt="back button" />
        </button>
        <p
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#e91e63",
            alignItems: "center",
            display: "flex",
            gap: 6,
          }}
        >
          Help page <img style={{ width: 15 }} src={Verify} alt="" />
        </p>
        <button onClick={() => navigate("/help")}>
          <img src={ChatAssistance} alt="back button" />
        </button>
      </div>
      <div className="signUpTop">
        <div className="signUpTopH">
          <h2>Ikorodu Dating Site - Help Center</h2>
          <p style={{ fontSize: 13, color: "#00000080" }}>
            *Our verification process for the Ikorodu Dating Site involves the
            following steps:
          </p>
        </div>
      </div>

      <section className="faq">
        <h2>Verification Issues</h2>
        <p>
          Welcome to the Ikorodu Dating Site! We understand that verifying your
          identity is a crucial step. If you're facing issues with verification,
          please ensure that:
        </p>
        <ul>
          <li>Your photo and ID card are clear and properly visible.</li>
          <li>
            You have followed the instructions provided during the upload
            process.
          </li>
          <li>
            If you continue to encounter problems, feel free to reach out to our
            support team.
          </li>
        </ul>
        <p>
          For a detailed explanation of our verification process, please see the{" "}
          <a href="#verification-process">Verification Process</a> section
          below.
        </p>
      </section>

      <section className="faq">
        <h2>Verification Process</h2>
        <p>
          Our verification process for the Ikorodu Dating Site involves the
          following steps:
        </p>
        <ol>
          <li>Upload a clear photo of yourself to confirm your identity.</li>
          <li>Upload a photo of your ID card to verify your details.</li>
          <li>Submit your documents and await confirmation from our team.</li>
        </ol>
        <p>
          Once submitted, our team will review your documents and notify you of
          the outcome. Please be patient as this process may take some time.
        </p>
      </section>

      <section className="faq">
        <h2>Other Questions</h2>
        <p>
          If you have additional questions or need further assistance, please
          visit our <a href="#contact-us">Contact Us</a> page.
        </p>

        <button className="whatsappp" onClick={() => navigate("/whatsapp")}>
          Visit WhatsApp page
        </button>
      </section>
    </div>
  );
};

export default HelpPage;
