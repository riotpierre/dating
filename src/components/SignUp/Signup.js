// Software built by  Adeweb Developer Africa
// portfolio website: https://adeweb-developer.vercel.app
// whatsApp Message: https://wa.me/23407043455416
// I am open for your software development gig, thank you

import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Signup.css";
import NameIcon from "../../assets/UserIcon.svg";
import Emailicon from "../../assets/emailShape.svg";
import UserOne from "../../assets/OnboardingCards/IMG_7252.JPG";
import UserTwo from "../../assets/OnboardingCards/IMG_7250.JPG";
import UserThree from "../../assets/OnboardingCards/IMG_7255.JPG";
import PasswordIcon from "../../assets/passwordIcon.svg";
import Facebook from "../../assets/OnboardingCards/FacebookBlue.svg";
import Google from "../../assets/OnboardingCards/GoogleColor.svg";
import CheckIt from "../../assets/checkit.svg";
import IkoroduLogo from "../../assets/OnboardingCards/Ikorodu-Dating-Logo.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); // We set loading to true when sign up start 

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName,
        lastName,
        email,
        messages: [],
        statuses: [],
        role: "user",
        status: "pending",
        createdAt: new Date(),
      });
      navigate("/profile-picture-setup");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // We set loading to false when sign up is done
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true); // We set loading to true when sign up starts

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: userCredential.user.displayName.split(" ")[0],
        lastName: userCredential.user.displayName
          .split(" ")
          .slice(-1)
          .join(" "),
        email: userCredential.user.email,
        role: "user", // we are assigning role to our user here
        status: "pending",
        messages: [],
        statuses: [],
        createdAt: new Date(),
      });
      navigate("/profile-picture-setup");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // We set loading to false when sign up is done
    }
  };

  return (
    <div className="signup-container">
      <div className="onboardingBackBTN">
        <div className="authTextBox">
          <img style={{ width: 44 }} src={IkoroduLogo} alt="back button" />
          <h2 className="authText">Ikorodu Dating Site</h2>
        </div>

        <div></div>
      </div>

      <div className="signUpTop">
        <div className="signUpTopH">
          <h2>Sign Up</h2>
          <p style={{ fontSize: 10, color: "#00000080" }}>
            We can't wait to have you onboard, there are some beautiful ladies
            and handsome guys already on our site.
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
      <form className="signup-form" onSubmit={handleEmailSignup}>
        <div className="signMeUp">
          <p className="signUp-info">First name</p>
        </div>
        <div className="signUpHolder">
          <img src={NameIcon} alt="first name icon" />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="signMeUp">
          <p className="signUp-info">Last name</p>
        </div>
        <div className="signUpHolder">
          <img src={NameIcon} alt="last name icon" />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="signMeUp">
          <p className="signUp-info">Email</p>
        </div>
        <div className="signUpHolder">
          <img src={Emailicon} alt="email icon" />
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
          <img src={PasswordIcon} alt="password icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signMeUp">
          <p className="signUp-info">Confirm Password</p>
        </div>
        <div className="signUpHolder">
          <img src={PasswordIcon} alt="confirm password icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="termsText">
          <img src={CheckIt} alt="Accept terms" />I agree with the terms and
          condition of Ikorodu dating site, by signing up for an account
        </div>

        <button className="submit-Btn" type="submit" disabled={loading}>
          {loading ? (
            <span className="loaderr"></span> // Add a loading spinner or text
          ) : (
            "Sign Up"
          )}
        </button>
        <div className="orDesign">
          ---------------- or sign up with -----------------
        </div>

        <div className="GoogleHolder">
          <button
            className="google-Btn"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <img src={Google} alt="Google sign up" />
          </button>

          <button
            className="google-Btn"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <img src={Facebook} alt="Facebook sign up" />
          </button>
        </div>

        <button onClick={() => navigate("/login")} className="faed">
          If you are already a user, please{" "}
          <span style={{ color: "#e91e63" }}>login here</span>
        </button>
      </form>
    </div>
  );
};

export default Signup;
