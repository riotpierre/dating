import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../../firebase'; // Import your Firestore instance
import "./SelectionGender.css";
import BackArrow from "../../assets/goBackarrow.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import MaleSign from "../../assets/OnboardingCards/MaleSign.svg";
import FemaleSign from "../../assets/OnboardingCards/FemaleSign.svg";
import FemaleSignBlack from "../../assets/OnboardingCards/FemaleSignBlack.svg";
import MaleSignBlack from "../../assets/OnboardingCards/MaleSignBlack.svg";

const GenderSelection = ({ setGender }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = auth.currentUser.uid; // Ensure the user is authenticated

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleNext = async () => {
    if (selectedGender) {
      setLoading(true);
      try {
        await updateDoc(doc(db, "users", userId), { gender: selectedGender });
        setGender(selectedGender);
        navigate("/location-selection");
      } catch (error) {
        console.error("Error updating user gender: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="gender-selection-container">
      <div style={{ paddingTop: 10 }} className="onboardingBackBTN">
        <div className="genderLover">
          <button onClick={() => navigate(-1)}>
            <img src={BackArrow} alt="back button" />
          </button>
          <p
            style={{
              paddingTop: 9,
              fontSize: 15,
              fontWeight: "400",
              color: "#e91e6378",
            }}
          >
            Select Gender
          </p>
        </div>
        <button>
          <img src={ChatAssistance} alt="chat assistance" />
        </button>
      </div>

      <div className="gender-options-container">
        <div className="genderTopNow">
          <h1>What’s Your Gender?</h1>
          <div>Tell us about your gender</div>
        </div>
        {["Male", "Female"].map((gender) => (
          <button
            key={gender}
            onClick={() => handleGenderSelect(gender)}
            className={selectedGender === gender ? "selectedd" : ""}
          >
            {gender === "Male" && (
              <img
                src={selectedGender === "Male" ? MaleSign : MaleSignBlack}
                alt="Male Icon"
              />
            )}
            {gender === "Female" && (
              <img
                src={selectedGender === "Female" ? FemaleSign : FemaleSignBlack}
                alt="Female Icon"
              />
            )}
            {gender}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={!selectedGender || loading}
        className="gender-next-button"
      >
        {loading ? (<span className="loaderr"></span>) : "Continue"}
      </button>
    </div>
  );
};

export default GenderSelection;
