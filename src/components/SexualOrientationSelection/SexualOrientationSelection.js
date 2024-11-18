import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase"; // Import your Firestore instance and auth
import BackArrow from "../../assets/goBackarrow.svg";
import ChatAssistance from "../../assets/OnboardingCards/HelpLoverr.svg";
import { IoFootball, IoMusicalNotes, IoAirplane, IoLaptop, IoGameController } from "react-icons/io5";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineCamera } from "react-icons/md";
import { FaShirt } from "react-icons/fa6";
import { PiCookingPotFill, PiHeartHalfDuotone } from "react-icons/pi";
import "./InterestsSelection.css";

const InterestSelection = ({ setSexType, userId }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const interests = [
    { name: "Sports", icon: <IoFootball size={25} /> },
    { name: "Travel", icon: <IoAirplane size={25} /> },
    { name: "Music", icon: <IoMusicalNotes size={25} /> },
    { name: "Technology", icon: <IoLaptop size={25} /> },
    { name: "Photography", icon: <MdOutlineCamera size={25} /> },
    { name: "Gaming", icon: <IoGameController size={25} /> },
    { name: "Cooking", icon: <PiCookingPotFill size={25} /> },
    { name: "Art", icon: <FaPaintBrush size={25} /> },
    { name: "Fashion", icon: <FaShirt size={25} /> },
    { name: "Relationships", icon: <PiHeartHalfDuotone size={25} /> },
  ];

  const handleInterestSelect = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      if (selectedInterests.length < 5) { // Allow up to 5 interests
        setSelectedInterests([...selectedInterests, interest]);
      }
    }
  };

  const handleNext = async () => {
    setLoading(true); // Set loading to true when the button is clicked
    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);
    try {
      // Update the user's document in Firestore with the selected interests
      await updateDoc(userRef, { interests: selectedInterests });

      setSexType(selectedInterests);
      navigate("/birthdate-selection");
    } catch (error) {
      console.error("Error updating user interests: ", error);
    } finally {
      setLoading(false); // Reset loading state when the operation is complete
    }
  };

  return (
    <div className="selection-container">
      <div style={{ paddingTop: 10 }} className="onboardingBackBTN">
        <div className="genderLover">
          <button onClick={() => navigate(-1)}>
            <img src={BackArrow} alt="back button" />
          </button>
          <p
            style={{
              paddingTop: 4,
              fontSize: 15,
              fontWeight: "400",
              color: "#e91e6378",
            }}
          >
            Select Interests
          </p>
        </div>
        <button>
          <img src={ChatAssistance} alt="chat assistance" />
        </button>
      </div>
      <div className="interest-options-container">
        <div className="alwaysTop">
          <h2>Select up to 5 interests</h2>
          <div>Tell us what piques your curiosity and passions</div>
        </div>
        {interests.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => handleInterestSelect(name)}
            className={selectedInterests.includes(name) ? "interest-selected" : ""}
          >
            {icon}
            <span>{name}</span>
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={selectedInterests.length === 0 || loading} // Disable button if loading
        className="next-buttonn"
      >
        {loading ? (
          <span className="loaderr"></span> // Add a loading spinner or text
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
};

export default InterestSelection;
