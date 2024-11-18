// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you 


import React from "react";
import "./OnboardingStyle.css";
import NextArrow from "../../assets/facingright.svg";
import BackArrow from "../../assets/goBackarrow.svg";
import CardThree from "../../assets/OnboardingCards/Cardtree.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import { useNavigate } from "react-router-dom";
import './DesktopOnboardingStyle.css'


const OnboardingScreen3 = ({ prevStep, finishOnboarding }) => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-screen">
      <div className="onboardingBackBTN">
        <button onClick={prevStep}>
          <img src={BackArrow} alt="back button" />
        </button>
        <button onClick={() => navigate("/help")}>
          <img src={ChatAssistance} alt="back button" />
        </button>
      </div>
      <div className="onboardingTop">
        <img
          style={{ width: "115%", marginTop: "3%" }}
          src={CardThree}
          alt="back button"
        />
      </div>

      <div className="onboardingBottom short">
        <div>
          <h1>Get Started!</h1>
          <p>Create your profile and start matching today.</p>
        </div>

        <button onClick={finishOnboarding}>Create Account</button>
      </div>
    </div>
  );
};

export default OnboardingScreen3;
