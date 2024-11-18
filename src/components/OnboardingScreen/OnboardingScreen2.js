// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you

import React from "react";
import "./OnboardingStyle.css";
import { useEffect, useState } from "react";
import NextArrow from "../../assets/facingright.svg";
import BackArrow from "../../assets/goBackarrow.svg";
import CardTwo from "../../assets/OnboardingCards/cardOne.svg";
import LoveIcon from "../../assets/OnboardingCards/Loveiconbn.svg";
import { useNavigate } from "react-router-dom";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import './DesktopOnboardingStyle.css'


const OnboardingScreen2 = ({ nextStep, prevStep }) => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imageStyle = {
    width: isMobile ? "105%" : "50%",
    marginTop: isMobile ? "14%" : "20%",
    display: isMobile ? "flex" : "flex",
  };

  const boxStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
    marginTop: "8rem",
    marginBottom: "8rem",
    backgroundColor: "#f5f6f7",
    alignItem: 'center'
  };

  const onboardingBottomStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
    marginTop: "5rem",
    backgroundColor: "#fff",
    position: "relative",
  };

  return (
    <div className="onboarding-screen">
      <div className="onboardingBackBTN">
        <button onClick={prevStep}>
          <img src={BackArrow} alt="back button" />
        </button>
        {!isMobile && (
          <div className="authhext">
          Ikorodu dating site
        </div>
        )}

        <button onClick={() => navigate("/help")}>
          <img src={ChatAssistance} alt="back button" />
        </button>
      </div>
      <div style={!isMobile ? boxStyle : {}} className="onboardingTop">
        <img
          style={imageStyle}
          src={CardTwo}
          alt="back button"
        />

       {!isMobile && (
         <div className="bentoGrid">
         <div className="bentoTop">
          <div className="bentoChild"></div>
          <div className="bentoChild"></div>
          <div className="bentoChild"></div>
          <div className="bentoChild"></div>
         </div>
         <div className="bentoBottom"></div>
       </div>

       )}
      </div>
      
      <div style={!isMobile ? onboardingBottomStyle : { position: 'absolute', }} className="onboardingBottom shortBottom">
        <img
          style={{ width: 70, marginTop: "2%" }}
          src={LoveIcon}
          alt="love icon"
        />

        <div className="bottomHolder">
          <h1>Meet New People!</h1>
          <p>Connect with people who share your interests.</p>
          <button onClick={nextStep}>
            Next <img src={NextArrow} alt="back button" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen2;
