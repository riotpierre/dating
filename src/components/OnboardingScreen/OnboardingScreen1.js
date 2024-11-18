// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you

import React from "react";
import { useEffect, useState } from "react";
import "./OnboardingStyle.css";
import NextArrow from "../../assets/facingright.svg";
import BackArrow from "../../assets/goBackarrow.svg";
import CardOne from "../../assets/OnboardingCards/CardTwo.svg";
import LoveIcon from "../../assets/OnboardingCards/Loveiconbn.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import IkoroduLogo from "../../assets/OnboardingCards/Ikorodu-Dating-Logo.svg";
import { useNavigate } from "react-router-dom";
import "./DesktopOnboardingStyle.css";
import LoveLike from "../../assets/UserdetailsIcons/Lovelike.svg";
import DislikeBTN from "../../assets/UserdetailsIcons/DislikeBTN.svg";
import StarBtn from "../../assets/UserdetailsIcons/StarBtn.svg";
import Verify from "../../assets/verified.svg";
import SendAm from "../../assets/UserdetailsIcons/Sendmessage.svg";
import Notifii from "../../assets/Notifififif.svg";
import VeriG from "../../assets/statusverifiedWhite.svg";
import MatchBar from "../../assets/BottomNavBar/MatchBar.svg";
import MatchBardark from "../../assets/BottomNavBar/HomeLightt.svg";
import ViewMatch from "../../assets/BottomNavBar/ViewMatch.svg";
import ViewMatchLight from "../../assets/BottomNavBar/ViewMatchLight.svg";
import MessageLight from "../../assets/BottomNavBar/MessageLight.svg";
import Message from "../../assets/BottomNavBar/MessageActive.svg";
import Dating from "../../assets/BottomNavBar/DateProfile.svg";
import DatingWhite from "../../assets/BottomNavBar/DatingWhite.svg";

const OnboardingScreen1 = ({ nextStep }) => {
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
    width: isMobile ? "110%" : "50%",
    marginTop: isMobile ? "16%" : "1%",
    display: isMobile ? "flex" : "flex",
  };

  const boxStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
    marginTop: "8rem",
    backgroundColor: "#f5f6f7",
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
        <button>
          <img style={{ width: 34 }} src={IkoroduLogo} alt="back button" />
        </button>
        {!isMobile && <div className="authhext">Ikorodu dating site</div>}

        <button onClick={() => navigate("/help")}>
          <img src={ChatAssistance} alt="back button" />
        </button>
      </div>
      <div
        style={!isMobile ? boxStyle : { backgroundColor: "#f5f6f7" }}
        className="onboardingTop"
      >
        {!isMobile && (
          <div className="onboardingCTA" style={{ width: "40%" }}>
            <h1>Start Your Love Story With Us at Ikorodu Dating Site</h1>
            <p>
              we believe in the power of love and the importance of meaningful
              relationships. Our platform is designed to help you find your
              perfect match, whether you're looking for a serious relationship
              or a casual encounter.
            </p>
            <div className="buttonHolderCTA">
              <button>Get Started</button>
              <button className="readmore">Read more</button>
            </div>
          </div>
        )}
        <img
          style={imageStyle}
          src={CardOne}
          className="iiimg"
          alt="back button"
        />
      </div>

        <div className="otherSectionCta">
          <div className="otherSectionCtaInner">
            <div className="featurespage">
              <img style={{ width: 200 }} src={StarBtn} alt="lover boy" />
              <div>
                <h1>User-Friendly Experience</h1>
                <p>
                  Our easy-to-use interface ensures you can focus on finding
                  connections without any hassle.
                </p>
              </div>
            </div>
            <div className="featurespage">
              <div style={{ backgroundColor: "#000000" }} className="iconCta">
                <img style={{ width: 55 }} src={VeriG} alt="" />
              </div>
              {/* <img style={{width: 200}} src={DislikeBTN} alt="lover match" /> */}

              <div>
                <h1>Safe and Secure</h1>
                <p>
                  Your privacy and safety are our top priorities. We use
                  end-to-end encryption to protect your data and ensure all
                  profiles are verified.
                </p>
              </div>
            </div>
            <div className="featurespage">
              <img src={LoveLike} alt="lover match" />
              <div>
                <h1>Swipe Right</h1>
                <p>
                  Enjoy a Tinder-like experience with our swipe cards. Connect
                  with people who catch your eye.
                </p>
              </div>
            </div>
            <div className="featurespage">
              <div className="iconCta">
                <img style={{ width: 45 }} src={SendAm} alt="send message" />
              </div>
              <div>
                <h1>Real-Time Chat</h1>
                <p>
                  Engage in real-time conversations with potential matches. Get
                  instant notifications and never miss a message.
                </p>
              </div>
            </div>
          </div>

          <div className="featurespageBottom">
            <div className="featurespageBottomChild">
              <h1>Advanced Matching Algorithm</h1>
              <p style={{marginTop: '1%', color: '#00000076'}}>
                We use sophisticated algorithms to match you with individuals
                who share your interests and values.
              </p>

              <p style={{marginTop: '2%', color: '#00000046'}}>
              Create and update your profile to reflect your personality and preferences. Let others know what makes you unique.
              </p>

              <p style={{marginTop: '2%', color: '#00000030'}}>
              Share your thoughts and feelings with status updates. Let your matches get to know you better.
              </p>
            </div>
            <div className="featurespageBottomIcon">
              <div style={{ backgroundColor: "#000000" }} className="iconCta">
                <img style={{ width: 45 }} src={MatchBar} alt="send message" />
              </div>

              <div style={{ backgroundColor: "#000000" }} className="iconCta">
                <img
                  style={{ width: 45 }}
                  src={DatingWhite}
                  alt="send message"
                />
              </div>

              <div className="iconCta">
                <img
                  style={{ width: 45 }}
                  src={ViewMatchLight}
                  alt="send message"
                />
              </div>
              <div style={{ backgroundColor: "#000000" }} className="iconCta">
                <img style={{ width: 45 }} src={Message} alt="send message" />
              </div>
            </div>
          </div>
        </div>

      <div
        style={!isMobile ? onboardingBottomStyle : { backgroundColor: "#fff" }}
        className="onboardingBottom"
      >
        <img style={{ width: 70, marginTop: "2%", marginBottom: "5%" }} src={LoveIcon} />

        <div>
          <h1>Welcome to Ikorodu dating App</h1>
          <p>Find your perfect match today, Odonguyan, Adamo and so on....</p>
          <button onClick={nextStep}>
            Next
            <img src={NextArrow} alt="back button" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen1;
