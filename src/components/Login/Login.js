// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you 



import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NameIcon from "../../assets/UserIcon.svg";
import Emailicon from "../../assets/emailShape.svg";
import UserOne from "../../assets/OnboardingCards/IMG_7252.JPG";
import UserTwo from "../../assets/OnboardingCards/IMG_7250.JPG";
import UserThree from "../../assets/OnboardingCards/IMG_7255.JPG";
import Dislikee from "../../assets/BottomNavBar/cancelLike.svg";
import "./Login.css";
import Facebook from "../../assets/OnboardingCards/FacebookBlue.svg";
import Google from "../../assets/OnboardingCards/GoogleColor.svg";
import IkoroduLogo from "../../assets/OnboardingCards/Ikorodu-Dating-Logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [leftBar, setLeftBar] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const closeLeftModal = () => {
    setLeftBar(false);
  };

  return (
    <div className="login-container">
      <div className="onboardingBackBTN">
        <div className="authTextBox">
          <img style={{ width: 44 }} src={IkoroduLogo} alt="back button" />
          <h2 className="authText">Ikorodu Dating Site</h2>
        </div>

        <div></div>
      </div>

      <div className="signUpTop">
        <div className="signUpTopH">
          <h2>Login Back</h2>
          <p style={{ fontSize: 10, color: "#00000080" }}>
            Hi, Welcome back to your dating journey, i can see you are already
            making some moves
          </p>
        </div>

        <div className="userOnlineHolder">
          <div className="usersOnline">
            <img className="usersOnline" src={UserOne} alt="user online" />
          </div>
          <div className="usersOnline">
            <img className="usersOnline" src={UserTwo} alt="user online" />
          </div>
          <div className="usersOnline">
            <img className="usersOnline" src={UserThree} alt="user online" />
          </div>
        </div>
      </div>
      {error && <p>{error}</p>}
      <form className="login-form" onSubmit={handleEmailLogin}>
        <div className="signMeUp">
          <p className="signUp-info">Email</p>
        </div>
        <div className="signUpHolder">
          <img src={NameIcon} alt="back button" />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="signMeUp">
          <p className="signUp-info">Password</p>
        </div>
        <div className="signUpHolder">
          <img src={NameIcon} alt="back button" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="submit-Btn" type="submit">
          Login your Account
        </button>
        <div className="orDesign">
          ---------------- or sign up with -----------------
        </div>

        <button className="google-Btn" onClick={handleGoogleLogin}>
          {" "}
          <img src={Google} alt="" />
        </button>

        <button onClick={() => navigate("/signup")} className="faed">
          {" "}
          if you don't have an account please{" "}
          <span style={{ color: "#e91e63" }}>sign up here</span>{" "}
        </button>
      </form>
      {/* 
      <button onClick={() => setLeftBar(true)}>Opwn it</button> */}

      {leftBar && (
        <div className="leftScreenHolder">
          <div className="leftScreenHolderChild">
            <div className="leftPremiungap" style={{ gap: 60 }}>
              <div className="leftonboardingBackBTN">
                <div className="authTextBox">
                  <img
                    style={{ width: 50 }}
                    src={IkoroduLogo}
                    alt="back button"
                  />
                </div>

                <div></div>
              </div>

              <div className="menutextHolder">
                <div className="menutext">
                  <div> Your Likes</div>
                </div>
                <div className="menutext">
                  <div> Your Dislikes</div>
                </div>
                <div className="menutext">
                  <div>Your Matches</div>
                </div>
              </div>
            </div>

            <div className="leftPremiungap">
              <div className="premiumUserHolder">
                <div className="premiumUserHolderText">
                  <h4>Premium User</h4>

                  <p>
                    loremi khafi jkshfis kjahfliw akhflkw a.dwe ,a.efe weakw
                  </p>
                </div>
                <div className="premiumUserBox">
                  <div className="premiumUser"></div>
                  <div className="premiumUser"></div>
                  <div className="premiumUser"></div>
                  <div className="premiumUser"></div>
                  <div className="premiumUser"></div>
                  <div className="premiumUser"></div>
                </div>
              </div>

              <div
                style={{ background: "transparent", padding: 8 }}
                className="premiumUserHolder"
              >
                {/* <div className="premiumUserHolderText">
              <h4>
              Premium User
              </h4>

              <p>
                loremi khafi jkshfis kjahfliw akhflkw a.dwe ,a.efe weakw 
              </p>
              </div> */}

                <button className="premiumButton">Become a premium user</button>
              </div>
            </div>
          </div>
          <div className="leftScreenHolderChildother">
            <button onClick={closeLeftModal} className="nameStatususerr">
              <img style={{ width: 35 }} src={Dislikee} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
