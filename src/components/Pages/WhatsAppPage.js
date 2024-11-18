// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you


import React from "react";
import "./WhatsAppPage.css";
import BackArrow from "../../assets/goBackarrow.svg";
import UserOne from "../../assets/OnboardingCards/IMG_7252.JPG";
import UserTwo from "../../assets/OnboardingCards/IMG_7250.JPG";
import UserThree from "../../assets/OnboardingCards/IMG_7255.JPG";
import Verify from "../../assets/verified.svg";
import BankI from "../../assets/OnboardingCards/bxs-bank.675dee3990c1a772a4dd5872a9005f31.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import { useNavigate } from "react-router-dom";

const WhatsAppPage = () => {
  const whatsappNumber = "23407043455416";
  const navigate = useNavigate();

  return (
    <div className="whatsapp-page">
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
          WhatsApp Page <img style={{ width: 15 }} src={Verify} alt="" />
        </p>
        <button onClick={() => navigate("/help")}>
          <img src={ChatAssistance} alt="back button" />
        </button>
      </div>
      <div className="signUpTop">
        <div className="signUpTopH">
          <h2>Contact Us on WhatsApp</h2>
          <p style={{ fontSize: 13, color: "#00000080" }}>
            *Our verification process for the Ikorodu Dating Site involves the
            following steps:
          </p>
        </div>
      </div>

      <section className="faq">
        <h2>Thank you message</h2>
        <p>
          Thank you for being a part of the Ikorodu Dating Site community! If
          you have any questions, encounter issues, or need assistance with
          anything related to our site, we're here to help.
        </p>
        
      
      </section>

      <section className="faq">
        <h2>Issues ?</h2>
        
        <p>
        To get in touch with us directly, you can send us a message on WhatsApp.
        Click the button below to start a chat:
      </p>
      </section>
      <section className="faq">
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-link"
      >
        <button className="contact-button">Message Us on WhatsApp</button>
      </a>
      </section>
      
      
    </div>
  );
};

export default WhatsAppPage;
